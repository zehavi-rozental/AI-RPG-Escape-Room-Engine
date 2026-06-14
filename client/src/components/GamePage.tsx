import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import { getProgressPercent, isAnswerCorrect } from '../utils/gameLogic';

interface PuzzleStep {
  id: number;
  prompt: string;
  hint: string;
  strongHint: string;
  answer: string;
}

const gamePuzzles: Record<string, PuzzleStep[]> = {
  '1': [
    {
      id: 1,
      prompt: 'מהו המפתח שמחזיר אתכם אל המתחם?',
      hint: 'הקוד הוא שמו של נוזל שכולנו מכירים.',
      strongHint: 'הכיוון נמצא בסימן של משקה שמקובל לשמור במקרר.',
      answer: 'אלכוהול',
    },
    {
      id: 2,
      prompt: 'איזה דבר נעלם כשמתחילים לחקור?',
      hint: 'זה לא חומר, אלא משהו שנמצא במעבדה.',
      strongHint: 'כשהעיניים מתרגלות לאפלה, הדבר הראשון שנעלם הוא מה שמסמן את הזמן.',
      answer: 'זמן',
    },
    {
      id: 3,
      prompt: 'מהו הסוד האחרון שנשאר במסדרון?',
      hint: 'הוא נכתב על קיר, אבל לא בעיפרון.',
      strongHint: 'הסוד כתוב במונח מדעי שמסביר את המבנה של המערכת.',
      answer: 'נוסחה',
    },
  ],
  '2': [
    {
      id: 1,
      prompt: 'באיזה כיוון הלכה האנייה?',
      hint: 'היא לא הלכה שמאלה.',
      strongHint: 'היא הלכה אל הצד שבו נשקף הכוכב בעמק.',
      answer: 'דרום',
    },
    {
      id: 2,
      prompt: 'מהו הסמל שפתח את התיבה?',
      hint: 'זהו סימן של יאכטה.',
      strongHint: 'הסמל נראה כמו דוגמה של שמיים לאורכה של לילה.',
      answer: 'כוכב',
    },
    {
      id: 3,
      prompt: 'מהו המפתח לסוד האוצר?',
      hint: 'הוא נישא על צוואר.',
      strongHint: 'המשהו הזה עוזר לפתוח גם את התשובה וגם את הלב.',
      answer: 'מפתחות',
    },
  ],
};

const roomHotspots = [
  {
    id: 'desk',
    title: 'שולחן העבודה',
    description: 'על השולחן מונח פתק עם סימן של כוס בוהקת. המילים בו מופיעות כמו שרידים של זיכרון.',
    terminalLine: '>> מסוף: האצבעות שלי נוגעות בכיתוב ישן. לא מדובר בכוס, אלא בפתח.',
    icon: '📄',
    summary: 'מגירה עם מסמך ישן',
  },
  {
    id: 'mirror',
    title: 'מראה מסולסלת',
    description: 'המסגרת נשברת באור, ומבליטה קו דק שמזכיר ציר של חדר סגור.',
    terminalLine: '>> מסוף: המראה מחזירה לא את הפנים, אלא את הסוד הבא.',
    icon: '🪞',
    summary: 'מראה שמחזירה רמזים',
  },
  {
    id: 'vault',
    title: 'תיבת האמת',
    description: 'הסרגל בפנים זז בשקט, והדפנות נפתחות רק כשמישהו עוצר לרגע.',
    terminalLine: '>> מסוף: התיבה לא נפתחת בכוח. היא נפתחת בהבנה.',
    icon: '🗝️',
    summary: 'מנעול עם סימן נסתר',
  },
];

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultyConfig {
  label: string;
  description: string;
  time: number;
  hintAfter: number;
}

const difficultyConfig: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: 'קל',
    description: 'מתאים להתחלה, עם זמן נוח ורמזים שמופיעים מאוחר.',
    time: 120,
    hintAfter: 60,
  },
  medium: {
    label: 'בינוני',
    description: 'מאזן בין חקירה למתח, עם מעט יותר לחץ.',
    time: 90,
    hintAfter: 45,
  },
  hard: {
    label: 'קשה',
    description: 'האתגר האמיתי, עם לחץ גבוה ורמזים שמופיעים מוקדם.',
    time: 60,
    hintAfter: 25,
  },
};

interface StoryPanelProps {
  storyText: string;
}

function StoryPanel({ storyText }: StoryPanelProps) {
  return (
    <div className="rounded-[1.25rem] border border-amber-800/40 bg-[#0f0b14]/70 p-5 text-right shadow-inner shadow-black/50">
      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-600">רקע החדר</p>
      <h2 className="mt-2 font-heading text-2xl text-amber-200">הסיפור מתחיל</h2>
      <p className="mt-3 min-h-[6.5rem] text-sm leading-relaxed text-gray-300 transition-all duration-500">
        {storyText || 'החדר נפתח באפלה. כל פינה שומרת על סוד, וכל חפץ מבקש שתתקרבו אליו.'}
      </p>
    </div>
  );
}

interface InteractiveObjectButtonProps {
  hotspot: {
    id: string;
    title: string;
    icon: string;
    summary: string;
  };
  isActive: boolean;
  onSelect: (id: string) => void;
}

function InteractiveObjectButton({ hotspot, isActive, onSelect }: InteractiveObjectButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(hotspot.id)}
      className={`group relative flex min-h-[8rem] flex-col items-start rounded-[1.1rem] border p-4 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(245,158,11,0.16)] ${
        isActive
          ? 'border-amber-400 bg-[#231b2f]/95 shadow-[0_0_28px_rgba(245,158,11,0.2)]'
          : 'border-amber-800/40 bg-[#120f19]/80'
      }`}
    >
      <div className="text-3xl">{hotspot.icon}</div>
      <div className="mt-3 text-sm font-semibold text-amber-100">{hotspot.title}</div>
      <div className="mt-2 text-xs leading-relaxed text-gray-400">{hotspot.summary}</div>
      <div className="absolute inset-0 rounded-[1.1rem] bg-gradient-to-br from-amber-400/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

interface InvestigationLogProps {
  entries: string[];
}

function InvestigationLog({ entries }: InvestigationLogProps) {
  return (
    <div className="rounded-[1.5rem] border border-amber-700/40 bg-[#1c1722]/90 p-5 text-right shadow-lg shadow-black/40">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-heading text-xl text-amber-200">תיק החקירה</span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-amber-600">log</span>
      </div>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={`${entry}-${index}`}
            className="rounded-xl border border-amber-800/40 bg-[#0f0b14]/80 px-3 py-3 text-sm leading-relaxed text-gray-300"
          >
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

function GamePage() {
  const { id } = useParams();
  const game = mockGames.find((g) => g._id === id);
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [roomState, setRoomState] = useState<'intro' | 'exploring' | 'solving'>('intro');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [hintReady, setHintReady] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [investigationLog, setInvestigationLog] = useState<string[]>([
    'החדר פתוח, אבל עדיין שקט. התחל לחפש אחר סימן שיגלה אותך.',
  ]);
  const [storyText, setStoryText] = useState('');

  const puzzles = useMemo(() => gamePuzzles[id ?? '1'] ?? [], [id]);
  const currentPuzzle = puzzles[currentStep];
  const progress = getProgressPercent(currentStep, puzzles.length);
  const activeHotspotData = roomHotspots.find((spot) => spot.id === selectedHotspot);
  const selectedDifficultyConfig = difficulty ? difficultyConfig[difficulty] : null;
  const activeTime = selectedDifficultyConfig?.time ?? 90;
  const hintThreshold = selectedDifficultyConfig?.hintAfter ?? 45;

  const addInvestigationEntry = (entry: string) => {
    setInvestigationLog((prev) => [...prev, entry]);
  };

  useEffect(() => {
    if (!difficulty || isSolved || isExpired) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [difficulty, isSolved, isExpired]);

  useEffect(() => {
    if (!difficulty || isSolved || isExpired) {
      return;
    }

    if (timeLeft <= hintThreshold && !hintReady) {
      setHintReady(true);
      addInvestigationEntry('רמז חדש התווסף: המערכת מתחילה לגלות את הדרך האמיתית בחדר.');
    }
  }, [difficulty, hintReady, hintThreshold, isSolved, isExpired, timeLeft]);

  useEffect(() => {
    if (!difficulty) {
      return;
    }

    const story = [
      'החדר נפתח באפלה, אבל לא כמו פינה רגילה. כל משטח כאן מחזיק סוד, וכל צליל נושא רמז.',
      'הקירות אינם רק קירות. הם מסמכים של זיכרון, ובמבט אחד אפשר לשמוע את מה שמסתתר מאחוריהם.',
      'המשחק מתחיל עכשיו. בחרו בחפץ, חקרו אותו, והחדר יענה לכם.',
    ].join(' ');

    let index = 0;
    setStoryText('');

    const interval = window.setInterval(() => {
      index += 1;
      setStoryText(story.slice(0, index));
      if (index >= story.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [difficulty]);

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0a10] bg-[radial-gradient(ellipse_at_top,_#241a30_0%,_#0b0a10_55%)] px-4 py-12 text-center text-white">
        <div className="w-full max-w-md rounded-[2rem] border border-amber-900/40 bg-[#120f19]/70 px-8 py-10 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p className="mb-4 text-4xl">🕯️</p>
          <h1 className="font-heading text-3xl font-bold text-amber-300">החדר לא נמצא</h1>
          <p className="mt-3 text-sm text-gray-500">
            ייתכן שהקישור ישן או שהחדר הוסר מהקטלוג.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          >
            ← חזרה לקטלוג
          </Link>
        </div>
      </div>
    );
  }

  const playFeedbackTone = () => {
    try {
      const AudioContextCtor = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) {
        return;
      }

      const context = new AudioContextCtor();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 480;
      gain.gain.value = 0.03;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.08);
      window.setTimeout(() => context.close(), 120);
    } catch {
      // Silent fallback for browsers that block audio autoplay.
    }
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentStep(0);
    setAnswer('');
    setFeedback('');
    setIsSolved(false);
    setIsExpired(false);
    setRoomState('intro');
    setSelectedHotspot(null);
    setHintReady(false);
    setHintLevel(0);
    setTimeLeft(difficultyConfig[selectedDifficulty].time);
    setInvestigationLog([
      'החדר נפתח מחדש. כל אובייקט מחכה לחקירה.',
      `רמת קושי: ${difficultyConfig[selectedDifficulty].label}`,
    ]);
    setStoryText('');
    playFeedbackTone();
  };

  const handleSelectObject = (hotspotId: string) => {
    const hotspot = roomHotspots.find((item) => item.id === hotspotId);
    if (!hotspot) {
      return;
    }

    setSelectedHotspot(hotspotId);
    setRoomState('solving');
    setFeedback(`בחנתם ב${hotspot.title}. התיבה נפתחת מעט.`);
    addInvestigationEntry(`נפתח: ${hotspot.title}`);
    playFeedbackTone();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentPuzzle) {
      return;
    }

    playFeedbackTone();

    if (isAnswerCorrect(answer, currentPuzzle.answer)) {
      setFeedback('נכון. הכניסה נפתחת והחדר מחזיר את האור.');
      addInvestigationEntry(`פתרון: ${currentPuzzle.prompt}`);
      setSelectedHotspot(null);
      setAnswer('');
      if (currentStep < puzzles.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setHintLevel(0);
        setRoomState('exploring');
      } else {
        setIsSolved(true);
        addInvestigationEntry('הדלת נפתחת. אתם יוצאים מהחדר.');
      }
    } else {
      setFeedback('הקוד לא תואם. יש עוד סימנים בחדר, אל תמהרו.');
      addInvestigationEntry('האות לא התאמה. נסו לחפש במקום אחר.');
    }
  };

  const handleHelp = () => {
    if (!hintReady || !currentPuzzle) {
      return;
    }

    const nextLevel = hintLevel + 1;
    setHintLevel(nextLevel);
    setFeedback(nextLevel === 1 ? 'רמז ראשוני נפתח.' : 'רמז חזק יותר נחשף.');
    addInvestigationEntry(nextLevel === 1 ? currentPuzzle.hint : currentPuzzle.strongHint);
    playFeedbackTone();
  };

  const handleRestart = () => {
    setDifficulty(null);
    setCurrentStep(0);
    setAnswer('');
    setFeedback('');
    setIsSolved(false);
    setIsExpired(false);
    setRoomState('intro');
    setSelectedHotspot(null);
    setHintReady(false);
    setHintLevel(0);
    setTimeLeft(90);
    setStoryText('');
    setInvestigationLog(['החדר פתוח, אבל עדיין שקט. התחל לחפש אחר סימן שיגלה אותך.']);
  };

  if (!difficulty) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0a10] bg-[radial-gradient(ellipse_at_top,_#241a30_0%,_#0b0a10_55%)] px-4 py-12 text-center text-white">
        <div className="w-full max-w-4xl rounded-[2rem] border border-amber-900/40 bg-[#120f19]/70 px-6 py-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-10 lg:px-12">
          <p className="text-4xl">🗝️</p>
          <h1 className="mt-3 font-heading text-4xl font-black text-amber-300 [text-shadow:0_0_25px_rgba(245,158,11,0.45)]">
            {game.title}
          </h1>
          <p className="mt-4 text-gray-400">{game.storyBackground}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Object.entries(difficultyConfig).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => startGame(key as Difficulty)}
                className="rounded-[1.25rem] border border-amber-700/40 bg-[#1c1722]/90 p-5 text-right transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-amber-200">{config.label}</span>
                  <span className="text-2xl">{key === 'easy' ? '🕯️' : key === 'medium' ? '🧭' : '⚠️'}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{config.description}</p>
                <div className="mt-4 text-sm text-amber-300">
                  <p>זמן: {config.time}s</p>
                  <p>רמזים: אחרי {config.hintAfter}s</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[1.25rem] border border-amber-800/40 bg-black/20 p-4 text-right text-sm text-gray-400">
            <p className="font-semibold text-amber-200">הנחיות החדר</p>
            <p className="mt-2 leading-relaxed">
              בחירת רמת קושי קובעת כמה זמן יש לכם, כמה רמזים יופיעו, ואיך המתח יתחיל להתנפץ בחלל.
            </p>
          </div>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-[0.98]"
          >
            ← חזרה לקטלוג
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0b0a10] bg-[radial-gradient(ellipse_at_top,_#241a30_0%,_#0b0a10_55%)] px-4 py-12 text-center text-white">
      <div className="w-full max-w-6xl rounded-[2rem] border border-amber-900/40 bg-[#120f19]/70 px-6 py-8 shadow-[0_0_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-10 lg:px-12">
        <header className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl text-right">
            <p className="text-4xl">🔓</p>
            <h1 className="mt-3 font-heading text-4xl font-black text-amber-300 [text-shadow:0_0_25px_rgba(245,158,11,0.45)]">
              {game.title}
            </h1>
            <p className="mt-4 text-gray-400">{game.storyBackground}</p>
          </div>

          <div className="rounded-[1.25rem] border border-amber-700/40 bg-[#1c1722]/90 px-4 py-4 text-right text-sm text-amber-200 shadow-lg shadow-black/40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-amber-600">רמת קושי</p>
                <p className="font-semibold text-amber-200">{selectedDifficultyConfig?.label}</p>
              </div>
              <span className={`font-black ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-black/40">
              <div
                className={`h-2 rounded-full transition-all ${timeLeft <= 30 ? 'bg-red-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
                style={{ width: `${Math.max(0, (timeLeft / activeTime) * 100)}%` }}
              />
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            <StoryPanel storyText={storyText} />

            <div className="rounded-[1.5rem] border border-amber-700/40 bg-[#1c1722]/90 p-5 text-right shadow-lg shadow-black/40">
              <div className="mb-4 flex items-center justify-between text-sm text-amber-300">
                <span>התקדמות</span>
                <span>{progress}%</span>
              </div>
              <div className="mb-4 h-2 rounded-full bg-black/40">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {isSolved ? (
                <div className="space-y-3 rounded-[1.2rem] border border-emerald-600/30 bg-emerald-950/30 p-4">
                  <h2 className="font-heading text-2xl text-emerald-300">החדר נפתח!</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    הצלחתם לפענח את האותות, לנתק את המנעול ולצאת אל האור. זהו רק פרק ראשון של המערכת.
                  </p>
                </div>
              ) : isExpired ? (
                <div className="space-y-3 rounded-[1.2rem] border border-red-700/30 bg-red-950/30 p-4">
                  <h2 className="font-heading text-2xl text-red-300">החקירה נקטעה</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    הזמן נגמר, אבל החדר עדיין מזמין אתכם לחזור. הטעויות שלכם נותרו בצללים, והסוד לא נחשף.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 rounded-[1.1rem] border border-amber-800/40 bg-black/20 p-4 text-sm text-gray-300">
                    <p className="font-semibold text-amber-200">שלב {currentStep + 1} מתוך {puzzles.length}</p>
                    <p className="mt-2 leading-relaxed">
                      {roomState === 'intro'
                        ? 'בחרו חפץ בחדר כדי לחשוף את הסוד שמתחבא מאחוריו.'
                        : activeHotspotData?.description ?? 'כל צעד חדש פותח עוד שכבה באווירה.'}
                    </p>
                  </div>

                  <div className="rounded-[1.2rem] border border-amber-800/40 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.14),_transparent_40%),linear-gradient(135deg,_rgba(15,11,20,0.96),_rgba(34,24,44,0.96))] p-4 shadow-inner shadow-black/40 backdrop-blur-sm">
                    <div className="mb-4 grid gap-3 md:grid-cols-3">
                      {roomHotspots.map((hotspot) => (
                        <InteractiveObjectButton
                          key={hotspot.id}
                          hotspot={hotspot}
                          isActive={selectedHotspot === hotspot.id}
                          onSelect={handleSelectObject}
                        />
                      ))}
                    </div>

                    {selectedHotspot && currentPuzzle ? (
                      <div className="mt-4 rounded-[1.1rem] border border-amber-700/40 bg-[#120f19]/85 p-4 text-right shadow-[0_0_25px_rgba(0,0,0,0.18)]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.35em] text-amber-600">פנינה בחדר</span>
                          <span className="text-sm font-semibold text-amber-200">{activeHotspotData?.title}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">{currentPuzzle.prompt}</p>
                        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                          <input
                            value={answer}
                            onChange={(event) => setAnswer(event.target.value)}
                            placeholder="הקלידו תשובה"
                            className="w-full rounded-lg border border-amber-700/50 bg-[#0f0b14] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-gray-500"
                          />
                          <button
                            type="submit"
                            className="w-full rounded-lg border border-amber-600/50 bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 px-4 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] active:scale-[0.98]"
                          >
                            בדקו תשובה
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="rounded-[1.1rem] border border-amber-800/40 bg-black/20 p-4 text-sm text-gray-400">
                        <p className="font-semibold text-amber-200">החדר ממתין</p>
                        <p className="mt-2 leading-relaxed">
                          לחצו על חפץ כדי לפתוח את התיבה שלו, ואז הידע ייראה כמו מסר מהחדר עצמו.
                        </p>
                      </div>
                    )}
                  </div>

                  {feedback ? <p className="mt-3 text-sm text-amber-200">{feedback}</p> : null}
                </>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <InvestigationLog entries={investigationLog} />

            <div className="rounded-[1.5rem] border border-amber-700/40 bg-[#1c1722]/90 p-5 text-right shadow-lg shadow-black/40">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-heading text-xl text-amber-200">הנחיות חדר</span>
                <span className="text-[10px] uppercase tracking-[0.35em] text-amber-600">hint</span>
              </div>
              <div className="rounded-[1.1rem] border border-amber-800/40 bg-black/20 p-4 text-sm text-gray-400">
                <p className="font-semibold text-amber-200">החדר מדבר בעקיפין</p>
                <p className="mt-2 leading-relaxed">
                  האי-די לא נותן תשובות ישירות. הוא מציע רמזים דרך המילים, האווירה והסימנים שנמצאים בחדר.
                </p>
              </div>
              <button
                type="button"
                onClick={handleHelp}
                disabled={!hintReady}
                className={`mt-4 w-full rounded-lg border px-4 py-3 font-bold transition-all duration-200 ${hintReady ? 'border-amber-600/50 bg-[#1c1722] text-amber-300 hover:-translate-y-0.5 hover:border-amber-400' : 'cursor-not-allowed border-amber-900/30 bg-black/20 text-gray-500'}`}
              >
                עזרה{hintReady ? '' : ' · יופעל לאחר זמן'}
              </button>
            </div>
          </aside>
        </main>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-lg border border-amber-700/50 bg-[#1c1722] px-4 py-3 font-bold text-amber-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-[0.98]"
          >
            התחל מחדש
          </button>
          <Link
            to="/"
            className="rounded-lg border border-amber-700/50 bg-[#1c1722] px-4 py-3 font-bold text-amber-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-[0.98]"
          >
            ← חזרה לקטלוג
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default GamePage;
