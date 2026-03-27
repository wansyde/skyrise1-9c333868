import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Create admin user
  const email = "admin1@skyrise.internal";
  const password = "Skyadmin1";
  const username = "admin1";

  // Check if user already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("username", username)
    .maybeSingle();

  if (existingProfile) {
    // Ensure admin role exists
    await supabase
      .from("user_roles")
      .upsert({ user_id: existingProfile.user_id, role: "admin" }, { onConflict: "user_id,role" });
    return new Response(JSON.stringify({ message: "Admin already exists, role ensured." }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Create auth user with auto-confirm
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { username, full_name: "Admin" },
  });

  if (authError) {
    return new Response(JSON.stringify({ error: authError.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = authData.user.id;

  // Assign admin role (the handle_new_user trigger creates 'user' role, we add 'admin')
  await supabase
    .from("user_roles")
    .insert({ user_id: userId, role: "admin" });

  return new Response(JSON.stringify({ message: "Admin account created successfully.", userId }), {
    headers: { "Content-Type": "application/json" },
  });
});
