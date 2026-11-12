import { Users, MapPin, Lock } from 'lucide-react';
import type { Room } from '@/types';

interface RoomCardProps {
  room: Room;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function RoomCard({ room, selected, onSelect }: RoomCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(room.id)}
      disabled={room.blocked}
      aria-pressed={selected}
      className={[
        'relative w-full rounded-xl border p-4 text-left transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        room.blocked
          ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-60'
          : selected
            ? 'border-sky-500 bg-sky-50 shadow-sm ring-1 ring-sky-500'
            : 'border-slate-200 bg-white hover:border-sky-300 hover:shadow-sm',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-slate-800">{room.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" /> {room.location}
          </p>
        </div>
        {room.blocked && (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
            <Lock className="h-3 w-3" /> Blocked
          </span>
        )}
      </div>
      <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
        <Users className="h-3.5 w-3.5" /> Seats {room.capacity}
      </p>
      {selected && !room.blocked && (
        <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-sky-500 ring-4 ring-sky-100" />
      )}
    </button>
  );
}
