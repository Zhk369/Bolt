import type { Booking, CheckResult, Room } from '@/types';
import { minutesToLabel } from '@/lib/time';

export interface CheckRequest {
  start: number;
  end: number;
  room: Room;
  bookings: Booking[];
  currentTime: number;
}

/**
 * Evaluate a candidate booking interval against the acceptance criteria.
 * AC1: 0 <= start < end <= 1440 and start after current time.
 * AC2: duration <= 120 minutes.
 * AC3: room must not be blocked.
 * AC4: no overlap with existing bookings (touching endpoints allowed).
 * AC5: returns a verdict without mutating the provided bookings.
 */
export function checkAvailability(req: CheckRequest): CheckResult {
  const { start, end, room, bookings, currentTime } = req;
  const reasons: string[] = [];

  // AC1 — interval validity
  if (start < 0 || end > 1440 || start >= end) {
    reasons.push('Start must be earlier than end, and both within 00:00–24:00.');
  }
  if (start <= currentTime) {
    reasons.push('Start time must be after the current time (09:00).');
  }

  // AC2 — max duration
  if (end - start > 120) {
    reasons.push('Bookings cannot be longer than 120 minutes.');
  }

  // AC3 — blocked room
  if (room.blocked) {
    reasons.push(`${room.name} is currently blocked and unavailable.`);
  }

  // AC4 — overlap (touching endpoints allowed: [a,b) vs [c,d) overlap iff a<d && c<b)
  const overlaps = bookings.filter(
    (b) => b.roomId === room.id && start < b.end && b.start < end,
  );
  for (const b of overlaps) {
    reasons.push(
      `Overlaps existing booking (${minutesToLabel(b.start)}–${minutesToLabel(b.end)}, ${b.owner}).`,
    );
  }

  return {
    verdict: reasons.length === 0 ? 'available' : 'unavailable',
    reasons,
    overlaps,
  };
}

/** Overlap test without duration/current-time constraints — used by the timeline. */
export function isBlocked(
  start: number,
  end: number,
  roomBookings: Booking[],
): boolean {
  return roomBookings.some((b) => start < b.end && b.start < end);
}
