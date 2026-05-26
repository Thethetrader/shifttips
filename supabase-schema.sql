-- ============================================================
-- ShiftTips — Supabase Schema + RLS
-- Run this in Supabase SQL Editor
-- ============================================================

-- PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  first_name text,
  last_name text,
  contract_type text check (contract_type in ('CDI','CDD','Extra','Apprenti')),
  weekly_hours numeric default 35,
  weekly_rest_days int default 2,
  created_at timestamptz default now()
);

-- SHIFTS
create table if not exists shifts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  shift_date date not null,
  start_time time,
  end_time time,
  hours_worked numeric not null,
  tips numeric default 0,
  note text,
  created_at timestamptz default now(),
  unique (user_id, shift_date)
);

-- RLS
alter table profiles enable row level security;
alter table shifts enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Shifts policies
create policy "Users can view own shifts"
  on shifts for select using (auth.uid() = user_id);

create policy "Users can insert own shifts"
  on shifts for insert with check (auth.uid() = user_id);

create policy "Users can update own shifts"
  on shifts for update using (auth.uid() = user_id);

create policy "Users can delete own shifts"
  on shifts for delete using (auth.uid() = user_id);

-- WORKPLACES
create table if not exists workplaces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  name text not null,
  schedule_template jsonb default '{}',
  created_at timestamptz default now()
);

alter table workplaces enable row level security;

create policy "Users can view own workplaces"
  on workplaces for select using (auth.uid() = user_id);

create policy "Users can insert own workplaces"
  on workplaces for insert with check (auth.uid() = user_id);

create policy "Users can update own workplaces"
  on workplaces for update using (auth.uid() = user_id);

create policy "Users can delete own workplaces"
  on workplaces for delete using (auth.uid() = user_id);

-- Add workplace reference to shifts
alter table shifts add column if not exists workplace_id uuid references workplaces(id) on delete set null;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
