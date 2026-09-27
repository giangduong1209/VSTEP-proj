// TypeScript types matching the Supabase database schema
// See: supabase/migrations/001_initial_schema.sql

// ============================================================
// Users table
// ============================================================
export type AccountTier = "free" | "paid";

export interface User {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  account_tier: AccountTier;
  created_at: string;
  updated_at: string;
}

export interface UserInsert {
  id: string;
  display_name?: string | null;
  avatar_url?: string | null;
  account_tier?: AccountTier;
}

export interface UserUpdate {
  display_name?: string | null;
  avatar_url?: string | null;
  account_tier?: AccountTier;
}

// ============================================================
// Exercises table
// ============================================================
export type ExercisePart = 1 | 2 | 3;

export interface Exercise {
  id: string;
  part: ExercisePart;
  title: string;
  prompt: string;
  reference_text: string | null;
  difficulty: number;
  is_active: boolean;
  created_at: string;
}

export interface ExerciseInsert {
  part: ExercisePart;
  title: string;
  prompt: string;
  reference_text?: string | null;
  difficulty?: number;
  is_active?: boolean;
}

// ============================================================
// Attempts table
// ============================================================
export interface ScoreDetails {
  words?: WordScore[];
  accuracy_score?: number;
  prosody_score?: number;
  [key: string]: unknown;
}

export interface WordScore {
  word: string;
  accuracy_score: number;
  error_type: "None" | "Omission" | "Insertion" | "Mispronunciation";
  phonemes?: PhonemeScore[];
}

export interface PhonemeScore {
  phoneme: string;
  accuracy_score: number;
}

export interface Attempt {
  id: string;
  user_id: string;
  exercise_id: string;
  audio_url: string | null;
  overall_score: number | null;
  fluency_score: number | null;
  completeness_score: number | null;
  pronunciation_score: number | null;
  score_details: ScoreDetails | null;
  duration_seconds: number | null;
  created_at: string;
}

export interface AttemptInsert {
  user_id: string;
  exercise_id: string;
  audio_url?: string | null;
  overall_score?: number | null;
  fluency_score?: number | null;
  completeness_score?: number | null;
  pronunciation_score?: number | null;
  score_details?: ScoreDetails | null;
  duration_seconds?: number | null;
}

// ============================================================
// Attempt with exercise info (joined)
// ============================================================
export interface AttemptWithExercise extends Attempt {
  exercises: Pick<Exercise, "title" | "part" | "prompt">;
}
