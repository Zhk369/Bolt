export interface Booking {
  id: string;
  roomId: string;
  start: number; // minutes from 00:00
  end: number; // minutes from 00:00
  owner: string;
}

export interface Room {
  id: string;
  name: string;
  location: string;
  capacity: number;
  blocked: boolean;
}

export type Verdict = 'available' | 'unavailable';

export interface CheckResult {
  verdict: Verdict;
  reasons: string[];
  overlaps: Booking[];
}
