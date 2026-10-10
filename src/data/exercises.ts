// Exercise Library - All exercises with SVG pose data, cues, and metadata
// Each exercise has: id, name, category, type, duration, cues, mistakes, easier, harder, muscles, poses, youtubeQuery

export interface Pose {
  head: [number, number];
  neck: [number, number];
  shoulderL: [number, number];
  shoulderR: [number, number];
  elbowL: [number, number];
  elbowR: [number, number];
  handL: [number, number];
  handR: [number, number];
  hipL: [number, number];
  hipR: [number, number];
  kneeL: [number, number];
  kneeR: [number, number];
  footL: [number, number];
  footR: [number, number];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  type: 'reps' | 'hold' | 'timed';
  defaultReps?: number;
  defaultHold?: number;
  cues: string[];
  mistakes: string;
  easier: string;
  harder: string;
  muscles: string;
  poses: Pose[];
  animationType: 'oscillate' | 'hold' | 'sequence';
  youtubeQuery: string;
  stopCondition: string;
}

// Helper to create poses
const p = (
  head: [number,number], neck: [number,number],
  sL: [number,number], sR: [number,number],
  eL: [number,number], eR: [number,number],
  hL: [number,number], hR: [number,number],
  hipL: [number,number], hipR: [number,number],
  kL: [number,number], kR: [number,number],
  fL: [number,number], fR: [number,number]
): Pose => ({
  head, neck, shoulderL: sL, shoulderR: sR,
  elbowL: eL, elbowR: eR, handL: hL, handR: hR,
  hipL, hipR, kneeL: kL, kneeR: kR, footL: fL, footR: fR
});

export const exercises: Exercise[] = [
  // === MORNING WAKE-UP & LYMPH FLOW ===
  {
    id: 'arm-waves',
    name: 'Arm Waves',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Keep shoulders relaxed', 'Move arms in gentle waves', 'Breathe steadily', 'Small controlled movements'],
    mistakes: 'Using too much force or shrugging shoulders',
    easier: 'Smaller movements',
    harder: 'Larger arm circles',
    muscles: 'Shoulders, upper back, chest',
    poses: [
      p([50,15],[50,22],[38,28],[62,28],[30,35],[70,35],[25,42],[75,42],[42,55],[58,55],[40,75],[60,75],[38,95],[62,95]),
      p([50,15],[50,22],[38,28],[62,28],[28,25],[72,25],[22,18],[78,18],[42,55],[58,55],[40,75],[60,75],[38,95],[62,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'arm waves warm up exercise',
    stopCondition: 'Stop if you feel shoulder pain'
  },
  {
    id: 'golf-arm-swings',
    name: 'Golf Arm Swings',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Hinge slightly at hips', 'Let arms swing naturally', 'Keep core engaged', 'Gentle rotation from torso'],
    mistakes: 'Swinging too fast or using momentum from legs',
    easier: 'Smaller swings',
    harder: 'Slightly faster tempo',
    muscles: 'Shoulders, torso, hips',
    poses: [
      p([50,18],[50,25],[38,32],[62,32],[32,42],[68,42],[28,50],[72,50],[42,58],[58,58],[42,78],[58,78],[40,95],[60,95]),
      p([50,18],[50,25],[38,32],[62,32],[42,42],[58,42],[48,50],[52,50],[42,58],[58,58],[42,78],[58,78],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'golf arm swings warm up',
    stopCondition: 'Stop if you feel dizziness'
  },
  {
    id: 'lymphatic-hops',
    name: 'Lymphatic Hops',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Soft landings on balls of feet', 'Keep hops very small', 'Relax shoulders', 'Bounce gently'],
    mistakes: 'Jumping too high or landing hard',
    easier: 'Just march in place',
    harder: 'Slightly higher hops',
    muscles: 'Calves, ankles, full body circulation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[35,38],[65,38],[32,45],[68,45],[43,58],[57,58],[42,76],[58,76],[40,93],[60,93]),
      p([50,13],[50,20],[40,28],[60,28],[35,36],[65,36],[32,43],[68,43],[43,56],[57,56],[43,74],[57,74],[42,90],[58,90]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'lymphatic hopping exercise',
    stopCondition: 'Stop if you feel joint pain in ankles or knees'
  },
  {
    id: 'knee-raises',
    name: 'Knee Raises / Thigh Taps',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Lift knee to hip height', 'Tap thigh gently with hands', 'Alternate legs', 'Keep torso upright'],
    mistakes: 'Leaning back excessively or pulling knee too forcefully',
    easier: 'Lower knee height',
    harder: 'Higher knee lifts',
    muscles: 'Hip flexors, core, legs',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,40],[62,40],[42,48],[58,48],[43,60],[57,60],[42,78],[55,65],[40,95],[58,80]),
      p([50,15],[50,22],[40,30],[60,30],[38,40],[62,40],[42,48],[58,48],[43,60],[57,60],[55,65],[58,78],[58,80],[40,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'knee raises warm up exercise',
    stopCondition: 'Stop if you feel hip or knee pain'
  },
  {
    id: 'lymph-tapping',
    name: 'Gentle Lymph Node Tapping',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Use very light fingertip taps', 'Under jaw, behind ears, collarbone', 'Gentle rhythm', 'Breathe normally'],
    mistakes: 'Pressing too hard or using nails',
    easier: 'Even lighter pressure',
    harder: 'Not applicable - keep it gentle',
    muscles: 'Neck area, promotes relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,22],[56,22],[48,18],[52,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[44,22],[56,22],[48,18],[52,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'hold',
    youtubeQuery: 'lymphatic drainage face tapping',
    stopCondition: 'Stop if you feel any discomfort'
  },
  {
    id: 'spine-waves',
    name: 'Spine Waves',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Move from tailbone up through spine', 'Gentle undulation', 'Keep feet grounded', 'Let head follow naturally'],
    mistakes: 'Moving too fast or forcing the movement',
    easier: 'Smaller waves',
    harder: 'Larger range of motion',
    muscles: 'Full spine, core, back',
    poses: [
      p([50,18],[50,25],[42,32],[58,32],[38,40],[62,40],[35,48],[65,48],[43,58],[57,58],[42,78],[58,78],[40,95],[60,95]),
      p([48,16],[48,23],[40,30],[56,30],[36,38],[60,38],[33,46],[63,46],[43,58],[57,58],[42,78],[58,78],[40,95],[60,95]),
      p([52,16],[52,23],[44,30],[60,30],[40,38],[64,38],[37,46],[67,46],[43,58],[57,58],[42,78],[58,78],[40,95],[60,95]),
    ],
    animationType: 'sequence',
    youtubeQuery: 'spine wave mobility exercise',
    stopCondition: 'Stop if you feel any spinal pain'
  },
  {
    id: 'zen-swing',
    name: 'Zen Swing',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Arms swing gently side to side', 'Weight shifts between feet', 'Relaxed breathing', 'Soft knees'],
    mistakes: 'Stiffening the body or holding breath',
    easier: 'Slower, smaller movements',
    harder: 'Deeper weight shifts',
    muscles: 'Full body, balance, relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,40],[66,40],[30,48],[70,48],[42,58],[58,58],[40,78],[60,78],[38,95],[62,95]),
      p([50,15],[50,22],[40,30],[60,30],[40,40],[60,40],[44,48],[56,48],[43,58],[57,58],[42,78],[58,78],[42,95],[58,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'zen swing qigong exercise',
    stopCondition: 'Stop if you feel dizzy'
  },
  {
    id: 'single-leg-side-swings',
    name: 'Single-Leg Side Swings',
    category: 'warmup',
    type: 'timed',
    defaultHold: 30,
    cues: ['Hold wall for balance', 'Swing one leg gently side to side', 'Keep standing leg soft', 'Controlled movement'],
    mistakes: 'Swinging too fast or losing balance',
    easier: 'Smaller swings, hold support',
    harder: 'Larger range without support',
    muscles: 'Hip flexors, hip abductors, balance',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[35,38],[65,38],[30,45],[70,45],[45,58],[55,58],[45,78],[55,78],[45,95],[55,95]),
      p([50,15],[50,22],[40,30],[60,30],[35,38],[65,38],[30,45],[70,45],[45,58],[55,58],[45,78],[48,68],[45,95],[42,80]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'leg swings hip mobility',
    stopCondition: 'Stop if you feel hip pain or lose balance'
  },

  // === FACE, JAW, NECK & SCALP ===
  {
    id: 'jaw-stretch',
    name: 'Gentle Jaw Stretch',
    category: 'face',
    type: 'hold',
    defaultHold: 10,
    cues: ['Open mouth slowly to comfortable limit', 'Hold gently, no forcing', 'Relax tongue', 'Breathe through nose'],
    mistakes: 'Forcing jaw open or clenching',
    easier: 'Open mouth less',
    harder: 'Not applicable - never force jaw',
    muscles: 'Jaw muscles (masseter, temporalis)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[42,44],[58,44],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,17],[50,24],[40,32],[60,32],[38,40],[62,40],[42,46],[58,46],[43,57],[57,57],[42,77],[58,77],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'gentle jaw stretch relaxation',
    stopCondition: 'Stop immediately if jaw clicks or hurts'
  },
  {
    id: 'mouth-stretch',
    name: 'Mouth Stretch (Gentle Open)',
    category: 'face',
    type: 'hold',
    defaultHold: 10,
    cues: ['Slowly open mouth wide', 'Hold at comfortable stretch', 'Keep jaw relaxed', 'Close slowly'],
    mistakes: 'Opening too fast or too wide',
    easier: 'Partial opening only',
    harder: 'Not applicable',
    muscles: 'Jaw, face muscles',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[42,44],[58,44],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,16],[50,23],[40,31],[60,31],[38,39],[62,39],[42,45],[58,45],[43,56],[57,56],[42,76],[58,76],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'mouth stretch face relaxation',
    stopCondition: 'Stop if you feel jaw pain or clicking'
  },
  {
    id: 'masseter-release',
    name: 'Masseter Release',
    category: 'face',
    type: 'timed',
    defaultHold: 30,
    cues: ['Relaxed fingertips on jaw muscles', 'Very gentle circular motion', 'No clenching teeth', 'Breathe slowly'],
    mistakes: 'Pressing too hard or clenching',
    easier: 'Lighter touch',
    harder: 'Not applicable - always gentle',
    muscles: 'Masseter muscle, jaw relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,20],[56,20],[46,17],[54,17],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[44,20],[56,20],[46,17],[54,17],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'hold',
    youtubeQuery: 'masseter muscle release massage',
    stopCondition: 'Stop if you feel pain in jaw joint'
  },
  {
    id: 'cheek-stretch',
    name: 'Gentle Cheek Stretch',
    category: 'face',
    type: 'hold',
    defaultHold: 10,
    cues: ['Smile gently then relax', 'Puff cheeks slightly', 'Release slowly', 'Repeat with soft movements'],
    mistakes: 'Stretching too forcefully',
    easier: 'Smaller movements',
    harder: 'Not applicable',
    muscles: 'Cheek muscles, face',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[42,44],[58,44],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[40,44],[60,44],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'cheek stretch face exercises',
    stopCondition: 'Stop if you feel any discomfort'
  },
  {
    id: 'eye-relaxation',
    name: 'Eye Relaxation (Palming + Circles)',
    category: 'face',
    type: 'timed',
    defaultHold: 30,
    cues: ['Rub palms together to warm', 'Cup over closed eyes gently', 'Slow eye circles behind lids', 'Breathe deeply'],
    mistakes: 'Pressing on eyeballs',
    easier: 'Just palming without circles',
    harder: 'Not applicable',
    muscles: 'Eye muscles, relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,18],[56,18],[48,15],[52,15],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[44,18],[56,18],[48,15],[52,15],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'hold',
    youtubeQuery: 'eye relaxation palming exercise',
    stopCondition: 'Stop if you feel eye pressure or discomfort'
  },
  {
    id: 'forehead-smoothing',
    name: 'Forehead Smoothing',
    category: 'face',
    type: 'timed',
    defaultHold: 20,
    cues: ['Light fingertips on forehead', 'Smooth outward from center', 'Very gentle pressure', 'Relax face as you go'],
    mistakes: 'Pressing too hard or pulling skin',
    easier: 'Even lighter touch',
    harder: 'Not applicable',
    muscles: 'Forehead muscles, relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,16],[56,16],[46,14],[54,14],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[42,16],[58,16],[40,14],[60,14],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'forehead massage relaxation',
    stopCondition: 'Stop if you feel headache or discomfort'
  },
  {
    id: 'neck-flexor-stretch',
    name: 'Neck Flexor Stretch',
    category: 'neck',
    type: 'hold',
    defaultHold: 15,
    cues: ['Gently tilt head back', 'Hold at mild stretch, never pain', 'Breathe slowly', 'Release slowly'],
    mistakes: 'Forcing the stretch or jerking',
    easier: 'Smaller tilt',
    harder: 'Not applicable - never force neck',
    muscles: 'Front neck muscles (neck flexors)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[35,45],[65,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,12],[50,20],[40,28],[60,28],[38,36],[62,36],[35,43],[65,43],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'neck flexor stretch gentle',
    stopCondition: 'Stop immediately if you feel pain, numbness, or tingling'
  },
  {
    id: 'neck-extensor-stretch',
    name: 'Neck Extensor Stretch',
    category: 'neck',
    type: 'hold',
    defaultHold: 15,
    cues: ['Gently drop chin toward chest', 'Use hand weight only, no pulling', 'Hold at mild tension', 'Breathe normally'],
    mistakes: 'Pulling head forward forcefully',
    easier: 'Lighter hand contact',
    harder: 'Not applicable',
    muscles: 'Back of neck (neck extensors)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[42,25],[58,25],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,18],[50,24],[40,32],[60,32],[38,40],[62,40],[42,27],[58,27],[43,57],[57,57],[42,77],[58,77],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'neck extensor stretch chin to chest',
    stopCondition: 'Stop if you feel pain, dizziness, or tingling'
  },
  {
    id: 'neck-side-stretch',
    name: 'Neck Side Stretch',
    category: 'neck',
    type: 'hold',
    defaultHold: 15,
    cues: ['Tilt ear toward shoulder gently', 'Keep opposite shoulder down', 'No forcing', 'Breathe into the stretch'],
    mistakes: 'Lifting shoulder or forcing head',
    easier: 'Smaller tilt',
    harder: 'Not applicable',
    muscles: 'Side neck muscles (scalenes, upper trapezius)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[35,45],[65,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([45,14],[47,21],[37,29],[57,29],[35,37],[59,37],[32,44],[62,44],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'neck side stretch gentle',
    stopCondition: 'Stop if you feel pain or numbness in arms'
  },
  {
    id: 'chin-tucks',
    name: 'Chin Tucks / Neck Retraction',
    category: 'neck',
    type: 'reps',
    defaultReps: 10,
    cues: ['Pull chin straight back (double chin)', 'Hold 3 seconds', 'Keep eyes level', 'Release slowly'],
    mistakes: 'Tilting head up or down instead of sliding back',
    easier: 'Fewer reps, shorter holds',
    harder: 'Longer holds (5 seconds)',
    muscles: 'Deep neck flexors, postural muscles',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[38,38],[62,38],[35,45],[65,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([47,15],[48,22],[38,30],[58,30],[36,38],[60,38],[33,45],[63,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'chin tucks neck exercise',
    stopCondition: 'Stop if you feel dizziness or neck pain'
  },
  {
    id: 'neck-presses',
    name: 'Neck Presses (Hand Isometrics)',
    category: 'neck',
    type: 'hold',
    defaultHold: 5,
    cues: ['Press hand against head lightly', 'Resist with neck, 20-30% effort', 'Hold 5 seconds', 'Never strain'],
    mistakes: 'Pushing too hard or straining',
    easier: 'Even lighter resistance',
    harder: 'Not recommended for beginners',
    muscles: 'All neck muscle groups (isometric)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,18],[56,18],[48,15],[52,15],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([49,15],[49,22],[39,30],[59,30],[43,18],[55,18],[47,15],[51,15],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'neck isometric exercises hand resistance',
    stopCondition: 'Stop immediately if you feel pain, dizziness, or headache'
  },
  {
    id: 'neck-acupressure',
    name: 'Neck Acupressure (Light)',
    category: 'neck',
    type: 'timed',
    defaultHold: 20,
    cues: ['Light fingertip pressure at base of skull', 'Small circles', 'Gentle only', 'Breathe slowly'],
    mistakes: 'Pressing too hard',
    easier: 'Lighter pressure',
    harder: 'Not applicable',
    muscles: 'Suboccipital muscles, relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,20],[56,20],[47,18],[53,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[44,20],[56,20],[47,18],[53,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'hold',
    youtubeQuery: 'neck acupressure points self massage',
    stopCondition: 'Stop if you feel pain or dizziness'
  },
  {
    id: 'scalp-massage',
    name: 'Scalp Massage',
    category: 'face',
    type: 'timed',
    defaultHold: 60,
    cues: ['Fingertips on scalp, light pressure', 'Slow circular motions', 'Gentle lifting motion', 'No nails, no pinching'],
    mistakes: 'Pulling hair or using nails',
    easier: 'Lighter touch',
    harder: 'Not applicable',
    muscles: 'Scalp muscles, relaxation',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[42,14],[58,14],[45,10],[55,10],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[44,14],[56,14],[47,10],[53,10],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'scalp massage technique self',
    stopCondition: 'Stop if you feel scalp tenderness'
  },

  // === PUSH EXERCISES ===
  {
    id: 'wall-pushups',
    name: 'Wall Push-Ups',
    category: 'push',
    type: 'reps',
    defaultReps: 12,
    cues: ['Stand arm-length from wall', 'Hands shoulder-width apart', 'Bend elbows to bring chest toward wall', 'Push back to start'],
    mistakes: 'Sagging hips or flaring elbows too wide',
    easier: 'Stand closer to wall (less angle)',
    harder: 'Stand further from wall',
    muscles: 'Chest, shoulders, triceps, core',
    poses: [
      p([55,20],[53,27],[45,32],[61,32],[40,38],[66,38],[38,42],[68,42],[45,55],[55,55],[44,75],[56,75],[42,95],[58,95]),
      p([65,25],[60,30],[52,35],[68,35],[50,40],[72,40],[48,42],[74,42],[48,55],[58,55],[46,75],[58,75],[44,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'wall push ups beginner',
    stopCondition: 'Stop if you feel shoulder or wrist pain'
  },
  {
    id: 'incline-pushups',
    name: 'Incline Push-Ups (Counter/Table)',
    category: 'push',
    type: 'reps',
    defaultReps: 10,
    cues: ['Hands on stable elevated surface', 'Body in straight line', 'Lower chest to surface', 'Push up with control'],
    mistakes: 'Using unstable surface or sagging hips',
    easier: 'Higher surface (wall-height counter)',
    harder: 'Lower surface (lower table)',
    muscles: 'Chest, shoulders, triceps, core',
    poses: [
      p([55,25],[53,32],[45,38],[61,38],[40,45],[66,45],[38,50],[68,50],[45,60],[55,60],[44,78],[56,78],[42,95],[58,95]),
      p([62,35],[58,40],[50,45],[66,45],[48,52],[72,52],[46,55],[74,55],[48,62],[58,62],[46,80],[58,80],[44,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'incline push ups counter',
    stopCondition: 'Ensure surface is STABLE. Stop if surface wobbles or you feel pain'
  },
  {
    id: 'knee-pushups',
    name: 'Knee Push-Ups',
    category: 'push',
    type: 'reps',
    defaultReps: 8,
    cues: ['Knees on floor, hands shoulder-width', 'Straight line from knees to head', 'Lower chest to floor', 'Push up fully'],
    mistakes: 'Hips sagging or piking up',
    easier: 'Return to incline push-ups',
    harder: 'Slow the lowering phase (3 seconds)',
    muscles: 'Chest, shoulders, triceps, core',
    poses: [
      p([50,30],[50,36],[42,42],[58,42],[36,50],[64,50],[32,55],[68,55],[44,60],[56,60],[48,72],[56,72],[52,80],[58,80]),
      p([60,40],[57,44],[50,48],[64,48],[48,54],[70,54],[46,58],[72,58],[48,62],[58,62],[50,72],[58,72],[54,78],[58,78]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'knee push ups proper form',
    stopCondition: 'Stop if you feel shoulder, wrist, or lower back pain'
  },
  {
    id: 'negative-pushups',
    name: 'Negative Push-Ups (Lowering Only)',
    category: 'push',
    type: 'reps',
    defaultReps: 5,
    cues: ['Start in full push-up position', 'Lower yourself as slowly as possible (3-5 sec)', 'Use knees to get back up', 'Focus on control'],
    mistakes: 'Dropping too fast or sagging hips',
    easier: 'Faster lowering, knee push-up position',
    harder: 'Slower lowering (5+ seconds)',
    muscles: 'Chest, shoulders, triceps (eccentric)',
    poses: [
      p([50,30],[50,36],[42,42],[58,42],[36,50],[64,50],[32,55],[68,55],[44,60],[56,60],[46,78],[56,78],[44,95],[58,95]),
      p([55,45],[53,48],[46,52],[60,52],[42,58],[66,58],[40,62],[68,62],[46,64],[56,64],[46,80],[56,80],[44,95],[58,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'negative push ups eccentric',
    stopCondition: 'Stop if form breaks down or you feel pain'
  },
  {
    id: 'full-pushups',
    name: 'Full Push-Ups',
    category: 'push',
    type: 'reps',
    defaultReps: 8,
    cues: ['Hands shoulder-width, fingers forward', 'Body straight from head to heels', 'Lower until chest nearly touches floor', 'Push up explosively'],
    mistakes: 'Flaring elbows 90°, sagging hips, partial range',
    easier: 'Return to knee push-ups or negatives',
    harder: 'Pause at bottom for 2 seconds',
    muscles: 'Chest, shoulders, triceps, core, legs',
    poses: [
      p([50,30],[50,36],[42,42],[58,42],[36,50],[64,50],[32,55],[68,55],[44,60],[56,60],[46,78],[56,78],[44,95],[58,95]),
      p([58,48],[55,52],[48,55],[62,55],[44,60],[68,60],[42,64],[70,64],[48,65],[58,65],[48,80],[58,80],[46,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'proper push up form',
    stopCondition: 'Stop if form breaks down, or you feel shoulder/wrist/back pain'
  },
  {
    id: 'decline-pushups',
    name: 'Decline Push-Ups (Feet Elevated)',
    category: 'push',
    type: 'reps',
    defaultReps: 6,
    cues: ['Feet on low stable surface (couch)', 'Hands on floor shoulder-width', 'Lower chest to floor', 'More upper chest emphasis'],
    mistakes: 'Feet too high, arching back',
    easier: 'Return to full push-ups',
    harder: 'Higher foot placement',
    muscles: 'Upper chest, shoulders, triceps',
    poses: [
      p([45,35],[46,40],[40,45],[52,45],[36,52],[56,52],[34,56],[58,56],[44,58],[54,58],[50,68],[56,68],[56,60],[60,58]),
      p([52,48],[50,52],[44,55],[56,55],[40,60],[60,60],[38,64],[62,64],[46,65],[56,65],[52,72],[58,72],[58,64],[62,62]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'decline push ups feet elevated',
    stopCondition: 'Ensure foot surface is stable. Stop if you feel shoulder pain'
  },
  {
    id: 'pike-pushups',
    name: 'Pike Push-Ups (Hips High)',
    category: 'push',
    type: 'reps',
    defaultReps: 6,
    cues: ['Hips high, body forms inverted V', 'Head moves forward and down', 'Press through hands', 'Shoulder-dominant movement'],
    mistakes: 'Bending knees too much, collapsing shoulders',
    easier: 'Start with hips-high wall press (isometric)',
    harder: 'Feet elevated pike push-ups',
    muscles: 'Shoulders, upper chest, triceps',
    poses: [
      p([40,25],[43,30],[38,36],[48,36],[34,42],[52,42],[32,46],[54,46],[50,55],[58,55],[52,72],[58,72],[54,90],[60,90]),
      p([48,35],[48,40],[44,44],[52,44],[40,50],[56,50],[38,54],[58,54],[50,58],[58,58],[52,75],[58,75],[54,92],[60,92]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'pike push up progression',
    stopCondition: 'Stop if you feel shoulder impingement or pain'
  },
  {
    id: 'doorframe-press',
    name: 'Doorframe/Wall Resistance Press',
    category: 'push',
    type: 'hold',
    defaultHold: 15,
    cues: ['Stand in doorframe, hands on frame', 'Press inward (isometric squeeze)', 'Hold at 60-70% effort', 'Breathe normally'],
    mistakes: 'Holding breath or pressing at 100%',
    easier: 'Less pressure',
    harder: 'More pressure (still not max)',
    muscles: 'Chest (isometric), shoulders',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,35],[66,35],[30,38],[70,38],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[36,35],[64,35],[32,38],[68,38],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'doorframe chest press isometric',
    stopCondition: 'Stop if you feel chest pain or dizziness'
  },
  {
    id: 'plank-shoulder-tap',
    name: 'Plank to Shoulder Tap',
    category: 'push',
    type: 'reps',
    defaultReps: 10,
    cues: ['High plank position', 'Tap shoulder with opposite hand', 'Minimize hip rotation', 'Keep core tight'],
    mistakes: 'Hips rocking side to side excessively',
    easier: 'Wider foot stance',
    harder: 'Narrow foot stance',
    muscles: 'Core, shoulders, chest stability',
    poses: [
      p([50,30],[50,36],[42,42],[58,42],[36,50],[64,50],[32,55],[68,55],[44,60],[56,60],[46,78],[56,78],[44,95],[58,95]),
      p([50,30],[50,36],[42,42],[58,42],[46,36],[64,50],[50,32],[68,55],[44,60],[56,60],[46,78],[56,78],[44,95],[58,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'plank shoulder tap exercise',
    stopCondition: 'Stop if you feel lower back pain or shoulders give out'
  },

  // === PULL / BACK EXERCISES ===
  {
    id: 'superman-hold',
    name: 'Superman Hold',
    category: 'pull',
    type: 'hold',
    defaultHold: 15,
    cues: ['Lie face down, arms extended', 'Lift arms and legs off floor', 'Squeeze glutes and back', 'Hold with control'],
    mistakes: 'Looking up (neck strain) or lifting too high',
    easier: 'Lift arms only or legs only',
    harder: 'Alternate arm/leg raises',
    muscles: 'Lower back, glutes, upper back',
    poses: [
      p([30,50],[35,50],[40,48],[40,52],[45,46],[45,54],[50,44],[50,56],[55,52],[55,52],[65,54],[65,50],[75,56],[75,48]),
      p([28,44],[33,46],[38,44],[38,48],[43,42],[43,50],[48,40],[48,52],[55,50],[55,50],[65,52],[65,48],[75,54],[75,46]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'superman hold back exercise',
    stopCondition: 'Stop if you feel lower back pain'
  },
  {
    id: 'reverse-fly',
    name: 'Prone Reverse Flys (Y-T-W)',
    category: 'pull',
    type: 'reps',
    defaultReps: 8,
    cues: ['Lie face down, forehead on floor', 'Arms in Y, T, or W position', 'Lift arms by squeezing shoulder blades', 'Lower with control'],
    mistakes: 'Using momentum or shrugging shoulders',
    easier: 'Arms closer to body (W position)',
    harder: 'Hold at top for 3 seconds',
    muscles: 'Rear deltoids, rhomboids, mid-traps',
    poses: [
      p([35,48],[38,50],[42,48],[42,52],[36,42],[48,42],[32,38],[52,38],[55,52],[55,52],[65,54],[65,54],[72,56],[72,56]),
      p([35,48],[38,50],[42,48],[42,52],[38,44],[46,44],[36,40],[50,40],[55,52],[55,52],[65,54],[65,54],[72,56],[72,56]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'prone reverse fly YTW exercise',
    stopCondition: 'Stop if you feel shoulder or neck pain'
  },
  {
    id: 'face-pull-isometric',
    name: 'Doorframe Face-Pull Isometric',
    category: 'pull',
    type: 'hold',
    defaultHold: 15,
    cues: ['Stand facing doorframe', 'Grip frame at face height', 'Pull outward and back (isometric)', 'Squeeze shoulder blades'],
    mistakes: 'Pulling too hard or holding breath',
    easier: 'Less force',
    harder: 'More force (70% max)',
    muscles: 'Rear delts, rhomboids, external rotators',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,25],[66,25],[30,22],[70,22],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[36,26],[64,26],[33,24],[67,24],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'face pull isometric doorframe',
    stopCondition: 'Stop if you feel shoulder pain'
  },
  {
    id: 'shoulder-blade-squeeze',
    name: 'Shoulder Blade Squeezes',
    category: 'pull',
    type: 'reps',
    defaultReps: 12,
    cues: ['Sit or stand tall', 'Pull shoulder blades together', 'Hold 3 seconds', 'Release slowly'],
    mistakes: 'Shrugging shoulders up',
    easier: 'Shorter holds',
    harder: 'Add arm movement (arms out to T)',
    muscles: 'Rhomboids, mid/lower traps',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,38],[66,38],[30,45],[70,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[42,30],[58,30],[38,38],[62,38],[36,45],[64,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'shoulder blade squeeze exercise',
    stopCondition: 'Stop if you feel neck or shoulder pain'
  },
  {
    id: 'reverse-snow-angels',
    name: 'Reverse Snow Angels',
    category: 'pull',
    type: 'reps',
    defaultReps: 8,
    cues: ['Lie face down, arms by sides', 'Lift arms and sweep overhead', 'Keep arms close to floor', 'Return to start'],
    mistakes: 'Lifting too high or rushing',
    easier: 'Smaller range of motion',
    harder: 'Hover arms just above floor throughout',
    muscles: 'Upper back, rear delts, lower traps',
    poses: [
      p([35,50],[38,50],[42,48],[42,52],[48,50],[48,50],[55,52],[55,52],[55,52],[55,52],[65,54],[65,54],[72,56],[72,56]),
      p([35,50],[38,50],[42,48],[42,52],[36,44],[48,44],[30,40],[52,40],[55,52],[55,52],[65,54],[65,54],[72,56],[72,56]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'reverse snow angels prone exercise',
    stopCondition: 'Stop if you feel lower back or shoulder pain'
  },
  {
    id: 'inverted-rows',
    name: 'Inverted Rows (Under Sturdy Table)',
    category: 'pull',
    type: 'reps',
    defaultReps: 6,
    cues: ['Lie under VERY sturdy table', 'Grip edge, hands shoulder-width', 'Pull chest to table edge', 'Lower with control'],
    mistakes: 'Using unstable furniture - CHECK STABILITY FIRST',
    easier: 'Bend knees more (shorter lever)',
    harder: 'Legs straight, pause at top',
    muscles: 'Lats, biceps, rhomboids, rear delts',
    poses: [
      p([35,55],[38,55],[42,53],[42,57],[38,48],[48,48],[35,45],[50,45],[55,57],[55,57],[65,60],[65,60],[72,62],[72,62]),
      p([40,48],[42,50],[45,48],[45,52],[42,44],[48,44],[40,42],[50,42],[55,55],[55,55],[65,58],[65,58],[72,60],[72,60]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'inverted rows table bodyweight',
    stopCondition: '⚠️ SAFETY: Test table stability FIRST. Stop if table shifts or you feel pain'
  },

  // === LEGS ===
  {
    id: 'bodyweight-squats',
    name: 'Bodyweight Squats',
    category: 'legs',
    type: 'reps',
    defaultReps: 12,
    cues: ['Feet shoulder-width apart', 'Sit back and down', 'Knees track over toes', 'Stand up through heels'],
    mistakes: 'Knees caving in, heels lifting, leaning too far forward',
    easier: 'Sit to chair and stand (box squat)',
    harder: 'Pause at bottom for 2 seconds',
    muscles: 'Quadriceps, glutes, hamstrings, core',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,30],[50,35],[42,40],[58,40],[38,45],[62,45],[36,48],[64,48],[44,55],[56,55],[38,68],[62,68],[36,85],[64,85]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'bodyweight squat proper form',
    stopCondition: 'Stop if you feel knee pain or sharp lower back pain'
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'legs',
    type: 'reps',
    defaultReps: 10,
    cues: ['Step forward, lower back knee toward floor', 'Front knee over ankle', 'Keep torso upright', 'Push through front heel'],
    mistakes: 'Front knee going past toes excessively, leaning forward',
    easier: 'Shorter step, hold wall for balance',
    harder: 'Walking lunges or pause at bottom',
    muscles: 'Quadriceps, glutes, hamstrings, balance',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[38,70],[58,72],[36,88],[60,90]),
      p([50,25],[50,30],[42,36],[58,36],[38,42],[62,42],[36,48],[64,48],[44,58],[56,58],[40,72],[56,72],[40,88],[56,88]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'bodyweight lunge proper form',
    stopCondition: 'Stop if you feel knee pain'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    type: 'reps',
    defaultReps: 8,
    cues: ['Back foot on chair/couch', 'Lower back knee toward floor', 'Keep weight on front heel', 'Hold wall for balance if needed'],
    mistakes: 'Leaning too far forward, knee caving in',
    easier: 'Regular lunge instead',
    harder: 'Hold at bottom, add pause',
    muscles: 'Quadriceps, glutes, balance',
    poses: [
      p([50,18],[50,25],[42,32],[58,32],[38,38],[62,38],[36,44],[64,44],[44,55],[56,55],[40,70],[56,68],[38,88],[58,78]),
      p([50,30],[50,35],[42,40],[58,40],[38,45],[62,45],[36,50],[64,50],[44,58],[56,58],[40,72],[56,72],[40,90],[58,82]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'bulgarian split squat bodyweight',
    stopCondition: 'Stop if you feel knee or hip pain'
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'legs',
    type: 'reps',
    defaultReps: 15,
    cues: ['Stand tall, feet hip-width', 'Rise up on toes', 'Hold at top 1 second', 'Lower slowly'],
    mistakes: 'Rolling ankles or bouncing',
    easier: 'Hold wall for balance',
    harder: 'Single-leg calf raises',
    muscles: 'Calves (gastrocnemius, soleus)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,12],[50,19],[40,27],[60,27],[36,35],[64,35],[34,42],[66,42],[43,52],[57,52],[42,72],[58,72],[42,82],[58,82]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'calf raises bodyweight',
    stopCondition: 'Stop if you feel ankle pain'
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    category: 'legs',
    type: 'hold',
    defaultHold: 20,
    cues: ['Back flat against wall', 'Slide down until thighs parallel to floor', 'Knees at 90°', 'Breathe steadily'],
    mistakes: 'Knees going past toes, sliding too low',
    easier: 'Higher position (less bend)',
    harder: 'Single-leg wall sit',
    muscles: 'Quadriceps, glutes',
    poses: [
      p([50,20],[50,27],[42,34],[58,34],[38,40],[62,40],[36,46],[64,46],[44,55],[56,55],[40,68],[60,68],[38,82],[62,82]),
      p([50,20],[50,27],[42,34],[58,34],[38,40],[62,40],[36,46],[64,46],[44,55],[56,55],[40,68],[60,68],[38,82],[62,82]),
    ],
    animationType: 'hold',
    youtubeQuery: 'wall sit exercise proper form',
    stopCondition: 'Stop if knees hurt or legs shake uncontrollably'
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    category: 'legs',
    type: 'reps',
    defaultReps: 12,
    cues: ['Lie on back, knees bent, feet flat', 'Squeeze glutes and lift hips', 'Straight line from knees to shoulders', 'Lower with control'],
    mistakes: 'Overextending lower back, pushing through toes',
    easier: 'Smaller range of motion',
    harder: 'Single-leg glute bridge',
    muscles: 'Glutes, hamstrings, core',
    poses: [
      p([30,55],[35,55],[40,53],[40,57],[44,55],[44,55],[48,53],[48,57],[55,55],[55,55],[62,48],[62,48],[68,42],[68,42]),
      p([30,48],[35,50],[40,48],[40,52],[44,48],[44,52],[48,46],[48,50],[55,50],[55,50],[62,46],[62,46],[68,42],[68,42]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'glute bridge exercise form',
    stopCondition: 'Stop if you feel lower back pain'
  },
  {
    id: 'single-leg-glute-bridge',
    name: 'Single-Leg Glute Bridge',
    category: 'legs',
    type: 'reps',
    defaultReps: 8,
    cues: ['One leg extended straight', 'Drive through heel of grounded foot', 'Keep hips level', 'Squeeze glute at top'],
    mistakes: 'Hips rotating, arching lower back',
    easier: 'Regular glute bridge',
    harder: 'Pause and hold at top 3 seconds',
    muscles: 'Glutes, hamstrings (unilateral)',
    poses: [
      p([30,55],[35,55],[40,53],[40,57],[44,55],[44,55],[48,53],[48,57],[55,55],[55,55],[62,48],[62,48],[70,44],[70,44]),
      p([30,48],[35,50],[40,48],[40,52],[44,48],[44,52],[48,46],[48,50],[55,50],[55,50],[62,46],[68,55],[70,44],[74,50]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'single leg glute bridge',
    stopCondition: 'Stop if you feel lower back or hip pain'
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats (Advanced - Late Phase)',
    category: 'legs',
    type: 'reps',
    defaultReps: 6,
    cues: ['Squat down first', 'Explode up softly', 'Land quietly (soft knees)', 'Only in Phase 3 when ready'],
    mistakes: 'Landing stiff-legged, knees caving in',
    easier: 'Regular squats or speed squats (no jump)',
    harder: 'Tuck jumps (very advanced)',
    muscles: 'Quads, glutes, calves, power',
    poses: [
      p([50,30],[50,35],[42,40],[58,40],[38,45],[62,45],[36,48],[64,48],[44,55],[56,55],[38,68],[62,68],[36,85],[64,85]),
      p([50,10],[50,17],[40,25],[60,25],[36,33],[64,33],[34,40],[66,40],[43,50],[57,50],[42,70],[58,70],[40,88],[60,88]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'jump squat proper landing',
    stopCondition: '⚠️ ADVANCED ONLY. Stop if joints hurt or form breaks. Soft landings essential.'
  },

  // === CORE ===
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    type: 'hold',
    defaultHold: 20,
    cues: ['Forearms on floor, elbows under shoulders', 'Body straight from head to heels', 'Squeeze glutes and core', 'Breathe steadily'],
    mistakes: 'Hips sagging or piking, holding breath',
    easier: 'Knee plank or incline plank',
    harder: 'Plank with leg lift',
    muscles: 'Core (transverse abdominis), shoulders, glutes',
    poses: [
      p([35,45],[38,48],[42,50],[42,50],[46,52],[46,52],[50,54],[50,54],[58,55],[58,55],[66,56],[66,56],[74,57],[74,57]),
      p([35,45],[38,48],[42,50],[42,50],[46,52],[46,52],[50,54],[50,54],[58,55],[58,55],[66,56],[66,56],[74,57],[74,57]),
    ],
    animationType: 'hold',
    youtubeQuery: 'proper plank form',
    stopCondition: 'Stop if lower back sags or you feel back pain'
  },
  {
    id: 'floor-leg-raises',
    name: 'Floor Leg Raises (Bent-Knee)',
    category: 'core',
    type: 'reps',
    defaultReps: 10,
    cues: ['Lie on back, hands under hips', 'Bend knees, lift toward chest', 'Lower slowly with control', 'Keep lower back pressed to floor'],
    mistakes: 'Arching lower back, using momentum',
    easier: 'One leg at a time',
    harder: 'Straight leg raises',
    muscles: 'Lower abs, hip flexors',
    poses: [
      p([30,55],[33,55],[36,54],[36,56],[40,54],[40,56],[44,53],[44,57],[52,55],[52,55],[62,48],[62,48],[70,42],[70,42]),
      p([30,55],[33,55],[36,54],[36,56],[40,54],[40,56],[44,53],[44,57],[52,55],[52,55],[60,52],[60,52],[68,55],[68,55]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'lying leg raises bent knee',
    stopCondition: 'Stop if lower back arches off floor or you feel back pain'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    type: 'reps',
    defaultReps: 12,
    cues: ['Sit with knees bent, lean back slightly', 'Rotate torso side to side', 'Hands together or touch floor each side', 'Keep chest up'],
    mistakes: 'Rounding back, rotating from shoulders only',
    easier: 'Feet on floor, less lean',
    harder: 'Feet elevated',
    muscles: 'Obliques, core',
    poses: [
      p([48,30],[48,36],[42,42],[54,42],[38,46],[58,46],[34,50],[62,50],[50,55],[56,55],[58,65],[62,65],[64,78],[68,78]),
      p([52,30],[52,36],[46,42],[58,42],[42,46],[62,46],[38,50],[66,50],[50,55],[56,55],[58,65],[62,65],[64,78],[68,78]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'russian twists core exercise',
    stopCondition: 'Stop if you feel lower back pain'
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'core',
    type: 'reps',
    defaultReps: 12,
    cues: ['Lie on back, knees bent', 'Curl upper body toward knees', 'Squeeze abs at top', 'Lower with control'],
    mistakes: 'Pulling on neck, using momentum',
    easier: 'Smaller range of motion',
    harder: 'Hands behind head (don\'t pull)',
    muscles: 'Upper abs (rectus abdominis)',
    poses: [
      p([35,50],[38,52],[42,53],[42,55],[46,54],[46,56],[50,53],[50,57],[55,55],[55,55],[62,50],[62,50],[68,44],[68,44]),
      p([40,42],[42,45],[45,47],[45,49],[48,48],[48,50],[50,47],[50,51],[55,52],[55,52],[62,50],[62,50],[68,44],[68,44]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'proper crunch form',
    stopCondition: 'Stop if you feel neck strain or lower back pain'
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'core',
    type: 'reps',
    defaultReps: 8,
    cues: ['Lie on back, arms up, knees at 90°', 'Extend one arm and opposite leg', 'Keep lower back pressed to floor', 'Alternate sides slowly'],
    mistakes: 'Arching back, moving too fast',
    easier: 'Just extend legs or just arms',
    harder: 'Slower tempo, hover just above floor',
    muscles: 'Deep core, coordination',
    poses: [
      p([35,52],[38,53],[42,53],[42,55],[46,45],[46,55],[50,40],[50,55],[55,55],[55,55],[60,48],[62,55],[68,42],[68,55]),
      p([35,52],[38,53],[42,53],[42,55],[46,55],[46,45],[50,55],[50,40],[55,55],[55,55],[62,55],[60,48],[68,55],[68,42]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'dead bug exercise core',
    stopCondition: 'Stop if lower back lifts off floor and you can\'t maintain contact'
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    category: 'core',
    type: 'reps',
    defaultReps: 8,
    cues: ['On hands and knees', 'Extend one arm and opposite leg', 'Keep hips level', 'Hold 2 seconds, switch sides'],
    mistakes: 'Rotating hips, arching back',
    easier: 'Extend arm only or leg only',
    harder: 'Slower tempo, add pulse at end',
    muscles: 'Core, back, balance',
    poses: [
      p([42,35],[44,38],[40,42],[48,42],[36,48],[52,48],[34,52],[54,52],[50,55],[56,55],[48,65],[58,55],[46,75],[60,48]),
      p([42,35],[44,38],[40,42],[48,42],[34,52],[54,48],[32,56],[56,46],[50,55],[56,55],[48,65],[58,55],[46,75],[62,45]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'bird dog exercise core stability',
    stopCondition: 'Stop if you feel lower back pain'
  },
  {
    id: 'reverse-crunch',
    name: 'Reverse Crunch',
    category: 'core',
    type: 'reps',
    defaultReps: 10,
    cues: ['Lie on back, arms at sides', 'Curl hips up, bringing knees toward chest', 'Lower hips slowly', 'Focus on lower abs'],
    mistakes: 'Using momentum to swing legs',
    easier: 'Smaller range of motion',
    harder: 'Legs straight (advanced)',
    muscles: 'Lower abs',
    poses: [
      p([30,55],[33,55],[36,54],[36,56],[40,54],[40,56],[44,53],[44,57],[52,55],[52,55],[60,50],[60,50],[66,44],[66,44]),
      p([30,55],[33,55],[36,54],[36,56],[40,54],[40,56],[44,53],[44,57],[52,55],[52,55],[58,48],[58,48],[62,40],[62,40]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'reverse crunch lower abs',
    stopCondition: 'Stop if you feel lower back strain'
  },
  {
    id: 'hollow-hold',
    name: 'Hollow Hold',
    category: 'core',
    type: 'hold',
    defaultHold: 15,
    cues: ['Lie on back, arms overhead', 'Press lower back into floor', 'Lift shoulders and legs slightly', 'Hold position, breathe'],
    mistakes: 'Lower back arching off floor',
    easier: 'Knees bent, smaller angle',
    harder: 'Lower legs closer to floor',
    muscles: 'Full core (hollow body position)',
    poses: [
      p([35,48],[38,50],[42,50],[42,52],[46,46],[46,52],[50,42],[50,52],[55,52],[55,52],[62,48],[62,48],[70,44],[70,44]),
      p([35,48],[38,50],[42,50],[42,52],[46,46],[46,52],[50,42],[50,52],[55,52],[55,52],[62,48],[62,48],[70,44],[70,44]),
    ],
    animationType: 'hold',
    youtubeQuery: 'hollow hold gymnastics core',
    stopCondition: 'Stop if lower back lifts or you feel back pain'
  },

  // === STRETCHES - POSTURE ===
  {
    id: 'chest-opener',
    name: 'Chest Opener Stretch',
    category: 'stretch-posture',
    type: 'hold',
    defaultHold: 20,
    cues: ['Interlace fingers behind back', 'Straighten arms and lift gently', 'Open chest, squeeze shoulder blades', 'Hold at mild tension'],
    mistakes: 'Arching lower back excessively',
    easier: 'Clasp hands lower',
    harder: 'Walk hands further behind you',
    muscles: 'Chest (pecs), front shoulders',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[42,30],[58,30],[40,40],[60,40],[42,48],[58,48],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'chest opener stretch behind back',
    stopCondition: 'Stop if you feel shoulder pain'
  },
  {
    id: 'thoracic-extension',
    name: 'Thoracic Extension',
    category: 'stretch-posture',
    type: 'hold',
    defaultHold: 15,
    cues: ['Sit tall or on chair edge', 'Hands behind head', 'Gently arch upper back over chair/support', 'Focus on mid-back, not lower back'],
    mistakes: 'Arching from lower back instead of thoracic spine',
    easier: 'Smaller range of motion',
    harder: 'Deeper extension over support',
    muscles: 'Thoracic spine, upper back',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[44,22],[56,22],[48,18],[52,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([48,13],[49,20],[40,28],[58,28],[44,20],[54,20],[48,16],[52,16],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'thoracic extension stretch',
    stopCondition: 'Stop if you feel spinal pain'
  },
  {
    id: 'upper-back-stretch',
    name: 'Upper Back Stretch',
    category: 'stretch-posture',
    type: 'hold',
    defaultHold: 20,
    cues: ['Round upper back, arms wide', 'Push floor away, spread shoulder blades', 'Chin toward chest', 'Feel stretch between shoulder blades'],
    mistakes: 'Pushing too hard or rounding lower back',
    easier: 'Less rounding',
    harder: 'Walk hands further forward',
    muscles: 'Rhomboids, mid-traps, rear delts',
    poses: [
      p([48,25],[48,30],[42,36],[54,36],[38,42],[58,42],[36,46],[60,46],[50,55],[56,55],[48,70],[56,70],[46,85],[56,85]),
      p([46,22],[46,28],[40,34],[52,34],[36,40],[56,40],[34,44],[58,44],[50,55],[56,55],[48,70],[56,70],[46,85],[56,85]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'upper back stretch child pose',
    stopCondition: 'Stop if you feel shoulder or neck pain'
  },
  {
    id: 'lat-stretch',
    name: 'Lat Stretch',
    category: 'stretch-posture',
    type: 'hold',
    defaultHold: 20,
    cues: ['Reach one arm overhead', 'Lean to opposite side', 'Feel stretch along side of body', 'Keep hips grounded'],
    mistakes: 'Rotating torso or hiking hip',
    easier: 'Smaller lean',
    harder: 'Add gentle rotation',
    muscles: 'Latissimus dorsi, side body',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,24],[34,45],[68,18],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([48,14],[48,21],[38,29],[58,29],[34,37],[62,23],[32,44],[66,17],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'lat stretch standing side bend',
    stopCondition: 'Stop if you feel shoulder pain'
  },
  {
    id: 'shoulder-stretch',
    name: 'Shoulder Stretch (Cross-Body)',
    category: 'stretch-posture',
    type: 'hold',
    defaultHold: 20,
    cues: ['Bring one arm across chest', 'Gently press with other hand', 'Keep shoulder down', 'Hold at mild tension'],
    mistakes: 'Pulling too hard or shrugging',
    easier: 'Less pressure',
    harder: 'Gentle rotation',
    muscles: 'Rear deltoid, shoulder capsule',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[52,34],[64,38],[56,32],[68,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[50,34],[62,38],[54,32],[66,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'cross body shoulder stretch',
    stopCondition: 'Stop if you feel sharp shoulder pain'
  },

  // === STRETCHES - LOWER BODY ===
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Half-kneeling position', 'Tuck pelvis under (posterior tilt)', 'Gently shift weight forward', 'Feel stretch in front of hip'],
    mistakes: 'Arching lower back, leaning too far forward',
    easier: 'Smaller forward shift',
    harder: 'Raise back arm overhead',
    muscles: 'Hip flexors (psoas, rectus femoris)',
    poses: [
      p([50,18],[50,25],[42,32],[58,32],[38,38],[62,38],[36,44],[64,44],[45,55],[55,55],[44,70],[54,65],[42,85],[58,72]),
      p([50,16],[50,23],[42,30],[58,30],[38,36],[62,36],[36,42],[64,42],[45,53],[55,53],[44,68],[54,63],[42,83],[58,70]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'hip flexor stretch half kneeling',
    stopCondition: 'Stop if you feel knee or lower back pain'
  },
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Sit with one leg extended', 'Hinge forward from hips (not waist)', 'Keep back relatively straight', 'Hold at mild tension'],
    mistakes: 'Rounding back excessively to reach toes',
    easier: 'Bend knee slightly',
    harder: 'Straighten leg more',
    muscles: 'Hamstrings',
    poses: [
      p([42,35],[44,38],[42,42],[46,42],[40,46],[48,46],[38,50],[50,50],[52,52],[56,52],[62,50],[66,50],[72,48],[76,48]),
      p([40,33],[42,36],[40,40],[44,40],[38,44],[46,44],[36,48],[48,48],[52,52],[56,52],[62,50],[66,50],[72,48],[76,48]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'seated hamstring stretch',
    stopCondition: 'Stop if you feel sharp pain behind knee'
  },
  {
    id: 'quad-stretch',
    name: 'Quadriceps Stretch',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 20,
    cues: ['Stand, hold wall for balance', 'Bend one knee, grab foot behind', 'Keep knees together', 'Gentle pull, feel stretch in front of thigh'],
    mistakes: 'Arching back or pulling foot too aggressively',
    easier: 'Hold shin instead of foot',
    harder: 'Lean back slightly',
    muscles: 'Quadriceps',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[60,40],[34,45],[58,45],[43,55],[57,55],[42,75],[54,65],[40,95],[56,72]),
      p([50,15],[50,22],[40,30],[60,30],[36,38],[58,40],[34,45],[56,45],[43,55],[57,55],[42,75],[54,65],[40,95],[56,72]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'standing quad stretch',
    stopCondition: 'Stop if you feel knee pain'
  },
  {
    id: 'glute-stretch',
    name: 'Glute Stretch (Seated)',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Sit tall, cross one ankle over opposite knee', 'Gently press knee down', 'Lean forward slightly from hips', 'Feel stretch in buttock'],
    mistakes: 'Rounding back excessively',
    easier: 'Less forward lean',
    harder: 'Deeper lean',
    muscles: 'Glutes, piriformis',
    poses: [
      p([50,22],[50,28],[42,34],[58,34],[38,40],[62,40],[36,46],[64,46],[45,52],[55,52],[50,60],[58,55],[52,68],[60,62]),
      p([48,24],[48,30],[40,36],[56,36],[36,42],[60,42],[34,48],[62,48],[45,54],[55,54],[50,62],[58,57],[52,70],[60,64]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'seated glute stretch figure four',
    stopCondition: 'Stop if you feel hip or knee pain'
  },
  {
    id: 'figure-4-stretch',
    name: 'Figure-4 Stretch (Lying)',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Lie on back, cross ankle over knee', 'Thread hands behind thigh', 'Gently pull toward chest', 'Keep head and shoulders relaxed'],
    mistakes: 'Pulling too aggressively',
    easier: 'Keep bottom foot on floor',
    harder: 'Straighten bottom leg',
    muscles: 'Glutes, piriformis, outer hip',
    poses: [
      p([30,52],[33,53],[36,53],[36,55],[40,52],[40,55],[44,50],[44,55],[50,55],[54,55],[58,48],[62,48],[66,42],[66,42]),
      p([30,52],[33,53],[36,53],[36,55],[40,52],[40,55],[44,50],[44,55],[50,55],[54,55],[58,48],[62,48],[66,42],[66,42]),
    ],
    animationType: 'hold',
    youtubeQuery: 'figure 4 stretch lying down',
    stopCondition: 'Stop if you feel hip or knee pain'
  },
  {
    id: 'inner-thigh-stretch',
    name: 'Inner Thigh Stretch',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Sit with soles of feet together', 'Let knees fall gently outward', 'Sit tall, slight forward lean', 'Never force knees down'],
    mistakes: 'Forcing knees down or rounding back',
    easier: 'Feet further from body',
    harder: 'Feet closer, deeper lean',
    muscles: 'Adductors (inner thigh)',
    poses: [
      p([50,20],[50,26],[42,32],[58,32],[38,38],[62,38],[36,44],[64,44],[45,52],[55,52],[38,58],[62,58],[34,65],[66,65]),
      p([50,22],[50,28],[42,34],[58,34],[38,40],[62,40],[36,46],[64,46],[45,54],[55,54],[38,60],[62,60],[34,67],[66,67]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'butterfly stretch inner thigh',
    stopCondition: 'Stop if you feel groin pain'
  },
  {
    id: 'adductor-stretch',
    name: 'Adductor Stretch (Side Lunge)',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 20,
    cues: ['Wide stance, shift to one side', 'Keep other leg straight', 'Feel stretch in inner thigh', 'Keep chest up'],
    mistakes: 'Rounding back or bouncing',
    easier: 'Narrower stance',
    harder: 'Deeper shift',
    muscles: 'Adductors',
    poses: [
      p([45,20],[45,27],[38,34],[52,34],[34,40],[56,40],[32,46],[58,46],[42,55],[52,55],[35,72],[55,72],[30,90],[60,88]),
      p([43,22],[43,29],[36,36],[50,36],[32,42],[54,42],[30,48],[56,48],[42,57],[52,57],[35,74],[55,74],[30,92],[60,90]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'side lunge adductor stretch',
    stopCondition: 'Stop if you feel groin or knee pain'
  },
  {
    id: 'calf-stretch',
    name: 'Calf Stretch',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 25,
    cues: ['Stand facing wall, one foot back', 'Press back heel into floor', 'Keep back leg straight', 'Lean forward gently'],
    mistakes: 'Bending back knee or lifting heel',
    easier: 'Shorter stance',
    harder: 'Bend front knee more',
    muscles: 'Calves (gastrocnemius)',
    poses: [
      p([48,18],[48,25],[40,32],[56,32],[36,38],[60,38],[34,44],[62,44],[45,55],[55,55],[42,72],[56,72],[40,90],[62,88]),
      p([46,18],[46,25],[38,32],[54,32],[34,38],[58,38],[32,44],[60,44],[45,55],[55,55],[42,72],[56,72],[40,90],[62,88]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'wall calf stretch',
    stopCondition: 'Stop if you feel Achilles pain'
  },
  {
    id: 'deep-squat-hold',
    name: 'Deep Squat Hold',
    category: 'stretch-lower',
    type: 'hold',
    defaultHold: 20,
    cues: ['Feet shoulder-width, toes slightly out', 'Sit down deep, elbows push knees out', 'Keep heels down if possible', 'Relax and breathe'],
    mistakes: 'Heels lifting excessively, knees caving in',
    easier: 'Hold onto doorframe for balance, heels on book',
    harder: 'Let go of support',
    muscles: 'Hips, ankles, quads, mobility',
    poses: [
      p([50,25],[50,32],[42,38],[58,38],[38,44],[62,44],[36,48],[64,48],[44,55],[56,55],[38,68],[62,68],[36,82],[64,82]),
      p([50,25],[50,32],[42,38],[58,38],[38,44],[62,44],[36,48],[64,48],[44,55],[56,55],[38,68],[62,68],[36,82],[64,82]),
    ],
    animationType: 'hold',
    youtubeQuery: 'deep squat hold mobility',
    stopCondition: 'Stop if you feel knee or ankle pain'
  },

  // === STRETCHES - UPPER BODY ===
  {
    id: 'chest-stretch',
    name: 'Chest Stretch (Doorway)',
    category: 'stretch-upper',
    type: 'hold',
    defaultHold: 20,
    cues: ['Stand in doorway, arm at 90°', 'Gently lean forward', 'Feel stretch across chest', 'Keep shoulder down'],
    mistakes: 'Leaning too far or too fast',
    easier: 'Arm lower',
    harder: 'Arm higher',
    muscles: 'Chest (pectoral)',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[52,30],[64,38],[56,28],[68,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([48,15],[48,22],[38,30],[58,30],[50,30],[62,38],[54,28],[66,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'doorway chest stretch',
    stopCondition: 'Stop if you feel shoulder pain'
  },
  {
    id: 'triceps-stretch',
    name: 'Triceps Stretch',
    category: 'stretch-upper',
    type: 'hold',
    defaultHold: 20,
    cues: ['Reach one arm overhead, bend elbow', 'Other hand gently pushes elbow', 'Feel stretch behind upper arm', 'Keep head upright'],
    mistakes: 'Pulling head to side',
    easier: 'Less push on elbow',
    harder: 'Gentle rotation',
    muscles: 'Triceps',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[52,18],[34,45],[50,12],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[36,38],[50,18],[34,45],[48,12],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'overhead triceps stretch',
    stopCondition: 'Stop if you feel shoulder or elbow pain'
  },
  {
    id: 'biceps-stretch',
    name: 'Biceps Stretch',
    category: 'stretch-upper',
    type: 'hold',
    defaultHold: 20,
    cues: ['Extend arm forward, palm up', 'Gently pull fingers back', 'Feel stretch in front of upper arm', 'Keep arm straight'],
    mistakes: 'Bending elbow or pulling too hard',
    easier: 'Less stretch',
    harder: 'Rotate palm further',
    muscles: 'Biceps, forearm flexors',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,36],[66,36],[30,38],[70,38],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[32,36],[64,36],[28,38],[68,38],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'biceps stretch wall',
    stopCondition: 'Stop if you feel elbow or wrist pain'
  },
  {
    id: 'shoulder-blade-stretch',
    name: 'Shoulder Blade Stretch',
    category: 'stretch-upper',
    type: 'hold',
    defaultHold: 20,
    cues: ['Reach arm across body', 'Use other hand to gently push elbow', 'Feel stretch around shoulder blade', 'Keep shoulder relaxed'],
    mistakes: 'Rounding forward excessively',
    easier: 'Less pressure',
    harder: 'Add gentle rotation',
    muscles: 'Rhomboids, rear deltoid',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[52,34],[64,38],[56,36],[68,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[50,34],[62,38],[54,36],[66,42],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'shoulder blade stretch',
    stopCondition: 'Stop if you feel sharp shoulder pain'
  },
  {
    id: 'forearm-stretch',
    name: 'Forearm Stretch',
    category: 'stretch-upper',
    type: 'hold',
    defaultHold: 15,
    cues: ['Extend arm, palm up', 'Gently pull fingers toward you', 'Then flip palm down, press fingers', 'Both directions'],
    mistakes: 'Bending elbow or pulling too hard',
    easier: 'Less stretch',
    harder: 'Gentle wrist rotation',
    muscles: 'Forearm flexors and extensors',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[34,34],[66,34],[30,32],[70,32],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[34,36],[66,36],[30,38],[70,38],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'forearm wrist stretch',
    stopCondition: 'Stop if you feel wrist pain'
  },

  // === STRETCHES - BACK ===
  {
    id: 'knee-to-chest',
    name: 'Knee-to-Chest Stretch',
    category: 'stretch-back',
    type: 'hold',
    defaultHold: 20,
    cues: ['Lie on back', 'Pull one or both knees to chest', 'Wrap arms around shins', 'Lower back stays on floor'],
    mistakes: 'Pulling too hard or lifting hips',
    easier: 'One knee at a time',
    harder: 'Gentle rocking',
    muscles: 'Lower back, glutes',
    poses: [
      p([30,52],[33,53],[36,53],[36,55],[40,50],[40,55],[44,48],[44,55],[52,55],[56,55],[58,48],[58,48],[62,42],[62,42]),
      p([30,52],[33,53],[36,53],[36,55],[40,50],[40,55],[44,48],[44,55],[52,55],[56,55],[58,48],[58,48],[62,42],[62,42]),
    ],
    animationType: 'hold',
    youtubeQuery: 'knee to chest stretch lower back',
    stopCondition: 'Stop if you feel lower back pain'
  },
  {
    id: 'lower-back-rotation',
    name: 'Lower Back Rotation (Lying)',
    category: 'stretch-back',
    type: 'hold',
    defaultHold: 20,
    cues: ['Lie on back, knees bent', 'Let both knees fall to one side', 'Arms out in T', 'Turn head opposite direction'],
    mistakes: 'Forcing the rotation or lifting shoulders',
    easier: 'Smaller rotation',
    harder: 'Straighten top leg',
    muscles: 'Lower back, obliques',
    poses: [
      p([50,52],[50,53],[42,53],[58,53],[38,53],[62,53],[36,53],[64,53],[50,55],[50,55],[44,48],[56,48],[40,42],[60,42]),
      p([50,52],[50,53],[42,53],[58,53],[38,53],[62,53],[36,53],[64,53],[50,55],[50,55],[42,46],[54,46],[38,40],[58,40]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'lying spinal rotation stretch',
    stopCondition: 'Stop if you feel sharp back pain'
  },
  {
    id: 'seated-back-rotation',
    name: 'Seated Lower-Back Rotation',
    category: 'stretch-back',
    type: 'hold',
    defaultHold: 20,
    cues: ['Sit cross-legged or on chair', 'Rotate torso to one side', 'Use arm to gently deepen', 'Breathe into the rotation'],
    mistakes: 'Forcing rotation from shoulders',
    easier: 'Smaller rotation',
    harder: 'Deeper with arm leverage',
    muscles: 'Thoracic spine, obliques',
    poses: [
      p([50,20],[50,26],[42,32],[58,32],[38,38],[62,38],[36,44],[64,44],[45,52],[55,52],[48,62],[56,62],[46,72],[58,72]),
      p([46,20],[47,26],[40,32],[54,32],[36,38],[58,38],[34,44],[60,44],[45,52],[55,52],[48,62],[56,62],[46,72],[58,72]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'seated spinal twist stretch',
    stopCondition: 'Stop if you feel back pain'
  },
  {
    id: 'lower-back-flexibility',
    name: 'Lower-Back Flexibility (Child\'s Pose)',
    category: 'stretch-back',
    type: 'hold',
    defaultHold: 25,
    cues: ['Kneel, sit back on heels', 'Walk hands forward on floor', 'Forehead to floor', 'Breathe deeply into lower back'],
    mistakes: 'Not relaxing into the stretch',
    easier: 'Knees together, smaller reach',
    harder: 'Arms wider, deeper reach',
    muscles: 'Lower back, lats, relaxation',
    poses: [
      p([40,38],[42,40],[44,42],[44,44],[46,44],[46,46],[48,44],[48,46],[52,50],[56,50],[54,60],[58,60],[56,72],[60,72]),
      p([38,36],[40,38],[42,40],[42,42],[44,42],[44,44],[46,42],[46,44],[52,50],[56,50],[54,60],[58,60],[56,72],[60,72]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'child pose lower back stretch',
    stopCondition: 'Stop if you feel knee or back pain'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow',
    category: 'stretch-back',
    type: 'reps',
    defaultReps: 8,
    cues: ['On hands and knees', 'Arch back up (cat), then dip (cow)', 'Move with breath', 'Gentle, controlled movement'],
    mistakes: 'Moving too fast or forcing the range',
    easier: 'Smaller range of motion',
    harder: 'Slower, more deliberate',
    muscles: 'Full spine, core, mobility',
    poses: [
      p([45,30],[46,34],[44,38],[48,38],[42,42],[50,42],[40,46],[52,46],[52,52],[56,52],[50,62],[56,62],[48,72],[56,72]),
      p([48,38],[48,40],[46,42],[50,42],[44,46],[52,46],[42,50],[54,50],[52,55],[56,55],[50,65],[56,65],[48,75],[56,75]),
    ],
    animationType: 'oscillate',
    youtubeQuery: 'cat cow stretch spine mobility',
    stopCondition: 'Stop if you feel any spinal pain'
  },

  // === BREATHING ===
  {
    id: 'breathing-4-6',
    name: '4-6 Breathing Exercise',
    category: 'recovery',
    type: 'timed',
    defaultHold: 120,
    cues: ['Inhale through nose for 4 counts', 'Exhale through mouth for 6 counts', 'Relax shoulders', 'Let body settle'],
    mistakes: 'Rushing the breath or tensing up',
    easier: 'Shorter counts (3-4)',
    harder: 'Longer counts (5-8)',
    muscles: 'Diaphragm, relaxation response',
    poses: [
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
      p([50,15],[50,22],[40,30],[60,30],[36,38],[64,38],[34,45],[66,45],[43,55],[57,55],[42,75],[58,75],[40,95],[60,95]),
    ],
    animationType: 'hold',
    youtubeQuery: '4 6 breathing relaxation technique',
    stopCondition: 'Stop if you feel lightheaded'
  },
];

// Get exercise by ID
export function getExercise(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id);
}

// Get exercises by category
export function getExercisesByCategory(category: string): Exercise[] {
  return exercises.filter(e => e.category === category);
}

// All categories
export const categories = [
  { id: 'warmup', name: 'Warm-Up & Mobility', icon: '🌅' },
  { id: 'face', name: 'Face & Scalp', icon: '🧖' },
  { id: 'neck', name: 'Neck', icon: '🧘' },
  { id: 'push', name: 'Push', icon: '💪' },
  { id: 'pull', name: 'Pull / Back', icon: '🏋️' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'core', name: 'Core', icon: '🎯' },
  { id: 'stretch-posture', name: 'Posture Stretches', icon: '🧍' },
  { id: 'stretch-lower', name: 'Lower Body Stretches', icon: '🦶' },
  { id: 'stretch-upper', name: 'Upper Body Stretches', icon: '🤸' },
  { id: 'stretch-back', name: 'Back Stretches', icon: '🔄' },
  { id: 'recovery', name: 'Recovery', icon: '😌' },
];
