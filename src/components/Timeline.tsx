import { useState } from 'react';
import { CalendarRange } from 'lucide-react';
import type { Booking, Room } from '@/types';
import { minutesToLabel } from '@/lib/time';

interface TimelineProps {
  room: Room;
  bookings: Booking[];
  candidateStart: number | null;
  candidateEnd: number | null;
  currentTime: number;
}

const DAY_START = 7 * 60; // 07:00 — visible window start
const DAY_END = 20 * 60; // 20:00 — visible window end
const SPAN = DAY_END - DAY_START;

function pct(min: number): string {
  const clamped = Math.max(DAY_START, Math.min(DAY_END, min));
  return `${((clamped - DAY_START) / SPAN) * 100}%`;
}

export function Timeline({
  room,
  bookings,
  candidateStart,
  candidateEnd,
  currentTime,
}: TimelineProps) {
  const [hovered, setHovered] = useState<Booking | null>(null);
  const roomBookings = bookings.filter((b) => b.roomId === room.id);

  const hours: number[] = [];
  for (let h = DAY_START; h <= DAY_END; h += 60) hours.push(h);

  const candidateVisible =
    candidateStart != null && candidateEnd != null && candidateStart < candidateEnd;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <CalendarRange className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-700">
          {room.name} — today
        </h3>
      </div>

      <div className="relative h-16 select-none">
        {/* base track */}
        <div className="absolute inset-x-0 top-6 h-8 rounded-lg bg-slate-100" />

        {/* hour gridlines + labels */}
        {hours.map((h) => (
          <div key={h} className="absolute top-0 h-full" style={{ left: pct(h) }}>
            <div className="h-full w-px bg-slate-200" />
            <span className="absolute -top-0 -translate-x-1/2 text-[10px] text-slate-400">
              {minutesToLabel(h)}
            </span>
          </div>
        ))}

        {/* current time marker */}
        {currentTime >= DAY_START && currentTime <= DAY_END && (
          <div
            className="absolute top-1 z-10"
            style={{ left: pct(currentTime) }}
          >
            <div className="h-14 w-0.5 bg-amber-500" />
            <span className="absolute -top-0 -translate-x-1/2 whitespace-nowrap rounded bg-amber-500 px-1 text-[9px] font-semibold text-white">
              NOW
            </span>
          </div>
        )}

        {/* existing bookings */}
        {roomBookings.map((b) => {
          const left = pct(b.start);
          const width = `calc(${((Math.min(b.end, DAY_END) - Math.max(b.start, DAY_START)) / SPAN) * 100}% )`;
          return (
            <div
              key={b.id}
              onMouseEnter={() => setHovered(b)}
              onMouseLeave={() => setHovered(null)}
              className="absolute top-6 z-20 flex h-8 items-center justify-center overflow-hidden rounded-md bg-slate-600 px-1 text-[10px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ left, width }}
              title={`${minutesToLabel(b.start)}–${minutesToLabel(b.end)} · ${b.owner}`}
            >
              {minutesToLabel(b.start)}–{minutesToLabel(b.end)}
            </div>
          );
        })}

        {/* candidate interval */}
        {candidateVisible && (
          <div
            className="absolute top-6 z-30 flex h-8 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-sky-500 bg-sky-200/60 px-1 text-[10px] font-semibold text-sky-800"
            style={{
              left: pct(candidateStart),
              width: `calc(${((Math.min(candidateEnd, DAY_END) - Math.max(candidateStart, DAY_START)) / SPAN) * 100}%)`,
            }}
          >
            {minutesToLabel(candidateStart)}–{minutesToLabel(candidateEnd)}
          </div>
        )}
      </div>

      {/* legend */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded bg-slate-600" /> Existing booking
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded border-2 border-dashed border-sky-500 bg-sky-200/60" />{' '}
          Your request
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-0.5 bg-amber-500" /> Current time
        </span>
      </div>

      {hovered && (
        <p className="mt-2 text-xs text-slate-500">
          {minutesToLabel(hovered.start)}–{minutesToLabel(hovered.end)} ·{' '}
          {hovered.owner}
        </p>
      )}
    </div>
  );
}
