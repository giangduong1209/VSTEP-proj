import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getExerciseById } from "@/lib/queries";
import { PracticeClient } from "./practice-client";

export default async function PracticeExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { id } = await params;
  const exercise = await getExerciseById(id);

  if (!exercise) {
    notFound();
  }

  return <PracticeClient exercise={exercise} />;
}
