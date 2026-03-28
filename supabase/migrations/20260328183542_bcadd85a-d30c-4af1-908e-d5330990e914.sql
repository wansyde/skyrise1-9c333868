ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS saved_wallet_username text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS saved_wallet_network text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS saved_wallet_email text DEFAULT NULL;