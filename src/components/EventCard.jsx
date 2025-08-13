import React from 'react';
import OfficialBadge from './OfficialBadge'; // 公式バッジ部品を読み込む

// Propsとして event オブジェクトを丸ごと受け取る
export default function EventCard({ event }) {
  return (
    <article
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      aria-label={event.title}
    >
      {/* --- Image --- */}
      <div className="relative h-56 w-full bg-gray-100">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* --- Content --- */}
      <div className="space-y-3 px-5 py-4">
        <h2 className="text-xl font-extrabold leading-snug">{event.title}</h2>

        <div className="text-base text-gray-700">
          <div className="font-medium">{event.date}</div>
          <div className="text-gray-600">{event.time}</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-medium">{event.creator}</span>
          {/* isOfficialがtrueの時だけバッジを表示 */}
          {event.isOfficial && <OfficialBadge />}
        </div>
      </div>
    </article>
  );
}