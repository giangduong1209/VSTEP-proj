import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getExercises } from "@/lib/queries";
import type { ExercisePart } from "@/lib/types/database";

/**
 * GET /api/exercises
 * Query params:
 *   - part (optional): 1 | 2 | 3
 */
export async function GET(request: Request) {
  const supabase = await createClient();

  // Auth check
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const partParam = searchParams.get("part");
  const part = partParam ? (parseInt(partParam) as ExercisePart) : undefined;

  const exercises = await getExercises(part);

  return NextResponse.json({ exercises });
}
