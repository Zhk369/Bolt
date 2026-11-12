import type { Booking, Room } from '@/types';

// Hardcoded "current time" for the prototype — 09:00.
export const CURRENT_TIME_MIN = 9 * 60; // 540

export const rooms: Room[] = [
  {
    id: 'a101',
    name: 'Room A101',
    location: 'Library, 1st Floor',
    capacity: 8,
    blocked: false,
  },
  {
    id: 'b220',
    name: 'Room B220',
    location: 'Science Block, 2nd Floor',
    capacity: 12,
    blocked: false,
  },
  {
    id: 'c305',
    name: 'Room C305',
    location: 'Engineering Wing, 3rd Floor',
    capacity: 20,
    blocked: true, // AC3: blocked room
  },
  {
    id: 'd110',
    name: 'Room D110',
    location: 'Admin Building, Ground Floor',
    capacity: 6,
    blocked: false,
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    roomId: 'a101',
    start: 10 * 60, // 10:00
    end: 11 * 60, // 11:00
    owner: 'Dr. Patel',
  },
  {
    id: 'b2',
    roomId: 'a101',
    start: 14 * 60, // 14:00
    end: 15 * 60, // 15:00
    owner: 'Robotics Club',
  },
  {
    id: 'b3',
    roomId: 'b220',
    start: 13 * 60, // 13:00
    end: 13 * 60 + 30, // 13:30
    owner: 'Study Group 4',
  },
  {
    id: 'b4',
    roomId: 'd110',
    start: 9 * 60, // 09:00
    end: 9 * 60 + 45, // 09:45
    owner: 'Front Desk',
  },
];
