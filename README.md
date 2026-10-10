# FitStart - 182 Day Home Fitness Program

A lightweight, offline-first Progressive Web App for a 6-month beginner fitness program. No equipment needed. 30 minutes daily.

## Features

- **182-day progressive program** from zero push-ups to full push-ups
- **Animated SVG stick figures** for every exercise
- **Guided workout player** with timers, rest periods, voice cues
- **Progress tracking** with streaks, charts, and achievements
- **Exercise library** with form cues, modifications, and video links
- **Offline-capable** - works without internet after first load
- **PWA installable** on Android and iOS
- **Dark/light mode** and customizable text size
- **Export/import backups** - never lose your data
- **Daily readiness check** for adaptive training
- **Safety-first design** with pain alerts and stop conditions

## Quick Start

### Option 1: GitHub Pages (Free Hosting)

1. Create a new GitHub repository
2. Upload all project files
3. Go to Settings → Pages → Deploy from branch (main)
4. Your app will be live at `https://yourusername.github.io/repo-name/`

### Option 2: Local Development

```bash
npm install
npm run dev
```

### Option 3: Direct File

Open `dist/index.html` in a browser (note: service worker requires localhost or HTTPS)

## Installation as PWA

1. Open the app in Chrome/Edge on Android
2. Tap the menu (⋮) → "Install app" or "Add to Home screen"
3. The app icon will appear on your home screen
4. After first load, all features work offline

**Note:** PWA installation requires HTTPS or localhost. Opening via `file://` will not support service worker installation.

## Offline Testing

1. Install the PWA on your device
2. Open the app once while online (to cache all assets)
3. Turn off internet/WiFi
4. Open the app again - all workouts, exercises, and tracking work offline
5. YouTube video links require internet

## Backup & Restore

- Go to Settings → Export Backup to download your data as JSON
- Use Import Backup to restore from a previous export
- Data is stored in localStorage - clearing browser data will erase progress

## Program Structure

### Phases
- **Phase 1 (Weeks 1-8):** Foundation - Wall → Incline push-ups, learning form
- **Phase 2 (Weeks 9-17):** Build - Knee → Negative push-ups, increasing volume
- **Phase 3 (Weeks 18-26):** Strength - Full → Decline push-ups, power work

### Weekly Schedule
- **Mon:** Push + Core
- **Tue:** Pull + Posture
- **Wed:** Legs + Hips
- **Thu:** Push + Core (Volume)
- **Fri:** Pull + Legs Circuit
- **Sat:** Flexibility & Mobility
- **Sun:** Active Recovery & Wellness

### Deload Weeks
Every 4th week (weeks 4, 8, 12, 16, 20, 24) has reduced volume for recovery.

### Progress Tests
Every 4 weeks on Sunday: max push-ups, plank hold, wall sit, chin tucks.

## Customization

### Modify the Program
Edit `src/data/program.ts` to change:
- Exercise selections per day
- Sets, reps, and hold times
- Phase durations
- Deload schedule

### Modify Exercises
Edit `src/data/exercises.ts` to change:
- Exercise cues and form tips
- SVG animation poses
- Difficulty progressions
- YouTube search queries

### Change Appearance
Edit `src/index.css` for custom colors and styles.

## Safety

- Consult a doctor before starting if you have injuries or health conditions
- Stop immediately if you feel sharp pain, dizziness, or chest pain
- All stretches are gentle and static - never bounce or force
- Face/jaw/neck exercises are optional wellness activities
- Never use unstable furniture without checking stability first
- This app does not provide medical advice

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS 4
- Vite (build tool)
- Service Worker (offline support)
- localStorage (data persistence)
- SVG animations (exercise demos)
- Web Speech API (voice cues)
- Wake Lock API (screen stays on)

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+
- Samsung Internet 15+

## License

Free for personal use. No warranty provided.
