import { createClient } from "@/lib/supabase/server";
import type {
  Exercise,
  ExercisePart,
  Attempt,
  AttemptInsert,
  AttemptWithExercise,
} from "@/lib/types/database";

// ============================================================
// Exercises queries
// ============================================================

import { SEED_EXERCISES } from "@/lib/seed-data";

/**
 * Get all active exercises, optionally filtered by part (1, 2, or 3).
 */
export async function getExercises(part?: ExercisePart): Promise<Exercise[]> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("exercises")
      .select("*")
      .eq("is_active", true)
      .order("difficulty", { ascending: true });

    if (part) {
      query = query.eq("part", part);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback to built-in seed exercises
      return part
        ? SEED_EXERCISES.filter((e) => e.part === part && e.is_active)
        : SEED_EXERCISES.filter((e) => e.is_active);
    }

    return data as Exercise[];
  } catch {
    return part
      ? SEED_EXERCISES.filter((e) => e.part === part && e.is_active)
      : SEED_EXERCISES.filter((e) => e.is_active);
  }
}

/**
 * Get a single exercise by ID.
 */
export async function getExerciseById(
  id: string
): Promise<Exercise | null> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const fallback = SEED_EXERCISES.find((e) => e.id === id);
      return fallback ?? null;
    }

    return data as Exercise;
  } catch {
    const fallback = SEED_EXERCISES.find((e) => e.id === id);
    return fallback ?? null;
  }
}

// ============================================================
// Attempts queries
// ============================================================

/**
 * Create a new attempt record.
 */
export async function createAttempt(
  attempt: AttemptInsert
): Promise<Attempt | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attempts")
    .insert(attempt)
    .select()
    .single();

  if (error) {
    console.error("Error creating attempt:", error);
    return null;
  }

  return data as Attempt;
}

/**
 * Get all attempts for the current user, with exercise info.
 */
export async function getUserAttempts(
  limit = 20,
  offset = 0
): Promise<AttemptWithExercise[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attempts")
    .select(
      `
      *,
      exercises (title, part, prompt)
    `
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching attempts:", error);
    return [];
  }

  return (data as AttemptWithExercise[]) ?? [];
}

/**
 * Get attempts for a specific exercise by the current user.
 */
export async function getAttemptsByExercise(
  exerciseId: string
): Promise<Attempt[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("exercise_id", exerciseId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching attempts:", error);
    return [];
  }

  return (data as Attempt[]) ?? [];
}

/**
 * Get user stats: total attempts, average scores.
 */
export async function getUserStats(): Promise<{
  totalAttempts: number;
  avgOverall: number | null;
  avgFluency: number | null;
  avgPronunciation: number | null;
  avgCompleteness: number | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("attempts").select("*");

  if (error || !data || data.length === 0) {
    return {
      totalAttempts: 0,
      avgOverall: null,
      avgFluency: null,
      avgPronunciation: null,
      avgCompleteness: null,
    };
  }

  const attempts = data as Attempt[];
  const totalAttempts = attempts.length;

  const avg = (arr: (number | null)[]) => {
    const valid = arr.filter((v): v is number => v !== null);
    return valid.length > 0
      ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10
      : null;
  };

  return {
    totalAttempts,
    avgOverall: avg(attempts.map((a) => a.overall_score)),
    avgFluency: avg(attempts.map((a) => a.fluency_score)),
    avgPronunciation: avg(attempts.map((a) => a.pronunciation_score)),
    avgCompleteness: avg(attempts.map((a) => a.completeness_score)),
  };
}

// ============================================================
// Audio Storage
// ============================================================

/**
 * Upload audio recording to Supabase Storage.
 * Path format: {userId}/{exerciseId}_{timestamp}.webm
 */
export async function uploadAudio(
  userId: string,
  exerciseId: string,
  audioBlob: Blob
): Promise<string | null> {
  const supabase = await createClient();
  const timestamp = Date.now();
  const path = `${userId}/${exerciseId}_${timestamp}.webm`;

  const { error } = await supabase.storage
    .from("audio-recordings")
    .upload(path, audioBlob, {
      contentType: "audio/webm",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading audio:", error);
    return null;
  }

  return path;
}

/**
 * Get a signed URL for an audio recording.
 */
export async function getAudioUrl(path: string): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("audio-recordings")
    .createSignedUrl(path, 3600); // 1 hour expiry

  if (error) {
    console.error("Error getting audio URL:", error);
    return null;
  }

  return data.signedUrl;
}
