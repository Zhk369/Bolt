import { Clock } from 'lucide-react';
import { minutesToLabel } from '@/lib/time';

interface TimeInputProps {
  startLabel: string;
  endLabel: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  currentTimeMin: number;
}

export function TimeInput({
  startLabel,
  endLabel,
  onStartChange,
  onEndChange,
  currentTimeMin,
}: TimeInputProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Start time
        </span>
        <div className="relative">
          <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="time"
            value={startLabel}
            onChange={(e) => onStartChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-slate-800 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <span className="mt-1 block text-xs text-slate-400">
          Must be after {minutesToLabel(currentTimeMin)}
        </span>
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          End time
        </span>
        <div className="relative">
          <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="time"
            value={endLabel}
            onChange={(e) => onEndChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-slate-800 transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <span className="mt-1 block text-xs text-slate-400">
          Max 120 minutes
        </span>
      </label>
    </div>
  );
}
