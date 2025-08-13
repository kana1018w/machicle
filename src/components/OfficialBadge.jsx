import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

export default function OfficialBadge({ className, title = "公式" }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#3B82F6]",
        className
      )}
      title={title}
    >
      <Check className="h-3 w-3 text-white" strokeWidth={3} />
    </span>
  );
}