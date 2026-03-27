import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Users, ArrowDownToLine, ArrowUpFromLine, DollarSign, Shield, Search, Pencil, Check, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminPanel = () => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editBalance, setEditBalance] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const queryClient = useQueryClient();

  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*");
      return data || [];
    },
  });

  const { data: pendingDeposits } = useQuery({
    queryKey: ["admin-pending-deposits"],
    queryFn: async () => {
      const { data } = await supabase
        .from("deposits")
        .select("*, profiles!deposits_user_id_fkey(full_name, email, username)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: pendingWithdrawals } = useQuery({
    queryKey: ["admin-pending-withdrawals"],
    queryFn: async () => {
      const { data } = await supabase
        .from("withdrawals")
        .select("*, profiles!withdrawals_user_id_fkey(full_name, email, username)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const handleApproveDeposit = async (deposit: any) => {
    setProcessingId(deposit.id);
    await supabase.from("deposits").update({ status: "approved" }).eq("id", deposit.id);
    const { data: profile } = await supabase
      .from("profiles")
      .select("balance")
      .eq("user_id", deposit.user_id)
      .single();
    if (profile) {
      await supabase
        .from("profiles")
        .update({ balance: Number(profile.balance) + Number(deposit.amount) })
        .eq("user_id", deposit.user_id);
    }
    await supabase
      .from("transactions")
      .update({ status: "approved" })
      .eq("user_id", deposit.user_id)
      .eq("type", "deposit")
      .eq("status", "pending")
      .eq("amount", deposit.amount);
    toast.success(`Deposit $${Number(deposit.amount).toLocaleString()} approved.`);
    setProcessingId(null);
    queryClient.invalidateQueries({ queryKey: ["admin-pending-deposits"] });
    queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
  };

  const handleApproveWithdrawal = async (withdrawal: any) => {
    setProcessingId(withdrawal.id);
    const { data: profile } = await supabase
      .from("profiles")
      .select("balance")
      .eq("user_id", withdrawal.user_id)
      .single();
    if (profile && Number(profile.balance) >= Number(withdrawal.amount)) {
      await supabase.from("withdrawals").update({ status: "approved" }).eq("id", withdrawal.id);
      await supabase
        .from("profiles")
        .update({ balance: Number(profile.balance) - Number(withdrawal.amount) })
        .eq("user_id", withdrawal.user_id);
      await supabase
        .from("transactions")
        .update({ status: "approved" })
        .eq("user_id", withdrawal.user_id)
        .eq("type", "withdrawal")
        .eq("status", "pending");
      toast.success(`Withdrawal $${Number(withdrawal.amount).toLocaleString()} approved.`);
    } else {
      toast.error("Insufficient user balance.");
    }
    setProcessingId(null);
    queryClient.invalidateQueries({ queryKey: ["admin-pending-withdrawals"] });
    queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
  };

  const handleRejectWithdrawal = async (withdrawal: any) => {
    await supabase.from("withdrawals").update({ status: "rejected" }).eq("id", withdrawal.id);
    await supabase
      .from("transactions")
      .update({ status: "rejected" })
      .eq("user_id", withdrawal.user_id)
      .eq("type", "withdrawal")
      .eq("status", "pending");
    toast.success("Withdrawal rejected.");
    queryClient.invalidateQueries({ queryKey: ["admin-pending-withdrawals"] });
  };

  const startEditing = (user: any) => {
    setEditingUser(user.user_id);
    setEditBalance(String(user.balance));
    setEditSalary(String(user.advertising_salary ?? 0));
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditBalance("");
    setEditSalary("");
  };

  const saveBalances = async (userId: string) => {
    const newBalance = parseFloat(editBalance);
    const newSalary = parseFloat(editSalary);
    if (isNaN(newBalance) || newBalance < 0) {
      toast.error("Invalid wallet balance value.");
      return;
    }
    if (isNaN(newSalary) || newSalary < 0) {
      toast.error("Invalid advertising salary value.");
      return;
    }
    const { error } = await supabase
      .from("profiles")
      .update({ balance: newBalance, advertising_salary: newSalary })
      .eq("user_id", userId);
    if (error) {
      toast.error("Failed to update balances.");
      return;
    }
    toast.success("User balances updated successfully.");
    setEditingUser(null);
    queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
  };

  const totalUsers = profiles?.length ?? 0;
  const totalAUM = profiles?.reduce((s, p) => s + Number(p.balance), 0) ?? 0;

  const filteredProfiles = (profiles || []).filter((p: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.username || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.full_name || "").toLowerCase().includes(q)
    );
  });

  const stats = [
    { label: "Total Users", value: totalUsers.toLocaleString(), icon: Users },
    { label: "Pending Deposits", value: String(pendingDeposits?.length ?? 0), icon: ArrowDownToLine },
    { label: "Pending Withdrawals", value: String(pendingWithdrawals?.length ?? 0), icon: ArrowUpFromLine },
    { label: "Total AUM", value: `$${(totalAUM / 1000).toFixed(1)}K`, icon: DollarSign },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center gap-3">
        <Shield className="h-5 w-5 text-primary" strokeWidth={1.5} />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage users, deposits, and withdrawals.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="vault-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* User Management */}
      <div className="glass-card overflow-hidden mb-6">
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-medium">User Management</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">Username</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Wallet Balance</th>
                <th className="px-5 py-3 font-medium">Ad Salary</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((u: any) => (
                <tr key={u.user_id} className="border-t border-border">
                  <td className="px-5 py-3 text-sm font-medium">{u.username || "—"}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{u.email || "—"}</td>
                  <td className="px-5 py-3">
                    {editingUser === u.user_id ? (
                      <Input
                        type="number"
                        value={editBalance}
                        onChange={(e) => setEditBalance(e.target.value)}
                        className="h-7 w-28 text-xs"
                        min={0}
                      />
                    ) : (
                      <span className="text-sm tabular-nums">${Number(u.balance).toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editingUser === u.user_id ? (
                      <Input
                        type="number"
                        value={editSalary}
                        onChange={(e) => setEditSalary(e.target.value)}
                        className="h-7 w-28 text-xs"
                        min={0}
                      />
                    ) : (
                      <span className="text-sm tabular-nums">${Number(u.advertising_salary ?? 0).toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    {editingUser === u.user_id ? (
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => saveBalances(u.user_id)}>
                          <Check className="h-3.5 w-3.5 text-success" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={cancelEditing}>
                          <X className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" onClick={() => startEditing(u)}>
                        <Pencil className="h-3 w-3" /> Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredProfiles.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-sm text-muted-foreground">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Deposits */}
      <div className="glass-card overflow-hidden mb-6">
        <div className="p-5">
          <h2 className="text-sm font-medium">Pending Deposits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {(pendingDeposits || []).map((d: any) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-5 py-3 text-sm">{d.profiles?.username || d.profiles?.email || "—"}</td>
                  <td className="px-5 py-3 text-sm tabular-nums">${Number(d.amount).toLocaleString()}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{d.method}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <Button
                      size="sm" variant="outline" className="btn-press text-xs h-7"
                      disabled={processingId === d.id}
                      onClick={() => handleApproveDeposit(d)}
                    >
                      {processingId === d.id ? "..." : "Approve"}
                    </Button>
                  </td>
                </tr>
              ))}
              {(!pendingDeposits || pendingDeposits.length === 0) && (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-sm text-muted-foreground">No pending deposits.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Withdrawals */}
      <div className="glass-card overflow-hidden">
        <div className="p-5">
          <h2 className="text-sm font-medium">Pending Withdrawals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">User</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {(pendingWithdrawals || []).map((w: any) => (
                <tr key={w.id} className="border-t border-border">
                  <td className="px-5 py-3 text-sm">{w.profiles?.username || w.profiles?.email || "—"}</td>
                  <td className="px-5 py-3 text-sm tabular-nums">${Number(w.amount).toLocaleString()}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{w.method}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(w.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm" variant="outline" className="btn-press text-xs h-7"
                        disabled={processingId === w.id}
                        onClick={() => handleApproveWithdrawal(w)}
                      >
                        {processingId === w.id ? "..." : "Approve"}
                      </Button>
                      <Button
                        size="sm" variant="outline"
                        className="btn-press text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10"
                        onClick={() => handleRejectWithdrawal(w)}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!pendingWithdrawals || pendingWithdrawals.length === 0) && (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-sm text-muted-foreground">No pending withdrawals.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
