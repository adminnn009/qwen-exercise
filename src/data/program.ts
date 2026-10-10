// 182-Day Program Schedule
// 26 weeks, 7 days per week
// Phases: Foundation (W1-8), Build (W9-17), Strength (W18-26)
// Deload every 4th week

export interface WorkoutDay {
  day: number;
  week: number;
  dayOfWeek: number; // 0=Mon, 6=Sun
  name: string;
  phase: string;
  isDeload: boolean;
  isTest: boolean;
  blocks: WorkoutBlock[];
  estimatedMinutes: number;
}

export interface WorkoutBlock {
  name: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  sets?: number;
  reps?: number;
  hold?: number; // seconds
  rest?: number; // seconds between sets
  note?: string;
}

export interface PushUpLevel {
  level: number;
  name: string;
  exerciseId: string;
}

export const pushUpLevels: PushUpLevel[] = [
  { level: 0, name: 'Wall Push-Ups', exerciseId: 'wall-pushups' },
  { level: 1, name: 'Incline Push-Ups', exerciseId: 'incline-pushups' },
  { level: 2, name: 'Knee Push-Ups', exerciseId: 'knee-pushups' },
  { level: 3, name: 'Negative Push-Ups', exerciseId: 'negative-pushups' },
  { level: 4, name: 'Full Push-Ups', exerciseId: 'full-pushups' },
  { level: 5, name: 'Decline Push-Ups', exerciseId: 'decline-pushups' },
];

function getPhase(week: number): string {
  if (week <= 8) return 'Foundation';
  if (week <= 17) return 'Build';
  return 'Strength & Power';
}

function isDeloadWeek(week: number): boolean {
  return week % 4 === 0;
}

function isTestDay(week: number, dayOfWeek: number): boolean {
  // Test on Sunday of weeks 4, 8, 12, 16, 20, 24
  return dayOfWeek === 6 && [4, 8, 12, 16, 20, 24].includes(week);
}

function getPushLevel(week: number, deload: boolean): number {
  if (week <= 2) return 0;
  if (week <= 4) return 0;
  if (week <= 6) return 1;
  if (week <= 8) return 1;
  if (week <= 10) return 2;
  if (week <= 13) return 2;
  if (week <= 16) return 3;
  if (week <= 19) return 3;
  if (week <= 22) return 4;
  return 4; // May progress to 5 (decline) for advanced users
}

function generateDay(dayNum: number): WorkoutDay {
  const week = Math.ceil(dayNum / 7);
  const dayOfWeek = (dayNum - 1) % 7; // 0=Mon
  const phase = getPhase(week);
  const deload = isDeloadWeek(week);
  const test = isTestDay(week, dayOfWeek);
  const pushLevel = getPushLevel(week, deload);
  const pushExerciseId = pushUpLevels[Math.min(pushLevel, pushUpLevels.length - 1)].exerciseId;

  // Deload multiplier
  const dm = deload ? 0.6 : 1;
  
  let blocks: WorkoutBlock[] = [];
  let name = '';
  let est = 30;

  if (test) {
    name = 'Progress Test Day';
    blocks = [
      { name: 'Warm-Up', exercises: [
        { id: 'arm-waves', hold: 20 },
        { id: 'spine-waves', hold: 20 },
        { id: 'knee-raises', hold: 20 },
      ]},
      { name: 'Progress Tests', exercises: [
        { id: pushExerciseId, sets: 1, reps: 99, note: 'Max reps with good form', rest: 120 },
        { id: 'plank', sets: 1, hold: 999, note: 'Max hold time', rest: 60 },
        { id: 'wall-sit', sets: 1, hold: 999, note: 'Max hold time', rest: 60 },
        { id: 'chin-tucks', sets: 1, reps: 99, note: 'Max reps', rest: 30 },
      ]},
      { name: 'Cool-Down', exercises: [
        { id: 'chest-opener', hold: 20 },
        { id: 'hamstring-stretch', hold: 20 },
        { id: 'cat-cow', reps: 6 },
      ]},
    ];
    est = 25;
  } else {
    switch (dayOfWeek) {
      case 0: // Monday - Push + Core
        name = 'Push + Core';
        blocks = [
          { name: 'Warm-Up (5 min)', exercises: [
            { id: 'arm-waves', hold: Math.round(30 * dm) },
            { id: 'golf-arm-swings', hold: Math.round(30 * dm) },
            { id: 'spine-waves', hold: Math.round(30 * dm) },
            { id: 'shoulder-blade-squeeze', reps: Math.round(8 * dm) },
          ]},
          { name: 'Main - Push + Core (20 min)', exercises: [
            { id: pushExerciseId, sets: Math.round(3 * dm), reps: Math.round(10 * dm), rest: Math.round(60 / dm) },
            { id: 'doorframe-press', sets: Math.round(3 * dm), hold: Math.round(15 * dm), rest: 30 },
            { id: 'pike-pushups', sets: Math.round(2 * dm), reps: Math.round(6 * dm), rest: Math.round(60 / dm), note: week < 9 ? 'Wall press hold instead' : undefined },
            { id: 'plank', sets: Math.round(3 * dm), hold: Math.round(20 * dm), rest: 30 },
            { id: 'dead-bug', sets: Math.round(2 * dm), reps: Math.round(8 * dm), rest: 30 },
            { id: 'crunches', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 30 },
          ]},
          { name: 'Cool-Down (5 min)', exercises: [
            { id: 'chest-stretch', hold: 20 },
            { id: 'triceps-stretch', hold: 20 },
            { id: 'shoulder-stretch', hold: 20 },
            { id: 'neck-side-stretch', hold: 10 },
          ]},
        ];
        break;

      case 1: // Tuesday - Pull + Posture
        name = 'Pull + Posture';
        blocks = [
          { name: 'Warm-Up (5 min)', exercises: [
            { id: 'arm-waves', hold: Math.round(30 * dm) },
            { id: 'cat-cow', reps: Math.round(6 * dm) },
            { id: 'shoulder-blade-squeeze', reps: Math.round(8 * dm) },
            { id: 'spine-waves', hold: Math.round(20 * dm) },
          ]},
          { name: 'Main - Pull + Posture (20 min)', exercises: [
            { id: 'superman-hold', sets: Math.round(3 * dm), hold: Math.round(15 * dm), rest: 30 },
            { id: 'reverse-fly', sets: Math.round(3 * dm), reps: Math.round(8 * dm), rest: 45 },
            { id: 'face-pull-isometric', sets: Math.round(3 * dm), hold: Math.round(15 * dm), rest: 30 },
            { id: 'reverse-snow-angels', sets: Math.round(2 * dm), reps: Math.round(8 * dm), rest: 30 },
            { id: 'chin-tucks', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 20 },
            { id: 'shoulder-blade-squeeze', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 20 },
          ]},
          { name: 'Cool-Down (5 min)', exercises: [
            { id: 'lat-stretch', hold: 20 },
            { id: 'upper-back-stretch', hold: 20 },
            { id: 'biceps-stretch', hold: 15 },
            { id: 'forearm-stretch', hold: 15 },
            { id: 'scalp-massage', hold: 30, note: 'Optional' },
          ]},
        ];
        break;

      case 2: // Wednesday - Legs + Hips
        name = 'Legs + Hips';
        blocks = [
          { name: 'Warm-Up (5 min)', exercises: [
            { id: 'lymphatic-hops', hold: Math.round(20 * dm) },
            { id: 'knee-raises', hold: Math.round(20 * dm) },
            { id: 'single-leg-side-swings', hold: Math.round(20 * dm) },
            { id: 'bodyweight-squats', reps: Math.round(8 * dm) },
          ]},
          { name: 'Main - Legs + Hips (20 min)', exercises: [
            { id: 'bodyweight-squats', sets: Math.round(3 * dm), reps: Math.round(12 * dm), rest: Math.round(45 / dm) },
            { id: 'lunges', sets: Math.round(3 * dm), reps: Math.round(10 * dm), rest: 45 },
            { id: 'bulgarian-split-squat', sets: Math.round(2 * dm), reps: Math.round(8 * dm), rest: 45, note: week < 9 ? 'Use wall for balance' : undefined },
            { id: 'calf-raises', sets: Math.round(3 * dm), reps: Math.round(15 * dm), rest: 30 },
            { id: 'wall-sit', sets: Math.round(2 * dm), hold: Math.round(20 * dm), rest: 45 },
            { id: 'glute-bridge', sets: Math.round(3 * dm), reps: Math.round(12 * dm), rest: 30 },
          ]},
          { name: 'Cool-Down (5 min)', exercises: [
            { id: 'hip-flexor-stretch', hold: 25 },
            { id: 'hamstring-stretch', hold: 25 },
            { id: 'quad-stretch', hold: 20 },
            { id: 'glute-stretch', hold: 20 },
            { id: 'figure-4-stretch', hold: 20 },
          ]},
        ];
        break;

      case 3: // Thursday - Push + Core (volume)
        name = 'Push + Core (Volume)';
        blocks = [
          { name: 'Warm-Up (5 min)', exercises: [
            { id: 'zen-swing', hold: Math.round(30 * dm) },
            { id: 'golf-arm-swings', hold: Math.round(30 * dm) },
            { id: 'plank-shoulder-tap', reps: Math.round(6 * dm) },
          ]},
          { name: 'Main - Push + Core Volume (20 min)', exercises: [
            { id: pushExerciseId, sets: Math.round(4 * dm), reps: Math.round(8 * dm), rest: Math.round(60 / dm) },
            { id: 'doorframe-press', sets: Math.round(3 * dm), hold: Math.round(15 * dm), rest: 30 },
            { id: 'plank-shoulder-tap', sets: Math.round(3 * dm), reps: Math.round(10 * dm), rest: 30 },
            { id: 'plank', sets: Math.round(3 * dm), hold: Math.round(25 * dm), rest: 30 },
            { id: 'russian-twists', sets: Math.round(3 * dm), reps: Math.round(12 * dm), rest: 30 },
            { id: 'reverse-crunch', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 30 },
          ]},
          { name: 'Cool-Down (5 min)', exercises: [
            { id: 'chest-opener', hold: 20 },
            { id: 'triceps-stretch', hold: 20 },
            { id: 'neck-flexor-stretch', hold: 10 },
            { id: 'neck-extensor-stretch', hold: 10 },
          ]},
        ];
        break;

      case 4: // Friday - Pull + Legs (light circuit)
        name = 'Pull + Legs Circuit';
        blocks = [
          { name: 'Warm-Up (5 min)', exercises: [
            { id: 'arm-waves', hold: Math.round(20 * dm) },
            { id: 'knee-raises', hold: Math.round(20 * dm) },
            { id: 'bodyweight-squats', reps: Math.round(8 * dm) },
            { id: 'cat-cow', reps: Math.round(4 * dm) },
          ]},
          { name: 'Main - Circuit (20 min)', exercises: [
            { id: 'superman-hold', sets: Math.round(2 * dm), hold: Math.round(12 * dm), rest: 20 },
            { id: 'bodyweight-squats', sets: Math.round(2 * dm), reps: Math.round(12 * dm), rest: 20 },
            { id: 'reverse-fly', sets: Math.round(2 * dm), reps: Math.round(8 * dm), rest: 20 },
            { id: 'lunges', sets: Math.round(2 * dm), reps: Math.round(8 * dm), rest: 20 },
            { id: 'glute-bridge', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 20 },
            { id: 'shoulder-blade-squeeze', sets: Math.round(2 * dm), reps: Math.round(10 * dm), rest: 20 },
          ]},
          { name: 'Cool-Down (5 min)', exercises: [
            { id: 'knee-to-chest', hold: 20 },
            { id: 'lower-back-rotation', hold: 20 },
            { id: 'cat-cow', reps: 6 },
            { id: 'lower-back-flexibility', hold: 25 },
          ]},
        ];
        break;

      case 5: // Saturday - Flexibility & Mobility
        name = 'Flexibility & Mobility';
        blocks = [
          { name: 'Warm-Up Flow (5 min)', exercises: [
            { id: 'spine-waves', hold: Math.round(30 * dm) },
            { id: 'zen-swing', hold: Math.round(30 * dm) },
            { id: 'single-leg-side-swings', hold: Math.round(30 * dm) },
            { id: 'cat-cow', reps: Math.round(6 * dm) },
          ]},
          { name: 'Guided Stretch Flow (20 min)', exercises: [
            { id: 'chest-opener', hold: 25 },
            { id: 'thoracic-extension', hold: 20 },
            { id: 'upper-back-stretch', hold: 20 },
            { id: 'lat-stretch', hold: 20 },
            { id: 'hip-flexor-stretch', hold: 25 },
            { id: 'hamstring-stretch', hold: 25 },
            { id: 'quad-stretch', hold: 20 },
            { id: 'figure-4-stretch', hold: 25 },
            { id: 'inner-thigh-stretch', hold: 25 },
            { id: 'calf-stretch', hold: 20 },
            { id: 'deep-squat-hold', hold: Math.round(20 * dm) },
            { id: 'neck-presses', sets: 2, hold: 5, rest: 10, note: 'Optional, gentle only' },
          ]},
          { name: 'Final (5 min)', exercises: [
            { id: 'lower-back-flexibility', hold: 30 },
            { id: 'lower-back-rotation', hold: 20 },
            { id: 'shoulder-stretch', hold: 20 },
          ]},
        ];
        break;

      case 6: // Sunday - Active Recovery & Face/Lymph
        name = 'Active Recovery & Wellness';
        blocks = [
          { name: 'Morning Wake-Up (5 min)', exercises: [
            { id: 'arm-waves', hold: 20 },
            { id: 'lymphatic-hops', hold: 20 },
            { id: 'lymph-tapping', hold: 30, note: 'Optional wellness activity' },
            { id: 'spine-waves', hold: 20 },
          ]},
          { name: 'Face & Neck Care (10 min)', exercises: [
            { id: 'jaw-stretch', hold: 10, note: 'Optional' },
            { id: 'mouth-stretch', hold: 10, note: 'Optional' },
            { id: 'masseter-release', hold: 20, note: 'Optional' },
            { id: 'cheek-stretch', hold: 10, note: 'Optional' },
            { id: 'eye-relaxation', hold: 30 },
            { id: 'forehead-smoothing', hold: 20, note: 'Optional' },
            { id: 'neck-flexor-stretch', hold: 15 },
            { id: 'neck-extensor-stretch', hold: 15 },
            { id: 'neck-side-stretch', hold: 15 },
            { id: 'chin-tucks', reps: 8 },
            { id: 'scalp-massage', hold: 60, note: 'Optional' },
          ]},
          { name: 'Recovery (15 min)', exercises: [
            { id: 'breathing-4-6', hold: 120 },
            { id: 'lower-back-flexibility', hold: 30 },
            { id: 'knee-to-chest', hold: 20 },
            { id: 'cat-cow', reps: 6 },
          ]},
        ];
        est = 25;
        break;
    }
  }

  return {
    day: dayNum,
    week,
    dayOfWeek,
    name,
    phase,
    isDeload: deload,
    isTest: test,
    blocks,
    estimatedMinutes: est,
  };
}

// Generate full 182-day program
export function generateProgram(): WorkoutDay[] {
  const program: WorkoutDay[] = [];
  for (let i = 1; i <= 182; i++) {
    program.push(generateDay(i));
  }
  return program;
}

// Get program day info
export function getDayInfo(dayNum: number): WorkoutDay {
  return generateDay(dayNum);
}

// Calculate current day from start date
export function calculateCurrentDay(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(182, diffDays + 1));
}

// Get week number from day
export function getWeekFromDay(day: number): number {
  return Math.ceil(day / 7);
}

// Get day names
export const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const dayNamesShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
