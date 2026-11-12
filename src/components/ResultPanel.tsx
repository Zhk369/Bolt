import { CheckCircle2, XCircle, Info } from 'lucide-react';
import type { CheckResult } from '@/types';
import { durationLabel, minutesToLabel } from '@/lib/time';

interface ResultPanelProps {
  result: CheckResult | null;
  start: number | null;
  end: number | null;
}

export function ResultPanel({ result, start, end }: ResultPanelProps) {
  if (!result) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
        <Info className="mx-auto h-6 w-6 text-slate-300" />
        <p className="mt-2 text-sm text-slate-500">
          Select a room and time range, then check availability.
        </p>
      </div>
    );
  }

  const available = result.verdict === 'available';

  return (
    <div
      className={[
        'rounded-xl border p-5 transition-colors duration-300',
        available
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-rose-200 bg-rose-50',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        {available ? (
          <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-600" />
        ) : (
          <XCircle className="h-7 w-7 shrink-0 text-rose-600" />
        )}
        <div>
          <p
            className={[
              'text-lg font-bold',
              available ? 'text-emerald-700' : 'text-rose-700',
            ].join(' ')}
          >
            {available ? 'Available' : 'Unavailable'}
          </p>
          {start != null && end != null && (
            <p className="text-sm text-slate-600">
              {minutesToLabel(start)} – {minutesToLabel(end)} ·{' '}
              {durationLabel(start, end)}
            </p>
          )}
        </div>
      </div>

      {result.reasons.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {result.reasons.map((r, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-rose-700"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
              {r}
            </li>
          ))}
        </ul>
      )}

      {available && (
        <p className="mt-3 text-sm text-emerald-700">
          No conflicts found — this room is free for the requested interval.
        </p>
      )}
    </div>
  );
}
