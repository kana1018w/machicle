import { Link } from 'react-router-dom';


import { useState } from "react"
import { cn } from "../lib/utils"
import lineLogo from "../assets/logos/line.png"
import googleLogo from "../assets/logos/google.png"
import yahooLogo from "../assets/logos/yahoo.png"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <main
      className={cn(
        "min-h-screen w-full bg-white text-[#333333]",
        "flex items-center justify-center",
      )}
    >
      <div className="w-full max-w-md px-5 py-8 sm:px-6 flex flex-col justify-between">
        {/* App Title */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-center mb-8">Machicle</h1>

        {/* Email Login Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault()
            setIsSubmitting(true)
            setTimeout(() => setIsSubmitting(false), 1000)
          }}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base md:text-lg font-medium">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "h-12 text-lg rounded-md p-2",
                "border border-gray-300 placeholder:text-gray-400",
                "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
              )}
              aria-required="true"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-base md:text-lg font-medium">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "h-12 text-lg rounded-md p-2",
                "border border-gray-300 placeholder:text-gray-400",
                "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
              )}
              aria-required="true"
            />
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm md:text-base underline underline-offset-4 hover:text-[#3B82F6] py-1"
              >
                パスワードを忘れた方はこちら
              </Link>
            </div>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            disabled={!email || !password || isSubmitting}
            className={cn(
              "w-full h-12 rounded-md text-lg font-medium",
              "bg-[#3B82F6] text-white hover:bg-[#2563eb]",
              "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {isSubmitting ? "送信中..." : "ログイン"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 sm:my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-[#333333]/70">または</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* LINE */}
          <button
            type="button"
            className={cn(
              "flex items-center justify-center",
              "w-full h-12 rounded-md gap-2",
              "text-base md:text-lg font-medium",
              "bg-[#06C755] text-white hover:bg-[#05b64e]",
              "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
            )}
            aria-label="LINEでログイン"
          >
            <img src={lineLogo} alt="LINEロゴ" width={22} height={22} className="h-5 w-5" />
            <span>LINEでログイン</span>
          </button>

          {/* Google */}
          <button
            type="button"
            variant="outline"
            className={cn(
              "flex items-center justify-center",
              "w-full h-12 rounded-md gap-2",
              "text-base md:text-lg font-medium",
              "bg-white border border-gray-300 text-[#333333] hover:bg-gray-50",
              "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
            )}
            aria-label="Googleでログイン"
          >
            <img src={googleLogo} alt="Googleロゴ" width={22} height={22} className="h-5 w-5" />
            <span>Googleでログイン</span>
          </button>

          {/* Yahoo! JAPAN */}
          <button
            type="button"
            className={cn(
              "flex items-center justify-center",
              "w-full h-12 rounded-md gap-2",
              "text-base md:text-lg font-medium",
              "bg-[#FF0033] text-white hover:bg-[#e0002e]",
              "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
            )}
            aria-label="Yahoo! JAPAN IDでログイン"
          >
            <img src={yahooLogo} alt="Yahoo! JAPANロゴ" width={24} height={24} className="h-5 w-5" />
            <span>Yahoo! JAPAN IDでログイン</span>
          </button>
        </div>

        {/* Spacer so the bottom link has breathing room on short viewports */}
        <div className="h-20" />

        {/* Bottom Sign-up Link */}
        <footer className="pb-8 pt-6">
        <p className="text-center text-sm">
            <Link to="/signup" className="text-base md:text-lg underline underline-offset-4 hover:text-[#3B82F6]">
            新規会員登録はこちら
            </Link>
        </p>
        </footer>
      </div>
    </main>

  )
}
