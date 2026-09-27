-- VSTEP Speaking App — Initial Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- ============================================================
-- 1. USERS table (extends auth.users with app-specific data)
-- ============================================================
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  account_tier text not null default 'free' check (account_tier in ('free', 'paid')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.users enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Users can insert their own profile (for the auth callback)
create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- ============================================================
-- 2. EXERCISES table (seeded by admin, not user-generated)
-- ============================================================
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  part smallint not null check (part in (1, 2, 3)),
  title text not null,
  prompt text not null,
  reference_text text,
  difficulty smallint default 1 check (difficulty between 1 and 5),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.exercises enable row level security;

-- All authenticated users can read active exercises
create policy "Authenticated users can read exercises"
  on public.exercises for select
  to authenticated
  using (is_active = true);

-- Index for filtering by part
create index idx_exercises_part on public.exercises(part);

-- ============================================================
-- 3. ATTEMPTS table (one row per user recording + score)
-- ============================================================
create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id) on delete cascade,
  audio_url text,
  overall_score real,
  fluency_score real,
  completeness_score real,
  pronunciation_score real,
  score_details jsonb,
  duration_seconds real,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.attempts enable row level security;

-- Users can read their own attempts
create policy "Users can read own attempts"
  on public.attempts for select
  using (auth.uid() = user_id);

-- Users can create their own attempts
create policy "Users can create own attempts"
  on public.attempts for insert
  with check (auth.uid() = user_id);

-- Indexes for common queries
create index idx_attempts_user_id on public.attempts(user_id);
create index idx_attempts_exercise_id on public.attempts(exercise_id);
create index idx_attempts_created_at on public.attempts(created_at desc);

-- ============================================================
-- 4. Storage bucket for audio recordings
-- ============================================================
insert into storage.buckets (id, name, public)
values ('audio-recordings', 'audio-recordings', false);

-- Users can upload their own audio
create policy "Users can upload audio"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'audio-recordings' and (storage.foldername(name))[1] = auth.uid()::text);

-- Users can read their own audio
create policy "Users can read own audio"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'audio-recordings' and (storage.foldername(name))[1] = auth.uid()::text);
