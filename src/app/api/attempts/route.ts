import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /api/attempts
 * Query params:
 *   - limit (optional, default 20)
 *   - offset (optional, default 0)
 *   - exercise_id (optional)
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
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const exerciseId = searchParams.get("exercise_id");

  let query = supabase
    .from("attempts")
    .select(
      `
      *,
      exercises (title, part, prompt)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (exerciseId) {
    query = query.eq("exercise_id", exerciseId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch attempts" },
      { status: 500 }
    );
  }

  return NextResponse.json({ attempts: data ?? [] });
}
