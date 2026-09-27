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

export interface Part1Topic {
  title: string;
  questions: string[];
}

export interface Part3Mindmap {
  central_topic: string;
  ideas: string[];
  own_idea_prompt?: string;
}

export interface Exercise {
  id: string;
  part: ExercisePart;
  title: string;
  prompt: string;
  reference_text: string | null;
  difficulty: number;
  is_active: boolean;
  created_at: string;
  // VSTEP Specific Fields
  prep_time_seconds?: number;
  speaking_time_seconds?: number;
  part1_topics?: Part1Topic[];
  part2_situation?: string;
  part2_options?: string[];
  part3_mindmap?: Part3Mindmap;
  part3_follow_up_questions?: string[];
}

export interface ExerciseInsert {
  part: ExercisePart;
  title: string;
  prompt: string;
  reference_text?: string | null;
  difficulty?: number;
  is_active?: boolean;
  prep_time_seconds?: number;
  speaking_time_seconds?: number;
  part1_topics?: Part1Topic[];
  part2_situation?: string;
  part2_options?: string[];
  part3_mindmap?: Part3Mindmap;
  part3_follow_up_questions?: string[];
}

// ============================================================
// VSTEP 5 Scoring Criteria
// ============================================================
export interface VstepScores {
  overall_score: number; // 0 - 100
  vstep_scale: number; // 0.0 - 10.0
  vstep_band: "A2" | "B1" | "B2" | "C1";
  pronunciation_score: number; // Phát âm
  fluency_score: number; // Độ trôi chảy
  vocabulary_score: number; // Từ vựng
  grammar_score: number; // Ngữ pháp
  topic_development_score: number; // Phát triển ý
  words?: WordScore[];
  feedback_tips?: string[];
}

// ============================================================
// Attempts table
// ============================================================
export interface ScoreDetails {
  words?: WordScore[];
  accuracy_score?: number;
  prosody_score?: number;
  vstep_scores?: VstepScores;
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
  vocabulary_score?: number | null;
  grammar_score?: number | null;
  topic_development_score?: number | null;
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
  vocabulary_score?: number | null;
  grammar_score?: number | null;
  topic_development_score?: number | null;
  score_details?: ScoreDetails | null;
  duration_seconds?: number | null;
}

// ============================================================
// Attempt with exercise info (joined)
// ============================================================
export interface AttemptWithExercise extends Attempt {
  exercises: Pick<Exercise, "title" | "part" | "prompt">;
}
