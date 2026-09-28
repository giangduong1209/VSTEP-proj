"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/lib/theme-toggle";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Signup error:", error.message, error);
      setError(`Không thể tạo tài khoản: ${error.message}`);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError("Không thể đăng ký bằng Google. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh px-6">
        <div className="fixed top-5 right-5 z-50">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="glass p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center text-3xl mx-auto mb-6">
              📧
            </div>
            <h2
              className="text-2xl font-bold mb-3 text-text-primary"
            >
              Kiểm tra email của bạn
            </h2>
            <p
              className="text-sm mb-8 leading-relaxed text-text-secondary"
            >
              Chúng tôi đã gửi link xác nhận đến{" "}
              <span
                className="font-medium text-text-primary"
              >
                {email}
              </span>
              . Vui lòng nhấn vào link trong email để hoàn tất đăng ký.
            </p>
            <Link href="/auth/login" className="link text-sm">
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-mesh">
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      {/* Decorative side */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div
          className="orb top-20 left-20 w-72 h-72 bg-purple-500 animate-float"
          style={{ opacity: "var(--orb-opacity)" }}
        />
        <div
          className="orb bottom-20 right-20 w-96 h-96 bg-indigo-500 animate-float"
          style={{ animationDelay: "2s", opacity: "var(--orb-opacity)" }}
        />

        <div className="relative z-10 max-w-md animate-fade-in-up">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/20">
              🎤
            </div>
            <span
              className="text-xl font-bold tracking-tight text-text-primary"
            >
              VSTEP Speaking
            </span>
          </Link>

          <h1
            className="text-4xl font-bold mb-4 leading-tight text-text-primary"
          >
            Bắt đầu hành trình
            <br />
            <span className="text-gradient">luyện nói cùng AI</span>
          </h1>
          <p
            className="text-lg leading-relaxed mb-10 text-text-secondary"
          >
            Tạo tài khoản miễn phí và bắt đầu cải thiện kỹ năng nói tiếng Anh
            ngay hôm nay.
          </p>

          <div className="space-y-4">
            {[
              { icon: "⚡", text: "Chấm điểm phát âm tức thì bằng AI" },
              { icon: "📊", text: "Phân tích chi tiết từng từ, từng âm" },
              { icon: "🎯", text: "Luyện tập theo đúng format đề thi VSTEP" },
              { icon: "📈", text: "Theo dõi tiến độ và cải thiện mỗi ngày" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-text-secondary"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 bg-surface"
                >
                  {item.icon}
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signup form side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/20">
                🎤
              </div>
              <span
                className="text-lg font-bold text-text-primary"
              >
                VSTEP Speaking
              </span>
            </Link>
          </div>

          <div className="glass p-8 md:p-10">
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-2 text-text-primary"
              >
                Tạo tài khoản
              </h2>
              <p className="text-sm text-text-secondary">
                Miễn phí. Không cần thẻ tín dụng.
              </p>
            </div>

            {error && (
              <div className="alert-error mb-6">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="btn-secondary w-full !py-3 mb-4"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Đăng ký bằng Google
            </button>

            <div className="divider">
              <span>hoặc đăng ký bằng email</span>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label htmlFor="signup-email" className="label">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="label">
                  Mật khẩu
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                  placeholder="Ít nhất 6 ký tự"
                />
              </div>
              <div>
                <label htmlFor="signup-confirm" className="label">
                  Xác nhận mật khẩu
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input"
                  placeholder="Nhập lại mật khẩu"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-3"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang tạo tài khoản...
                  </>
                ) : (
                  "Tạo tài khoản"
                )}
              </button>
            </form>

            <p
              className="mt-5 text-center text-xs leading-relaxed text-text-muted"
            >
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <span className="text-text-secondary">
                Điều khoản sử dụng
              </span>{" "}
              và{" "}
              <span className="text-text-secondary">
                Chính sách bảo mật
              </span>
            </p>

            <p
              className="mt-6 text-center text-sm text-text-muted"
            >
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="link">
                Đăng nhập →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
