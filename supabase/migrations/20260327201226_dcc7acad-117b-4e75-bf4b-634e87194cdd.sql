
-- Add VIP level and daily task tracking to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS vip_level text NOT NULL DEFAULT 'Junior',
  ADD COLUMN IF NOT EXISTS tasks_completed_today integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_task_reset timestamp with time zone NOT NULL DEFAULT now();
