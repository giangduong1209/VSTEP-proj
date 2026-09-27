import Link from "next/link";
import { ThemeToggle } from "@/lib/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-mesh">
      {/* Floating decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb top-20 left-[15%] w-72 h-72 bg-indigo-500 animate-float" style={{ opacity: "var(--orb-opacity)" }} />
        <div
          className="orb bottom-20 right-[10%] w-96 h-96 bg-cyan-500 animate-float"
          style={{ animationDelay: "2s", opacity: "var(--orb-opacity)" }}
        />
        <div
          className="orb top-[40%] right-[30%] w-64 h-64 bg-purple-500 animate-float"
          style={{ animationDelay: "4s", opacity: "var(--orb-opacity)" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 app-header">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              🎤
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              VSTEP Speaking
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="px-5 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--surface-hover)] transition-all duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              Đăng nhập
            </Link>
            <Link
              href="/auth/signup"
              className="btn-primary text-sm !py-2.5 !px-5"
            >
              Bắt đầu miễn phí
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          {/* Announcement badge */}
          <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm" style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.2)", color: "var(--primary-light)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Pronunciation Scoring
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight animate-fade-in-up"
            style={{ color: "var(--text-primary)", animationDelay: "0.15s" }}
          >
            Luyện nói tiếng Anh
            <br />
            <span className="text-gradient">chuẩn VSTEP</span>
          </h1>

          <p
            className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in-up opacity-0"
            style={{ color: "var(--text-secondary)", animationDelay: "0.3s" }}
          >
            Chấm điểm phát âm bằng AI, phân tích lỗi phát âm thường gặp của
            người Việt, luyện tập theo đúng format đề thi VSTEP.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.45s" }}
          >
            <Link href="/auth/signup" className="btn-primary text-base !py-3.5 !px-8">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Bắt đầu luyện tập
            </Link>
            <Link href="/auth/login" className="btn-secondary text-base !py-3.5 !px-8">
              Tôi đã có tài khoản
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
          {[
            {
              icon: "📝",
              title: "Phần 1 — Hỏi đáp",
              desc: "Trả lời câu hỏi ngắn, luyện phản xạ giao tiếp tự nhiên",
              color: "from-indigo-500/20 to-indigo-600/5",
            },
            {
              icon: "🗣️",
              title: "Phần 2 — Trình bày",
              desc: "Chuẩn bị 1 phút, trình bày 2 phút theo chủ đề cho sẵn",
              color: "from-cyan-500/20 to-cyan-600/5",
            },
            {
              icon: "💬",
              title: "Phần 3 — Thảo luận",
              desc: "Phân tích vấn đề và đưa ra quan điểm cá nhân",
              color: "from-purple-500/20 to-purple-600/5",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card-exercise animate-fade-in-up opacity-0 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © 2026 VSTEP Speaking. Ứng dụng luyện nói tiếng Anh.
          </p>
          <div className="flex items-center gap-1 text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Powered by Azure AI
          </div>
        </div>
      </footer>
    </div>
  );
}
