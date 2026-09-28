import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/lib/theme-toggle";
import { getExercises } from "@/lib/queries";
import type { ExercisePart } from "@/lib/types/database";

export default async function PracticeListPage({
  searchParams,
}: {
  searchParams: Promise<{ part?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { part: partParam } = await searchParams;
  const currentPart = partParam ? (parseInt(partParam) as ExercisePart) : undefined;

  const exercises = await getExercises(currentPart);

  const partMeta = {
    1: {
      title: "Phần 1: Tương tác xã hội",
      desc: "3 phút • Trả lời các câu hỏi ngắn về 2 chủ đề quen thuộc (sở thích, quê hương, gia đình)",
      badge: "Part 1 • 3 phút",
      color: "from-indigo-500/20 to-indigo-600/5",
      icon: "📝",
    },
    2: {
      title: "Phần 2: Thảo luận giải pháp",
      desc: "4 phút • 1 phút chuẩn bị, 3 phút nói. Chọn 1 trong 3 phương án, bảo vệ & phản biện 2 phương án còn lại",
      badge: "Part 2 • 4 phút (1p chuẩn bị)",
      color: "from-cyan-500/20 to-cyan-600/5",
      icon: "🗣️",
    },
    3: {
      title: "Phần 3: Phát triển đề tài",
      desc: "5 phút • 1 phút chuẩn bị, 4 phút nói. Thuyết trình sơ đồ tư duy (Mindmap) & trả lời câu hỏi mở rộng",
      badge: "Part 3 • 5 phút (1p chuẩn bị)",
      color: "from-purple-500/20 to-purple-600/5",
      icon: "🧠",
    },
  };

  return (
    <div className="min-h-screen bg-mesh flex flex-col">
      {/* Header — 100% solid background */}
      <header className="sticky top-0 z-50 app-header">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-surface-hover transition-colors text-text-secondary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Dashboard</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <span className="text-base font-bold text-text-primary">
              Danh sách bài luyện tập
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 w-full">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2 text-text-primary">
            Chọn đề bài luyện nói
          </h1>
          <p className="text-base text-text-secondary">
            Hệ thống chấm điểm AI phân tích chi tiết độ chính xác ngữ âm, độ trôi chảy và ngữ điệu.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-border">
          <Link
            href="/practice"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              !currentPart
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "hover:bg-surface-hover text-text-secondary"
            }`}
          >
            Tất cả phần ({exercises.length})
          </Link>
          <Link
            href="/practice?part=1"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentPart === 1
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "hover:bg-surface-hover text-text-secondary"
            }`}
          >
            📝 Phần 1: Tương tác xã hội (3p)
          </Link>
          <Link
            href="/practice?part=2"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentPart === 2
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "hover:bg-surface-hover text-text-secondary"
            }`}
          >
            🗣️ Phần 2: Thảo luận giải pháp (4p)
          </Link>
          <Link
            href="/practice?part=3"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              currentPart === 3
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "hover:bg-surface-hover text-text-secondary"
            }`}
          >
            🧠 Phần 3: Phát triển đề tài (5p)
          </Link>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => {
            const meta = partMeta[exercise.part as 1 | 2 | 3] || partMeta[1];
            return (
              <div
                key={exercise.id}
                className="card-exercise flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge badge-active flex items-center gap-1.5">
                      <span>{meta.icon}</span>
                      <span>Phần {exercise.part}</span>
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-md font-medium bg-surface text-text-muted"
                    >
                      Độ khó: {"⭐".repeat(exercise.difficulty || 1)}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors text-text-primary"
                  >
                    {exercise.title}
                  </h3>

                  <p
                    className="text-sm line-clamp-3 mb-6 leading-relaxed text-text-secondary"
                  >
                    {exercise.prompt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    Format chuẩn VSTEP
                  </span>
                  <Link
                    href={`/practice/${exercise.id}`}
                    className="btn-primary !py-2 !px-4 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <span>Luyện nói</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
