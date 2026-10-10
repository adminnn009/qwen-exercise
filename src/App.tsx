import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { exercises, getExercise, categories, type Exercise, type Pose } from './data/exercises';
import { generateProgram, getDayInfo, calculateCurrentDay, getWeekFromDay, dayNamesShort, pushUpLevels, type WorkoutDay } from './data/program';

// ==================== STORAGE ====================
const STORAGE_KEY = 'fitstart_data';

interface AppData {
  startDate: string;
  currentDay: number;
  completedDays: string[]; // dates
  streak: number;
  bestStreak: number;
  lastCompletedDate: string;
  pushUpLevel: number;
  testResults: { day: number; date: string; exercise: string; value: number }[];
  notes: { date: string; text: string }[];
  settings: {
    darkMode: boolean;
    soundOn: boolean;
    voiceOn: boolean;
    textSize: number;
    reminderTime: string;
  };
  dailyChecklist: { date: string; water: boolean; sleep: boolean; walk: boolean; readiness: number };
  achievements: string[];
  totalMinutes: number;
  totalWorkouts: number;
}

const defaultData: AppData = {
  startDate: new Date().toISOString().split('T')[0],
  currentDay: 1,
  completedDays: [],
  streak: 0,
  bestStreak: 0,
  lastCompletedDate: '',
  pushUpLevel: 0,
  testResults: [],
  notes: [],
  settings: { darkMode: false, soundOn: true, voiceOn: false, textSize: 16, reminderTime: '07:00' },
  dailyChecklist: { date: '', water: false, sleep: false, walk: false, readiness: 3 },
  achievements: [],
  totalMinutes: 0,
  totalWorkouts: 0,
};

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultData, ...parsed, settings: { ...defaultData.settings, ...parsed.settings } };
    }
  } catch { /* ignore */ }
  return { ...defaultData };
}

function saveData(data: AppData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

// ==================== SVG STICK FIGURE ANIMATION ====================
function ExerciseAnimation({ exercise, size = 180 }: { exercise: Exercise; size?: number }) {
  const [frame, setFrame] = useState(0);
  const animRef = useRef<number>(0);
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, []
  );

  useEffect(() => {
    if (prefersReducedMotion || exercise.poses.length < 2) return;
    let start: number | null = null;
    const duration = exercise.animationType === 'hold' ? 3000 : 2000;
    
    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = (elapsed % duration) / duration;
      
      if (exercise.animationType === 'oscillate') {
        const t = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
        setFrame(t);
      } else if (exercise.animationType === 'sequence') {
        const idx = Math.floor(progress * exercise.poses.length);
        setFrame(idx / (exercise.poses.length - 1));
      } else {
        setFrame(0);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [exercise, prefersReducedMotion]);

  const interpolate = (p1: Pose, p2: Pose, t: number): Pose => {
    const lerp = (a: [number, number], b: [number, number]): [number, number] => [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
    ];
    return {
      head: lerp(p1.head, p2.head),
      neck: lerp(p1.neck, p2.neck),
      shoulderL: lerp(p1.shoulderL, p2.shoulderL),
      shoulderR: lerp(p1.shoulderR, p2.shoulderR),
      elbowL: lerp(p1.elbowL, p2.elbowL),
      elbowR: lerp(p1.elbowR, p2.elbowR),
      handL: lerp(p1.handL, p2.handL),
      handR: lerp(p1.handR, p2.handR),
      hipL: lerp(p1.hipL, p2.hipL),
      hipR: lerp(p1.hipR, p2.hipR),
      kneeL: lerp(p1.kneeL, p2.kneeL),
      kneeR: lerp(p1.kneeR, p2.kneeR),
      footL: lerp(p1.footL, p2.footL),
      footR: lerp(p1.footR, p2.footR),
    };
  };

  const poses = exercise.poses;
  const numSegments = poses.length - 1;
  const segment = Math.min(Math.floor(frame * numSegments), numSegments - 1);
  const segT = (frame * numSegments) - segment;
  const currentPose = poses.length >= 2 ? interpolate(poses[segment], poses[Math.min(segment + 1, poses.length - 1)], segT) : poses[0];

  const s = size / 100;
  const pt = (p: [number, number]): string => `${p[0] * s},${p[1] * s}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto" aria-label={`Animation: ${exercise.name}`}>
      {/* Head */}
      <circle cx={currentPose.head[0] * s} cy={currentPose.head[1] * s} r={6 * s} fill="none" stroke="currentColor" strokeWidth={2 * s} />
      {/* Neck to shoulders */}
      <line x1={currentPose.neck[0] * s} y1={currentPose.neck[1] * s} x2={currentPose.shoulderL[0] * s} y2={currentPose.shoulderL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.neck[0] * s} y1={currentPose.neck[1] * s} x2={currentPose.shoulderR[0] * s} y2={currentPose.shoulderR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Left arm */}
      <line x1={currentPose.shoulderL[0] * s} y1={currentPose.shoulderL[1] * s} x2={currentPose.elbowL[0] * s} y2={currentPose.elbowL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.elbowL[0] * s} y1={currentPose.elbowL[1] * s} x2={currentPose.handL[0] * s} y2={currentPose.handL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Right arm */}
      <line x1={currentPose.shoulderR[0] * s} y1={currentPose.shoulderR[1] * s} x2={currentPose.elbowR[0] * s} y2={currentPose.elbowR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.elbowR[0] * s} y1={currentPose.elbowR[1] * s} x2={currentPose.handR[0] * s} y2={currentPose.handR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Torso */}
      <line x1={currentPose.shoulderL[0] * s} y1={currentPose.shoulderL[1] * s} x2={currentPose.hipL[0] * s} y2={currentPose.hipL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.shoulderR[0] * s} y1={currentPose.shoulderR[1] * s} x2={currentPose.hipR[0] * s} y2={currentPose.hipR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Left leg */}
      <line x1={currentPose.hipL[0] * s} y1={currentPose.hipL[1] * s} x2={currentPose.kneeL[0] * s} y2={currentPose.kneeL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.kneeL[0] * s} y1={currentPose.kneeL[1] * s} x2={currentPose.footL[0] * s} y2={currentPose.footL[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Right leg */}
      <line x1={currentPose.hipR[0] * s} y1={currentPose.hipR[1] * s} x2={currentPose.kneeR[0] * s} y2={currentPose.kneeR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      <line x1={currentPose.kneeR[0] * s} y1={currentPose.kneeR[1] * s} x2={currentPose.footR[0] * s} y2={currentPose.footR[1] * s} stroke="currentColor" strokeWidth={2 * s} />
      {/* Joints */}
      {[currentPose.elbowL, currentPose.elbowR, currentPose.kneeL, currentPose.kneeR].map((p, i) => (
        <circle key={i} cx={p[0] * s} cy={p[1] * s} r={2 * s} fill="currentColor" />
      ))}
    </svg>
  );
}

// ==================== TIMER HOOK ====================
function useTimer(initialTime: number, onComplete: () => void, soundOn: boolean) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
    // Request wake lock
    if ('wakeLock' in navigator) {
      (navigator as any).wakeLock.request('screen').then((lock: WakeLockSentinel) => {
        wakeLockRef.current = lock;
      }).catch(() => {});
    }
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback((newTime?: number) => {
    setTimeLeft(newTime ?? initialTime);
    setIsRunning(false);
    setIsPaused(false);
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
    }
  }, [initialTime]);

  const skip = useCallback(() => {
    setTimeLeft(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (soundOn) {
              try {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = 800;
                gain.gain.value = 0.3;
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
              } catch {}
            }
            onComplete();
            return 0;
          }
          // Beep at 3, 2, 1
          if (prev <= 4 && prev > 1 && soundOn) {
            try {
              const ctx = new AudioContext();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 600;
              gain.gain.value = 0.2;
              osc.start();
              osc.stop(ctx.currentTime + 0.1);
            } catch {}
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, timeLeft, onComplete, soundOn]);

  useEffect(() => {
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
      }
    };
  }, []);

  return { timeLeft, isRunning, isPaused, start, pause, resume, reset, skip };
}

// ==================== SPEECH ====================
function speak(text: string, enabled: boolean) {
  if (!enabled || !('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.9;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

// ==================== MAIN APP ====================
export default function App() {
  const [data, setData] = useState<AppData>(loadData);
  const [page, setPage] = useState<'today' | 'plan' | 'library' | 'progress' | 'settings' | 'workout' | 'guide'>('today');
  const [showDisclaimer, setShowDisclaimer] = useState(() => !localStorage.getItem('fitstart_disclaimer_accepted'));
  const [workoutState, setWorkoutState] = useState<{ day: WorkoutDay; exerciseIdx: number; setIdx: number; phase: 'exercise' | 'rest' | 'complete' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Save data on changes
  useEffect(() => { saveData(data); }, [data]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', data.settings.darkMode);
    document.documentElement.style.colorScheme = data.settings.darkMode ? 'dark' : 'light';
  }, [data.settings.darkMode]);

  // Listen for navigation events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) setPage(detail);
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  // Calculate today's day
  const todayDay = useMemo(() => {
    if (data.completedDays.length === 0) return 1;
    const lastCompleted = data.completedDays[data.completedDays.length - 1];
    const lastDate = new Date(lastCompleted);
    const today = new Date();
    const diff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(182, data.currentDay + diff);
  }, [data.completedDays, data.currentDay]);

  const todayInfo = useMemo(() => getDayInfo(todayDay), [todayDay]);
  const program = useMemo(() => generateProgram(), []);

  // Streak calculation
  const updateStreak = useCallback((date: string) => {
    setData(prev => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      const isConsecutive = prev.lastCompletedDate === yesterdayStr || prev.lastCompletedDate === date;
      const newStreak = isConsecutive ? prev.streak + 1 : 1;
      const newBest = Math.max(prev.bestStreak, newStreak);
      
      // Check achievements
      const achievements = [...prev.achievements];
      if (newStreak >= 7 && !achievements.includes('streak-7')) achievements.push('streak-7');
      if (newStreak >= 30 && !achievements.includes('streak-30')) achievements.push('streak-30');
      if (newStreak >= 100 && !achievements.includes('streak-100')) achievements.push('streak-100');
      
      return {
        ...prev,
        streak: newStreak,
        bestStreak: newBest,
        lastCompletedDate: date,
        completedDays: prev.completedDays.includes(date) ? prev.completedDays : [...prev.completedDays, date],
        totalWorkouts: prev.totalWorkouts + 1,
        totalMinutes: prev.totalMinutes + (todayInfo?.estimatedMinutes || 30),
        achievements,
      };
    });
  }, [todayInfo]);

  // Start workout
  const startWorkout = useCallback(() => {
    setWorkoutState({ day: todayInfo, exerciseIdx: 0, setIdx: 0, phase: 'exercise' });
    setPage('workout');
  }, [todayInfo]);

  // Complete workout
  const completeWorkout = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    updateStreak(today);
    setData(prev => ({
      ...prev,
      currentDay: Math.min(182, todayDay + 1),
    }));
    setWorkoutState(null);
    setPage('today');
  }, [todayDay, updateStreak]);

  // Check achievements for day milestones
  useEffect(() => {
    const achievements = [...data.achievements];
    if (todayDay >= 30 && !achievements.includes('day-30')) achievements.push('day-30');
    if (todayDay >= 100 && !achievements.includes('day-100')) achievements.push('day-100');
    if (todayDay >= 182 && !achievements.includes('day-182')) achievements.push('day-182');
    if (data.pushUpLevel >= 4 && !achievements.includes('first-pushup')) achievements.push('first-pushup');
    if (achievements.length > data.achievements.length) {
      setData(prev => ({ ...prev, achievements }));
    }
  }, [todayDay, data.pushUpLevel, data.achievements]);

  // Export/Import
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitstart-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        if (imported.startDate && imported.currentDay) {
          setData({ ...defaultData, ...imported, settings: { ...defaultData.settings, ...imported.settings } });
          alert('Data imported successfully!');
        } else {
          alert('Invalid backup file.');
        }
      } catch {
        alert('Error reading file. Please try again.');
      }
    };
    reader.readAsText(file);
  };

  // Filter exercises for library
  const filteredExercises = useMemo(() => {
    let result = exercises;
    if (selectedCategory) result = result.filter(e => e.category === selectedCategory);
    if (searchQuery) result = result.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.category.includes(searchQuery.toLowerCase()));
    return result;
  }, [searchQuery, selectedCategory]);

  // ==================== DISCLAIMER ====================
  if (showDisclaimer) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h1 className="text-xl font-bold text-emerald-600 mb-4">⚠️ Important Safety Notice</h1>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>• Consult a doctor before starting any exercise program, especially if you have existing injuries or health conditions.</p>
            <p>• <strong>Stop immediately</strong> if you experience dizziness, chest pain, sharp pain, or unusual shortness of breath.</p>
            <p>• This app does not provide medical advice or promise specific physical changes.</p>
            <p>• All stretches should be held at mild tension, never pain. No bouncing or forced movements.</p>
            <p>• Face, jaw, neck, and scalp exercises are optional wellness activities. They do not reshape bone structure.</p>
            <p>• Never use unstable furniture to support body weight without checking stability first.</p>
          </div>
          <button
            onClick={() => { setShowDisclaimer(false); localStorage.setItem('fitstart_disclaimer_accepted', '1'); }}
            className="mt-6 w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold active:bg-emerald-700"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    );
  }

  // ==================== WORKOUT PLAYER ====================
  if (page === 'workout' && workoutState) {
    return <WorkoutPlayer state={workoutState} setState={setWorkoutState} data={data} setData={setData} onComplete={completeWorkout} onBack={() => setPage('today')} />;
  }

  // ==================== PAGES ====================
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-20" style={{ fontSize: `${data.settings.textSize}px` }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-emerald-600">FitStart</h1>
          <span className="text-sm text-gray-500">Day {todayDay} / 182</span>
        </div>
      </header>

      {/* Page Content */}
      <main className="px-4 py-4 max-w-lg mx-auto">
        {page === 'today' && <TodayPage data={data} todayInfo={todayInfo} todayDay={todayDay} startWorkout={startWorkout} setData={setData} />}
        {page === 'plan' && <PlanPage program={program} todayDay={todayDay} data={data} />}
        {page === 'library' && <LibraryPage exercises={filteredExercises} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onSelect={setSelectedExercise} />}
        {page === 'progress' && <ProgressPage data={data} todayDay={todayDay} setData={setData} />}
        {page === 'settings' && <SettingsPage data={data} setData={setData} exportData={exportData} importData={importData} />}
        {page === 'guide' && <GuidePage />}
      </main>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <ExerciseDetail exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-around max-w-lg mx-auto">
          {[
            { id: 'today' as const, label: 'Today', icon: '🏠' },
            { id: 'plan' as const, label: 'Plan', icon: '📅' },
            { id: 'library' as const, label: 'Library', icon: '📚' },
            { id: 'progress' as const, label: 'Progress', icon: '📊' },
            { id: 'settings' as const, label: 'Settings', icon: '⚙️' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex flex-col items-center py-2 px-3 text-xs ${page === item.id ? 'text-emerald-600' : 'text-gray-500'}`}
              aria-label={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ==================== TODAY PAGE ====================
function TodayPage({ data, todayInfo, todayDay, startWorkout, setData }: {
  data: AppData; todayInfo: WorkoutDay; todayDay: number; startWorkout: () => void; setData: (fn: (prev: AppData) => AppData) => void;
}) {
  const [showReadiness, setShowReadiness] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = data.completedDays.includes(today);
  const week = getWeekFromDay(todayDay);

  return (
    <div className="space-y-4">
      {/* Day Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Week {week} · {todayInfo.phase}</p>
            <h2 className="text-xl font-bold">{todayInfo.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-600">{todayDay}</p>
            <p className="text-xs text-gray-500">/ 182</p>
          </div>
        </div>
        {todayInfo.isDeload && <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">📉 Deload Week</span>}
        {todayInfo.isTest && <span className="inline-block px-2 py-0.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs rounded-full ml-1">📝 Test Day</span>}
        <p className="text-sm text-gray-500 mt-2">~{todayInfo.estimatedMinutes} min · {dayNamesShort[todayInfo.dayOfWeek]}</p>
      </div>

      {/* Streak */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-around">
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-500">🔥 {data.streak}</p>
          <p className="text-xs text-gray-500">Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-500">🏆 {data.bestStreak}</p>
          <p className="text-xs text-gray-500">Best</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-500">💪 {data.totalWorkouts}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      {/* Readiness Check */}
      {!showReadiness && (
        <button onClick={() => setShowReadiness(true)} className="w-full py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium">
          📋 Daily Readiness Check
        </button>
      )}
      {showReadiness && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="font-semibold text-sm">How are you feeling today?</h3>
          {['Sleep quality', 'Energy level', 'Muscle soreness'].map((label, i) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    onClick={() => setData(prev => ({ ...prev, dailyChecklist: { ...prev.dailyChecklist, date: today, readiness: n } }))}
                    className={`w-8 h-8 rounded-full text-xs font-bold ${data.dailyChecklist.date === today && data.dailyChecklist.readiness === n ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                  >{n}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={() => setShowReadiness(false)} className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">Close</button>
          </div>
          {data.dailyChecklist.date === today && data.dailyChecklist.readiness <= 2 && (
            <p className="text-xs text-amber-600 dark:text-amber-400">💡 Low energy detected. Consider a lighter session or extra rest.</p>
          )}
        </div>
      )}

      {/* Checklist */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-3">Daily Wellness</h3>
        <div className="space-y-2">
          {[
            { key: 'water' as const, label: '💧 Drank enough water', },
            { key: 'sleep' as const, label: '😴 Got 7+ hours sleep', },
            { key: 'walk' as const, label: '🚶 10-min walk or steps goal', },
          ].map(item => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.dailyChecklist.date === today && (data.dailyChecklist as any)[item.key]}
                onChange={(e) => setData(prev => ({
                  ...prev,
                  dailyChecklist: { ...prev.dailyChecklist, date: today, [item.key]: e.target.checked }
                }))}
                className="w-5 h-5 rounded accent-emerald-500"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Workout Blocks Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-3">Today's Workout</h3>
        {todayInfo.blocks.map((block, bi) => (
          <div key={bi} className="mb-3">
            <p className="text-xs font-medium text-emerald-600 mb-1">{block.name}</p>
            <div className="space-y-1">
              {block.exercises.map((ex, ei) => {
                const exercise = getExercise(ex.id);
                if (!exercise) return null;
                return (
                  <div key={ei} className="flex items-center justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="truncate flex-1">{exercise.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      {ex.sets ? `${ex.sets}×` : ''}{ex.reps && ex.reps < 99 ? `${ex.reps} reps` : ''}{ex.hold && ex.hold < 999 ? `${ex.hold}s` : ''}
                      {ex.note && <span className="text-amber-500 ml-1">({ex.note})</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {!isCompleted ? (
        <button onClick={startWorkout} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg active:bg-emerald-700 shadow-lg">
          ▶ Start Workout
        </button>
      ) : (
        <div className="text-center py-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl">
          <p className="text-emerald-600 font-bold">✅ Today's workout complete!</p>
          <p className="text-sm text-gray-500">Great job! Come back tomorrow.</p>
        </div>
      )}

      {/* Notes */}
      <button onClick={() => setShowNote(!showNote)} className="w-full py-2 text-sm text-gray-500">
        📝 {showNote ? 'Hide notes' : 'Add a note'}
      </button>
      {showNote && (
        <div className="space-y-2">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="How did you feel today?"
            className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm resize-none h-20"
          />
          <button
            onClick={() => {
              if (noteText.trim()) {
                setData(prev => ({ ...prev, notes: [...prev.notes, { date: today, text: noteText.trim() }] }));
                setNoteText('');
              }
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
          >Save Note</button>
        </div>
      )}

      {/* Guide Link */}
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'guide' }))} className="w-full py-3 text-sm text-gray-500 underline">
        📖 Read the Guide (warm-up, breathing, form, recovery, nutrition)
      </button>
    </div>
  );
}

// ==================== WORKOUT PLAYER ====================
function WorkoutPlayer({ state, setState, data, setData, onComplete, onBack }: {
  state: { day: WorkoutDay; exerciseIdx: number; setIdx: number; phase: 'exercise' | 'rest' | 'complete' };
  setState: (s: any) => void;
  data: AppData;
  setData: (fn: (prev: AppData) => AppData) => void;
  onComplete: () => void;
  onBack: () => void;
}) {
  // Flatten all exercises from blocks
  const allExercises = useMemo(() => {
    const flat: { exercise: Exercise; sets: number; reps: number; hold: number; rest: number; note?: string }[] = [];
    state.day.blocks.forEach(block => {
      block.exercises.forEach(ex => {
        const exercise = getExercise(ex.id);
        if (exercise) {
          flat.push({
            exercise,
            sets: ex.sets || 1,
            reps: ex.reps || exercise.defaultReps || 10,
            hold: ex.hold || exercise.defaultHold || 20,
            rest: ex.rest || 30,
            note: ex.note,
          });
        }
      });
    });
    return flat;
  }, [state.day]);

  const currentEx = allExercises[state.exerciseIdx];
  const totalExercises = allExercises.length;
  const progress = totalExercises > 0 ? (state.exerciseIdx / totalExercises) * 100 : 0;

  const [showPain, setShowPain] = useState(false);
  const timerDuration = currentEx ? (currentEx.exercise.type === 'hold' || currentEx.exercise.type === 'timed' ? currentEx.hold : currentEx.rest) : 30;

  const handleTimerComplete = useCallback(() => {
    if (state.phase === 'exercise') {
      // Move to next set or next exercise
      if (state.setIdx < currentEx.sets - 1) {
        setState({ ...state, setIdx: state.setIdx + 1, phase: 'rest' });
      } else {
        if (state.exerciseIdx < totalExercises - 1) {
          setState({ ...state, exerciseIdx: state.exerciseIdx + 1, setIdx: 0, phase: 'exercise' });
        } else {
          setState({ ...state, phase: 'complete' });
        }
      }
    } else if (state.phase === 'rest') {
      setState({ ...state, setIdx: state.setIdx, phase: 'exercise' });
    }
  }, [state, currentEx, totalExercises, setState]);

  const timer = useTimer(
    state.phase === 'rest' ? currentEx?.rest || 30 : (currentEx ? (currentEx.exercise.type === 'reps' ? currentEx.rest : timerDuration) : 30),
    handleTimerComplete,
    data.settings.soundOn
  );

  // Voice cues
  useEffect(() => {
    if (!currentEx) return;
    if (state.phase === 'exercise' && timer.timeLeft === (currentEx.exercise.type === 'reps' ? currentEx.rest || 30 : timerDuration)) {
      speak(`${currentEx.exercise.name}. ${currentEx.sets > 1 ? `Set ${state.setIdx + 1} of ${currentEx.sets}.` : ''}`, data.settings.voiceOn);
    }
  }, [state.exerciseIdx, state.phase, state.setIdx]);

  if (!currentEx) return null;

  if (state.phase === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <p className="text-6xl">🎉</p>
          <h2 className="text-2xl font-bold text-emerald-600">Workout Complete!</h2>
          <p className="text-gray-500">Great job! You finished today's session.</p>
          <button onClick={onComplete} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-gray-500">← Back</button>
        <span className="text-sm text-gray-500">{state.exerciseIdx + 1} / {totalExercises}</span>
        <span className="text-sm font-medium text-emerald-600">
          {state.phase === 'rest' ? 'Rest' : `Set ${state.setIdx + 1}/${currentEx.sets}`}
        </span>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-4">
          <h2 className="text-xl font-bold text-center">{currentEx.exercise.name}</h2>
          {currentEx.note && <p className="text-xs text-center text-amber-600">⚠️ {currentEx.note}</p>}
          
          {/* Animation */}
          <div className="flex justify-center py-2">
            <ExerciseAnimation exercise={currentEx.exercise} size={160} />
          </div>

          {/* Timer */}
          <div className="text-center">
            {currentEx.exercise.type === 'reps' ? (
              <div>
                <p className="text-4xl font-bold">{currentEx.reps < 99 ? `${currentEx.reps} reps` : 'Max reps'}</p>
                <p className="text-sm text-gray-500 mt-1">Rest: {currentEx.rest}s between sets</p>
              </div>
            ) : (
              <div>
                <p className="text-5xl font-bold font-mono">{Math.floor(timer.timeLeft / 60)}:{(timer.timeLeft % 60).toString().padStart(2, '0')}</p>
                <p className="text-sm text-gray-500 mt-1">{state.phase === 'rest' ? 'Rest timer' : 'Hold time'}</p>
              </div>
            )}
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center gap-3">
            {!timer.isRunning ? (
              <button onClick={() => timer.start()} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg">
                ▶ Start
              </button>
            ) : (
              <>
                <button onClick={timer.pause} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-bold">
                  ⏸ Pause
                </button>
                <button onClick={timer.skip} className="px-6 py-3 bg-gray-300 dark:bg-gray-700 rounded-xl font-bold">
                  ⏭ Skip
                </button>
              </>
            )}
            {timer.isPaused && (
              <button onClick={timer.resume} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold">
                ▶ Resume
              </button>
            )}
          </div>

          {/* Form Cues */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-sm text-emerald-600">Form Cues</h3>
            {currentEx.exercise.cues.map((cue, i) => (
              <p key={i} className="text-sm flex gap-2"><span>✓</span><span>{cue}</span></p>
            ))}
          </div>

          {/* Common Mistake */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400">⚠️ Common mistake: {currentEx.exercise.mistakes}</p>
          </div>

          {/* Easier / Harder */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Easier:</p>
              <p className="text-xs text-blue-600 dark:text-blue-300">{currentEx.exercise.easier}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
              <p className="text-xs font-medium text-purple-700 dark:text-purple-400">Harder:</p>
              <p className="text-xs text-purple-600 dark:text-purple-300">{currentEx.exercise.harder}</p>
            </div>
          </div>

          {/* Muscles */}
          <p className="text-xs text-gray-500 text-center">💪 {currentEx.exercise.muscles}</p>

          {/* Pain Button */}
          <button onClick={() => setShowPain(true)} className="w-full py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl text-sm font-medium">
            🛑 Stop – This Hurts
          </button>
          {showPain && (
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 space-y-2">
              <p className="text-sm font-medium text-red-700 dark:text-red-400">Stop this exercise immediately.</p>
              <p className="text-xs text-red-600 dark:text-red-300">• Try: {currentEx.exercise.easier}</p>
              <p className="text-xs text-red-600 dark:text-red-300">• If pain persists, skip this exercise and rest.</p>
              <p className="text-xs text-red-600 dark:text-red-300">• Consult a doctor if pain continues or worsens.</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setShowPain(false); timer.skip(); }} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm">Skip Exercise</button>
                <button onClick={() => setShowPain(false)} className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">Continue</button>
              </div>
            </div>
          )}

          {/* Video Link */}
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentEx.exercise.youtubeQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-blue-500 underline py-2"
          >
            🎥 Watch video demonstration
          </a>

          {/* Navigation */}
          <div className="flex gap-2 pb-4">
            {state.exerciseIdx > 0 && (
              <button onClick={() => setState({ ...state, exerciseIdx: state.exerciseIdx - 1, setIdx: 0, phase: 'exercise' })} className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium">
                ← Back
              </button>
            )}
            <button onClick={() => {
              if (state.exerciseIdx < totalExercises - 1) {
                setState({ ...state, exerciseIdx: state.exerciseIdx + 1, setIdx: 0, phase: 'exercise' });
              } else {
                setState({ ...state, phase: 'complete' });
              }
            }} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-medium">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PLAN PAGE ====================
function PlanPage({ program, todayDay, data }: { program: WorkoutDay[]; todayDay: number; data: AppData }) {
  const [viewWeek, setViewWeek] = useState(getWeekFromDay(todayDay));
  const weekDays = program.filter(d => d.week === viewWeek);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => setViewWeek(Math.max(1, viewWeek - 1))} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">←</button>
        <h2 className="font-bold">Week {viewWeek} · {weekDays[0]?.phase}</h2>
        <button onClick={() => setViewWeek(Math.min(26, viewWeek + 1))} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">→</button>
      </div>

      {weekDays[0]?.isDeload && (
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-sm text-blue-700 dark:text-blue-300">
          📉 This is a deload week – reduced volume for recovery.
        </div>
      )}

      <div className="space-y-2">
        {weekDays.map(day => {
          const date = new Date(data.startDate);
          date.setDate(date.getDate() + day.day - 1);
          const dateStr = date.toISOString().split('T')[0];
          const isCompleted = data.completedDays.includes(dateStr);
          const isToday = day.day === todayDay;

          return (
            <div key={day.day} className={`bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm ${isToday ? 'ring-2 ring-emerald-500' : ''} ${isCompleted ? 'opacity-70' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">
                    {isCompleted && '✅ '}{day.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Day {day.day} · {dayNamesShort[day.dayOfWeek]} · ~{day.estimatedMinutes}min
                    {day.isTest && ' · 📝 Test'}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  day.phase === 'Foundation' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                  day.phase === 'Build' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                  'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                }`}>{day.phase.slice(0, 5)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Activity (last 26 weeks)</h3>
        <div className="flex flex-wrap gap-0.5">
          {program.map(day => {
            const date = new Date(data.startDate);
            date.setDate(date.getDate() + day.day - 1);
            const dateStr = date.toISOString().split('T')[0];
            const completed = data.completedDays.includes(dateStr);
            return (
              <div
                key={day.day}
                className={`w-2.5 h-2.5 rounded-sm ${completed ? 'bg-emerald-500' : day.day <= todayDay ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}`}
                title={`Day ${day.day}: ${day.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== LIBRARY PAGE ====================
function LibraryPage({ exercises: exList, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, onSelect }: {
  exercises: Exercise[]; searchQuery: string; setSearchQuery: (s: string) => void;
  selectedCategory: string; setSelectedCategory: (s: string) => void; onSelect: (e: Exercise) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Exercise Library</h2>
      
      <input
        type="text"
        placeholder="Search exercises..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${!selectedCategory ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >All</button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${cat.id === selectedCategory ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >{cat.icon} {cat.name}</button>
        ))}
      </div>

      <div className="space-y-2">
        {exList.map(ex => (
          <button
            key={ex.id}
            onClick={() => onSelect(ex)}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm text-left flex items-center gap-3"
          >
            <div className="w-12 h-12 flex items-center justify-center text-emerald-600">
              <ExerciseAnimation exercise={ex} size={48} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{ex.name}</p>
              <p className="text-xs text-gray-500">{ex.muscles}</p>
            </div>
            <span className="text-xs text-gray-400">{ex.type === 'reps' ? `${ex.defaultReps} reps` : `${ex.defaultHold}s`}</span>
          </button>
        ))}
      </div>
      {exList.length === 0 && <p className="text-center text-gray-500 py-8">No exercises found.</p>}
    </div>
  );
}

// ==================== EXERCISE DETAIL ====================
function ExerciseDetail({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{exercise.name}</h2>
          <button onClick={onClose} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">✕</button>
        </div>

        <div className="flex justify-center py-2">
          <ExerciseAnimation exercise={exercise} size={180} />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-emerald-600">Form Cues</h3>
            {exercise.cues.map((c, i) => <p key={i} className="text-sm">✓ {c}</p>)}
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
            <p className="text-xs font-medium text-amber-700 dark:text-amber-400">⚠️ Common mistake: {exercise.mistakes}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
              <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Easier:</p>
              <p className="text-xs">{exercise.easier}</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3">
              <p className="text-xs font-medium text-purple-700 dark:text-purple-400">Harder:</p>
              <p className="text-xs">{exercise.harder}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">💪 Muscles: {exercise.muscles}</p>
          <p className="text-xs text-gray-500">🛑 Stop if: {exercise.stopCondition}</p>
          <p className="text-xs text-gray-500">📊 Type: {exercise.type === 'reps' ? `${exercise.defaultReps} reps` : `${exercise.defaultHold}s hold`}</p>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.youtubeQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-blue-500 underline py-2"
          >🎥 Watch video on YouTube</a>
        </div>
      </div>
    </div>
  );
}

// ==================== PROGRESS PAGE ====================
function ProgressPage({ data, todayDay, setData }: { data: AppData; todayDay: number; setData: (fn: (prev: AppData) => AppData) => void }) {
  const [showTest, setShowTest] = useState(false);
  const [testExercise, setTestExercise] = useState('');
  const [testValue, setTestValue] = useState('');

  const addTestResult = () => {
    if (!testExercise || !testValue) return;
    setData(prev => ({
      ...prev,
      testResults: [...prev.testResults, { day: todayDay, date: new Date().toISOString().split('T')[0], exercise: testExercise, value: Number(testValue) }],
    }));
    setTestValue('');
  };

  // Simple chart using SVG
  const renderChart = (exerciseName: string) => {
    const results = data.testResults.filter(r => r.exercise === exerciseName);
    if (results.length === 0) return <p className="text-xs text-gray-500">No data yet</p>;
    const maxVal = Math.max(...results.map(r => r.value), 1);
    const w = 280;
    const h = 80;
    const points = results.map((r, i) => {
      const x = (i / Math.max(results.length - 1, 1)) * (w - 20) + 10;
      const y = h - (r.value / maxVal) * (h - 20) - 10;
      return `${x},${y}`;
    });
    return (
      <svg width={w} height={h} className="mx-auto">
        <polyline points={points.join(' ')} fill="none" stroke="#059669" strokeWidth="2" />
        {results.map((r, i) => {
          const x = (i / Math.max(results.length - 1, 1)) * (w - 20) + 10;
          const y = h - (r.value / maxVal) * (h - 20) - 10;
          return <circle key={i} cx={x} cy={y} r="3" fill="#059669" />;
        })}
      </svg>
    );
  };

  const week = getWeekFromDay(todayDay);
  const completionRate = data.completedDays.length > 0 ? Math.round((data.completedDays.length / todayDay) * 100) : 0;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Progress</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-emerald-600">{data.totalWorkouts}</p>
          <p className="text-xs text-gray-500">Workouts Done</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600">{data.totalMinutes}</p>
          <p className="text-xs text-gray-500">Total Minutes</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-orange-500">{data.streak}</p>
          <p className="text-xs text-gray-500">Current Streak</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-purple-500">{completionRate}%</p>
          <p className="text-xs text-gray-500">Completion Rate</p>
        </div>
      </div>

      {/* Push-up Level */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Push-Up Level</h3>
        <p className="text-sm text-emerald-600 font-medium">{pushUpLevels[data.pushUpLevel]?.name}</p>
        <div className="flex gap-1 mt-2">
          {pushUpLevels.map((level, i) => (
            <button
              key={i}
              onClick={() => setData(prev => ({ ...prev, pushUpLevel: i }))}
              className={`flex-1 h-2 rounded-full ${i <= data.pushUpLevel ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`}
              title={level.name}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1">Tap to manually set your level</p>
      </div>

      {/* Progress Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Progress Tests (every 4 weeks)</h3>
        
        <div className="space-y-3">
          {['Max Push-Ups', 'Plank Hold (s)', 'Wall Sit (s)', 'Max Chin Tucks'].map(name => (
            <div key={name}>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{name}</p>
              {renderChart(name)}
            </div>
          ))}
        </div>

        <button onClick={() => setShowTest(!showTest)} className="mt-3 w-full py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium">
          + Log Test Result
        </button>
        {showTest && (
          <div className="mt-2 space-y-2">
            <select value={testExercise} onChange={e => setTestExercise(e.target.value)} className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
              <option value="">Select test...</option>
              <option value="Max Push-Ups">Max Push-Ups</option>
              <option value="Plank Hold (s)">Plank Hold (seconds)</option>
              <option value="Wall Sit (s)">Wall Sit (seconds)</option>
              <option value="Max Chin Tucks">Max Chin Tucks</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              value={testValue}
              onChange={e => setTestValue(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
            />
            <button onClick={addTestResult} className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm">Save</button>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'streak-7', label: '🔥 7-Day Streak' },
            { id: 'streak-30', label: '🔥 30-Day Streak' },
            { id: 'streak-100', label: '🔥 100-Day Streak' },
            { id: 'day-30', label: '📅 Day 30' },
            { id: 'day-100', label: '📅 Day 100' },
            { id: 'day-182', label: '🏆 Program Complete!' },
            { id: 'first-pushup', label: '💪 First Full Push-Up' },
          ].map(a => (
            <span key={a.id} className={`px-2 py-1 rounded-full text-xs ${data.achievements.includes(a.id) ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
              {a.label} {data.achievements.includes(a.id) ? '✓' : '🔒'}
            </span>
          ))}
        </div>
      </div>

      {/* Weekly Review */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-sm mb-2">Week {week} Summary</h3>
        {(() => {
          const weekStart = (week - 1) * 7 + 1;
          const weekEnd = Math.min(week * 7, 182);
          let completed = 0;
          for (let d = weekStart; d <= weekEnd; d++) {
            const date = new Date(data.startDate);
            date.setDate(date.getDate() + d - 1);
            if (data.completedDays.includes(date.toISOString().split('T')[0])) completed++;
          }
          return (
            <div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(completed / 7) * 100}%` }} />
                </div>
                <span className="text-sm font-medium">{completed}/7</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {completed >= 6 ? '🌟 Excellent week!' : completed >= 4 ? '👍 Good progress!' : completed >= 2 ? '💪 Keep going!' : '🌱 Every step counts'}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ==================== SETTINGS PAGE ====================
function SettingsPage({ data, setData, exportData, importData }: {
  data: AppData; setData: (fn: (prev: AppData) => AppData) => void; exportData: () => void; importData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [resetStep, setResetStep] = useState(0);
  const [resetText, setResetText] = useState('');

  const handleReset = () => {
    if (resetText === 'RESET') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('fitstart_disclaimer_accepted');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Settings</h2>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm">Appearance</h3>
        <label className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <input
            type="checkbox"
            checked={data.settings.darkMode}
            onChange={e => setData(prev => ({ ...prev, settings: { ...prev.settings, darkMode: e.target.checked } }))}
            className="w-10 h-6 accent-emerald-500"
          />
        </label>
        <div>
          <span className="text-sm">Text Size: {data.settings.textSize}px</span>
          <input
            type="range"
            min="14"
            max="22"
            value={data.settings.textSize}
            onChange={e => setData(prev => ({ ...prev, settings: { ...prev.settings, textSize: Number(e.target.value) } }))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>

      {/* Sound */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm">Sound & Voice</h3>
        <label className="flex items-center justify-between">
          <span className="text-sm">Sound Effects</span>
          <input
            type="checkbox"
            checked={data.settings.soundOn}
            onChange={e => setData(prev => ({ ...prev, settings: { ...prev.settings, soundOn: e.target.checked } }))}
            className="w-10 h-6 accent-emerald-500"
          />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-sm">Voice Cues</span>
          <input
            type="checkbox"
            checked={data.settings.voiceOn}
            onChange={e => setData(prev => ({ ...prev, settings: { ...prev.settings, voiceOn: e.target.checked } }))}
            className="w-10 h-6 accent-emerald-500"
          />
        </label>
      </div>

      {/* Reminder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm">Reminder</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Daily reminder time</span>
          <input
            type="time"
            value={data.settings.reminderTime}
            onChange={e => setData(prev => ({ ...prev, settings: { ...prev.settings, reminderTime: e.target.value } }))}
            className="p-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <button
          onClick={async () => {
            if ('Notification' in window) {
              const perm = await Notification.requestPermission();
              if (perm === 'granted') {
                alert('Notifications enabled! You\'ll be reminded at ' + data.settings.reminderTime);
              } else {
                alert('Notification permission denied.');
              }
            } else {
              alert('Notifications not supported in this browser.');
            }
          }}
          className="w-full py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
        >
          🔔 Enable Notifications
        </button>
      </div>

      {/* Program Start Date */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm">Program</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm">Start date</span>
          <input
            type="date"
            value={data.startDate}
            onChange={e => setData(prev => ({ ...prev, startDate: e.target.value }))}
            className="p-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <p className="text-xs text-gray-500">Current day: {data.currentDay} / 182</p>
      </div>

      {/* Backup */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm">Backup & Restore</h3>
        <button onClick={exportData} className="w-full py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium">
          📤 Export Backup (JSON)
        </button>
        <label className="w-full py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium text-center block cursor-pointer">
          📥 Import Backup
          <input type="file" accept=".json" onChange={importData} className="hidden" />
        </label>
      </div>

      {/* Guide */}
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'guide' }))} className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-left">
        <p className="font-semibold text-sm">📖 Fitness Guide</p>
        <p className="text-xs text-gray-500">Warm-up, breathing, form, recovery, nutrition, sleep, posture</p>
      </button>

      {/* Reset Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm text-red-600">Reset Options</h3>
        <button
          onClick={() => setData(prev => ({ ...prev, streak: 0, bestStreak: prev.bestStreak }))}
          className="w-full py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
        >
          Reset Streak Only
        </button>
        <button
          onClick={() => setData(prev => ({ ...prev, currentDay: 1, completedDays: [], streak: 0 }))}
          className="w-full py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
        >
          Restart from Day 1
        </button>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          {resetStep === 0 && (
            <button onClick={() => setResetStep(1)} className="w-full py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
              🗑️ Erase Everything
            </button>
          )}
          {resetStep === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-red-600">Type "RESET" to confirm. This cannot be undone.</p>
              <input
                type="text"
                value={resetText}
                onChange={e => setResetText(e.target.value)}
                placeholder='Type "RESET"'
                className="w-full p-2 rounded border border-red-300 text-sm"
              />
              <div className="flex gap-2">
                <button onClick={() => { setResetStep(0); setResetText(''); }} className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm">Cancel</button>
                <button onClick={handleReset} disabled={resetText !== 'RESET'} className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm disabled:opacity-50">Confirm</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== GUIDE PAGE ====================
function GuidePage() {
  const [section, setSection] = useState('');
  
  const sections: Record<string, { title: string; content: string[] }> = {
    warmup: {
      title: '🌅 Warm-Up Guidelines',
      content: [
        'Always warm up for 3-5 minutes before training.',
        'Start with gentle movements to increase blood flow.',
        'Never stretch cold muscles aggressively.',
        'Arm circles, gentle torso rotations, and light marching are good starters.',
        'Your warm-up should feel easy – save energy for the main workout.',
        'If you feel stiff, extend warm-up by 1-2 minutes.',
      ]
    },
    breathing: {
      title: '🫁 Breathing',
      content: [
        'Exhale during the hard part of each movement (the exertion).',
        'Inhale during the easy/return phase.',
        'Never hold your breath during exercises.',
        'For holds (planks, wall sits): breathe steadily and deeply.',
        '4-6 breathing: inhale 4 counts through nose, exhale 6 counts through mouth.',
        'If you feel lightheaded, stop and breathe normally.',
      ]
    },
    form: {
      title: '🏋️ Form Principles',
      content: [
        'Quality over quantity – always prioritize good form.',
        'Move slowly and with control. No momentum.',
        'If form breaks down, stop the set or regress to an easier variation.',
        'Keep core engaged during all standing and push exercises.',
        'Shoulders down and back (not hunched) during upper body work.',
        'Knees track over toes during squats and lunges.',
        'Neutral spine – don\'t over-arch or round your back.',
      ]
    },
    recovery: {
      title: '😴 Recovery',
      content: [
        'Rest days are when your body gets stronger.',
        'Sleep 7-9 hours per night for optimal recovery.',
        'Stay hydrated – aim for 2+ liters of water daily.',
        'Light activity on rest days (walking, gentle stretching) aids recovery.',
        'If very sore, take an extra rest day or do a lighter session.',
        'Never double up workouts to "make up" for missed days.',
        'Deload weeks (every 4th week) are essential – don\'t skip them.',
      ]
    },
    nutrition: {
      title: '🥗 Nutrition Basics',
      content: [
        'This app does not provide medical nutrition advice.',
        'Eat balanced meals with protein, carbs, healthy fats, and vegetables.',
        'Protein supports muscle recovery: eggs, beans, fish, chicken, tofu.',
        'Don\'t skip meals – fuel your body for training.',
        'Pre-workout: light snack 30-60 min before (banana, toast).',
        'Post-workout: protein + carbs within 1-2 hours.',
        'Stay consistent rather than perfect.',
        'Consult a registered dietitian for personalized advice.',
      ]
    },
    sleep: {
      title: '😴 Sleep Hygiene',
      content: [
        'Aim for 7-9 hours of quality sleep.',
        'Keep a consistent sleep schedule (same bed/wake time).',
        'Avoid screens 30-60 min before bed.',
        'Keep your room cool, dark, and quiet.',
        'Avoid caffeine after 2 PM.',
        'Poor sleep = poor recovery = higher injury risk.',
        'If you can\'t sleep, get up and do something calm until sleepy.',
      ]
    },
    posture: {
      title: '🧍 Posture Habits',
      content: [
        'Take breaks from sitting every 30-60 minutes.',
        'When sitting: feet flat, back supported, screen at eye level.',
        'Shoulder blade squeezes throughout the day help counter desk posture.',
        'Chin tucks help counter "tech neck" from phone use.',
        'Chest opening stretches counter rounded shoulders.',
        'Stand up and move for 1-2 minutes every hour.',
        'Good posture reduces pain and improves breathing.',
      ]
    },
  };

  if (section && sections[section]) {
    return (
      <div className="space-y-4">
        <button onClick={() => setSection('')} className="text-sm text-gray-500">← Back to Guide</button>
        <h2 className="text-xl font-bold">{sections[section].title}</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-2">
          {sections[section].content.map((item, i) => (
            <p key={i} className="text-sm flex gap-2"><span className="text-emerald-500">•</span><span>{item}</span></p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Fitness Guide</h2>
      <p className="text-sm text-gray-500">Essential information for safe and effective training.</p>
      <div className="space-y-2">
        {Object.entries(sections).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSection(key)}
            className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm text-left"
          >
            <p className="font-medium text-sm">{val.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
