import React, { useState, useMemo, } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function SignUp() {
  // 新規登録に必要な状態を定義
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ボタンを有効化する条件
  const canSubmit = useMemo(() => {
    return (
      displayName.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      agreeToTerms &&
      agreeToPrivacy
    );
  }, [displayName, email, password, agreeToTerms, agreeToPrivacy]);

  function onSubmit(e) {
    e.preventDefault(); // ページがリロードされるのを防ぐ
    if (!canSubmit) return; // ボタンが押せない状態なら、何もしない

    // 1. まず、「送信中」モードを開始する
    setIsSubmitting(true);

    // TODO: 将来、ここにデータベースへの登録処理を書く
    console.log("登録処理を実行:", { displayName, email, password });

    // 2. 処理が終わったと仮定して、2秒後に「送信中」モードを解除する
    setTimeout(() => {
      setIsSubmitting(false); // スイッチをオフに戻す
      alert("登録が完了しました！"); // ユーザーに完了を伝える
      // 本来は、ここでログイン後のページに遷移させたりします
    }, 2000);
  }


  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5">
      {/* --- Header Section --- */}
      <header className="pt-10 pb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide mb-2">
          Machicle
        </h1>
        <h2 className="text-2xl font-bold tracking-tight text-[#333333]/80">
          新規会員登録
        </h2>
      </header>

      {/* --- Form Section --- */}
      <form onSubmit={onSubmit} className="flex flex-col justify-start gap-6">
        {/* 表示名 */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="displayName">表示名（ニックネーム）</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />
        </div>

        {/* メールアドレス */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />
        </div>

        {/* パスワード */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />
          <p className="text-sm text-[#333333]/70">8文字以上の英数字で入力してください</p>
        </div>

        {/* 同意チェックボックス */}
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="terms" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} />
            <label htmlFor="terms" className="text-sm">
              <Link to="#" className="text-[#3B82F6] underline">利用規約</Link>に同意する
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="privacy" checked={agreeToPrivacy} onChange={(e) => setAgreeToPrivacy(e.target.checked)} />
            <label htmlFor="privacy" className="text-sm">
              <Link to="#" className="text-[#3B82F6] underline">プライバシーポリシー</Link>に同意する
            </label>
          </div>
        </div>

        {/* 登録ボタン */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={cn(
              "w-full h-12 rounded-md text-lg font-medium",
              "bg-[#3B82F6] text-white hover:bg-[#2563eb]",
              "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isSubmitting ? "登録中..." : "同意して登録する"}
          </button>
        </div>
      </form>

      {/* Bottom login Link */}
      <footer className="mt-auto pb-8 pt-10">
        <p className="text-center text-sm">
          すでにアカウントをお持ちですか？{" "}
          <Link to="/login" className="text-[#3B82F6] underline underline-offset-2">
            ログイン
          </Link>
        </p>
      </footer>
    </div>
  );
}