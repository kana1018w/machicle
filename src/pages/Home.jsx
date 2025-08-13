import React from 'react';
import { Filter, LogOut } from 'lucide-react'; // アイコンライブラリ

// 外部コンポーネントを読み込む
import EventCard from '../components/EventCard';
import BottomNav from '../components/BottomNav';

// ダミーデータ（後で dummyData.js に移動してもOK）
const events = [
  {
    id: "1",
    title: "桜まつり – 地域の春を楽しもう",
    date: "2025年4月12日(土)",
    time: "10:00 - 16:00",
    creator: "地域センター",
    isOfficial: true,
    image: "/dummy-images/cherry-blossom-festival.png",
  },
  {
    id: "2",
    title: "シニア向けスマホ体験会",
    date: "2025年4月18日(金)",
    time: "13:30 - 15:30",
    creator: "田中 太郎",
    isOfficial: false,
    image: "/dummy-images/senior-smartphone-class-friendly.png",
  },
  {
    id: "3",
    title: "地域清掃ボランティア",
    date: "2025年4月20日(日)",
    time: "09:00 - 11:30",
    creator: "山田 区役所",
    isOfficial: true,
    image: "/dummy-images/community-cleanup-volunteers.png",
  },
  {
    id: "4",
    title: "健康体操サークル",
    date: "2025年4月25日(金)",
    time: "10:30 - 11:30",
    creator: "佐藤 花子",
    isOfficial: false,
    image: "/dummy-images/senior-exercise-class-indoor.png",
  },
  // ...他のイベントデータも同様に続く
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#333333]">
      {/* --- Top Header --- */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white/90 px-5 py-4 backdrop-blur-sm">
        <h2 className="text-2xl font-bold tracking-wide">Machicle</h2>
        {/* ログアウトボタン */}
        <button
          // 今は押してもアラートが出るだけ
          onClick={() => alert("実装前")}
          aria-label="ログアウト"
          className="flex items-center gap-2 rounded-md py-2 px-3 text-sm font-bold text-gray-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <LogOut className="h-5 w-5" />
          <span>ログアウト</span>
        </button>
      </header>

      {/* --- Main Content --- */}
      <main className="pb-28">
        <section className="mx-auto max-w-2xl px-4 py-5">
          <div className="grid grid-cols-1 gap-5">
            {/* イベントカードを .map() で一覧表示 */}
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      </main>

      {/* --- Bottom Navigation --- */}
      <BottomNav />
    </div>
  );
}