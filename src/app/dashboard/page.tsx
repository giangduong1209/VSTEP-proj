import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import Link from "next/link";
import { ThemeToggle } from "@/lib/theme-toggle";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const displayName = profile?.display_name || user.email?.split("@")[0] || "bạn";
  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-mesh">
      {/* Header — solid background */}
      <header className="sticky top-0 z-50 app-header">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-sm shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              🎤
            </div>
            <span className="text-base font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              VSTEP Speaking
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* User avatar & name */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                {displayName[0]}
              </div>
              <span className="text-sm hidden sm:block" style={{ color: "var(--text-secondary)" }}>
                {displayName}
              </span>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="text-sm transition-colors cursor-pointer px-3 py-1.5 rounded-lg"
                style={{ color: "var(--text-muted)" }}
              >
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            {greeting}, <span className="text-gradient">{displayName}</span>! 👋
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Hãy chọn phần thi để bắt đầu luyện tập.
          </p>
        </div>

        {/* Quick Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          {[
            { label: "Tổng bài đã tập", value: "0", icon: "📝", color: "from-indigo-500/15 to-indigo-600/5" },
            { label: "Điểm trung bình", value: "—", icon: "⭐", color: "from-amber-500/15 to-amber-600/5" },
            { label: "Điểm phát âm", value: "—", icon: "🎯", color: "from-emerald-500/15 to-emerald-600/5" },
            { label: "Streak", value: "0 ngày", icon: "🔥", color: "from-rose-500/15 to-rose-600/5" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stat.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Exercise Parts */}
        <div className="mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Chọn phần thi</h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Luyện tập theo từng phần hoặc thi thử toàn bài</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 stagger">
          {/* Part 1 */}
          <Link
            href="/practice?part=1"
            className="card-exercise animate-fade-in-up opacity-0 group flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer block"
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  📝
                </div>
                <span className="badge badge-active">3 phút • Sẵn sàng</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                Part 1: Tương tác xã hội
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                Trả lời các câu hỏi ngắn về 2 chủ đề quen thuộc hàng ngày như sở thích, quê hương, gia đình hoặc thói quen.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--border)]" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                3 phút • Trực tiếp
              </span>
              <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Luyện ngay →
              </span>
            </div>
          </Link>

          {/* Part 2 */}
          <Link
            href="/practice?part=2"
            className="card-exercise animate-fade-in-up opacity-0 group flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer block"
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  🗣️
                </div>
                <span className="badge badge-active">4 phút • Sẵn sàng</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                Part 2: Thảo luận giải pháp
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                Tình huống thực tế kèm 3 phương án: chọn phương án tối ưu, bảo vệ ý kiến và phản biện 2 phương án còn lại.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--border)]" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1p chuẩn bị • 3p nói
              </span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Luyện ngay →
              </span>
            </div>
          </Link>

          {/* Part 3 */}
          <Link
            href="/practice?part=3"
            className="card-exercise animate-fade-in-up opacity-0 group flex flex-col justify-between hover:scale-[1.02] transition-all cursor-pointer block"
          >
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  🧠
                </div>
                <span className="badge badge-active">5 phút • Sẵn sàng</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                Part 3: Phát triển đề tài
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
                Thuyết trình dựa trên sơ đồ tư duy (mindmap) 3 gợi ý có sẵn, sau đó trả lời các câu hỏi mở rộng của giám khảo.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs pt-4 border-t border-[var(--border)]" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                1p chuẩn bị • 4p nói
              </span>
              <span className="text-purple-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Luyện ngay →
              </span>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="glass p-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>Hoạt động gần đây</h2>
            <button className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>Xem tất cả →</button>
          </div>

          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ background: "var(--surface)" }}>
              🎙️
            </div>
            <h3 className="font-medium mb-2" style={{ color: "var(--text-primary)" }}>Chưa có hoạt động nào</h3>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
              Hãy bắt đầu luyện tập để xem lịch sử bài tập và điểm số của bạn tại đây.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}
