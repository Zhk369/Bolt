import { useMemo, useState } from 'react';
import { Search, Building2, Clock3, CalendarCheck } from 'lucide-react';
import type { CheckResult } from '@/types';
import { bookings as sampleBookings, rooms, CURRENT_TIME_MIN } from '@/lib/sampleData';
import { checkAvailability } from '@/lib/checkAvailability';
import { labelToMinutes, minutesToLabel } from '@/lib/time';
import { RoomCard } from '@/components/RoomCard';
import { TimeInput } from '@/components/TimeInput';
import { ResultPanel } from '@/components/ResultPanel';
import { Timeline } from '@/components/Timeline';

function App() {
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [startLabel, setStartLabel] = useState('09:30');
  const [endLabel, setEndLabel] = useState('10:30');
  const [result, setResult] = useState<CheckResult | null>(null);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === roomId) ?? rooms[0],
    [roomId],
  );

  const startMin = labelToMinutes(startLabel);
  const endMin = labelToMinutes(endLabel);

  const handleCheck = () => {
    if (startMin == null || endMin == null) {
      setResult({
        verdict: 'unavailable',
        reasons: ['Enter valid times in HH:MM format (00:00–23:59).'],
        overlaps: [],
      });
      return;
    }
    setResult(
      checkAvailability({
        start: startMin,
        end: endMin,
        room: selectedRoom,
        bookings: sampleBookings,
        currentTime: CURRENT_TIME_MIN,
      }),
    );
  };

  // Quick preset buttons
  const presets = [
    { label: '09:30–10:30', s: '09:30', e: '10:30' },
    { label: '11:00–12:00', s: '11:00', e: '12:00' },
    { label: '15:00–16:30', s: '15:00', e: '16:30' },
  ];
  const applyPreset = (s: string, e: string) => {
    setStartLabel(s);
    setEndLabel(e);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              Smart Campus Room Availability
            </h1>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <Clock3 className="h-3 w-3" />
              Current time (demo): {minutesToLabel(CURRENT_TIME_MIN)}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: room selection */}
          <section className="lg:col-span-1">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <Building2 className="h-4 w-4" /> Rooms
            </h2>
            <div className="space-y-3">
              {rooms.map((r) => (
                <RoomCard
                  key={r.id}
                  room={r}
                  selected={r.id === roomId}
                  onSelect={(id) => {
                    setRoomId(id);
                    setResult(null);
                  }}
                />
              ))}
            </div>
          </section>

          {/* Right: time + result + timeline */}
          <section className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                <CalendarCheck className="h-4 w-4" /> Request a time
              </h2>

              <TimeInput
                startLabel={startLabel}
                endLabel={endLabel}
                onStartChange={(v) => {
                  setStartLabel(v);
                  setResult(null);
                }}
                onEndChange={(v) => {
                  setEndLabel(v);
                  setResult(null);
                }}
                currentTimeMin={CURRENT_TIME_MIN}
              />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400">Quick picks:</span>
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p.s, p.e)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCheck}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:scale-[0.99]"
              >
                <Search className="h-4 w-4" />
                Check availability
              </button>
            </div>

            <ResultPanel
              result={result}
              start={startMin}
              end={endMin}
            />

            <Timeline
              room={selectedRoom}
              bookings={sampleBookings}
              candidateStart={startMin}
              candidateEnd={endMin}
              currentTime={CURRENT_TIME_MIN}
            />
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Prototype · Fictional sample data · No bookings are saved or changed
        </p>
      </main>
    </div>
  );
}

export default App;
