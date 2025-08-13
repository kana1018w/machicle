import React from 'react';
import { Link } from 'react-router-dom'; // 画面遷移のためにLinkを使う
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-2">
        {/* Home */}
        <Link to="/" className="flex w-20 flex-col items-center gap-1 rounded-xl p-3 text-[#3B82F6]">
          <Home className="h-7 w-7" />
          <span className="text-xs font-medium w-full text-center">ホーム</span>
        </Link>

        {/* 検索 */}
        <Link to="/search" className="flex w-20 flex-col items-center gap-1 rounded-xl p-3 text-gray-400">
          <Search className="h-7 w-7" />
          <span className="text-xs w-full text-center">検索</span>
        </Link>

        {/* 作成 */}
        <Link to="#" className="flex w-20 flex-col items-center gap-1 rounded-xl p-3 text-gray-400">
          <PlusCircle className="h-7 w-7" />
          <span className="text-xs w-full text-center">作成</span>
        </Link>

        {/* チャット */}
        <Link to="#" className="flex w-20 flex-col items-center gap-1 rounded-xl p-3 text-gray-400">
          <MessageCircle className="h-7 w-7" />
          <span className="text-xs w-full text-center">チャット</span>
        </Link>

        {/* プロフィール */}
        <Link to="#" className="flex w-20 flex-col items-center gap-1 rounded-xl p-3 text-gray-400">
          <User className="h-7 w-7" />
          <span className="text-xs w-full text-center">プロフィール</span>
        </Link>
      </div>
    </nav>
  );
}