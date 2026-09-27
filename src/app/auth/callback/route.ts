import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Ensure user profile exists in public.users table
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existingProfile } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!existingProfile) {
          await supabase.from("users").insert({
            id: user.id,
            display_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split("@")[0] ||
              "User",
            avatar_url: user.user_metadata?.avatar_url || null,
          });
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error — redirect to login with error message
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_error`);
}
