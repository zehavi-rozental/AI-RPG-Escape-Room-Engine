import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export type Genre = 'Horror' | 'Sci-Fi' | 'Detective' | 'Fantasy';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type TargetAudience = 'Kids' | 'Teens' | 'Adults';

export interface CreateGameFormValues {
  title: string;
  genre: Genre;
  difficulty: Difficulty;
  targetAudience: TargetAudience;
  playerCount: number;
}

const GENRE_OPTIONS: { value: Genre; label: string; icon: string }[] = [
  { value: 'Horror', label: 'Horror', icon: '☠' },
  { value: 'Sci-Fi', label: 'Sci-Fi', icon: '🛸' },
  { value: 'Detective', label: 'Detective', icon: '🔍' },
  { value: 'Fantasy', label: 'Fantasy', icon: '⚔' },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; color: string }[] = [
  {
    value: 'Easy',
    color: 'text-emerald-400 border-emerald-400/40 hover:border-emerald-400',
  },
  {
    value: 'Medium',
    color: 'text-amber-400  border-amber-400/40  hover:border-amber-400',
  },
  {
    value: 'Hard',
    color: 'text-rose-400   border-rose-400/40   hover:border-rose-400',
  },
];

const AUDIENCE_OPTIONS: TargetAudience[] = ['Kids', 'Teens', 'Adults'];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-amber-400/80">
      {children}
    </label>
  );
}

function ErrorMsg({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-rose-400" />
      {message}
    </p>
  );
}

export default function CreateGameForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateGameFormValues>({
    defaultValues: {
      title: '',
      genre: 'Horror',
      difficulty: 'Medium',
      targetAudience: 'Teens',
      playerCount: 4,
    },
  });

  const selectedGenre = watch('genre');
  const selectedDifficulty = watch('difficulty');
  const selectedAudience = watch('targetAudience');

  const onSubmit: SubmitHandler<CreateGameFormValues> = async (data) => {
    await new Promise((r) => setTimeout(r, 900));
    console.log('✅ Game created:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <div className="text-6xl">🔐</div>
          <h2
            className="text-3xl text-amber-400 tracking-widest"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ROOM FORGED
          </h2>
          <p className="text-neutral-400 text-sm font-mono">
            Your escape room has been created.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="mt-4 px-8 py-3 bg-amber-400 text-neutral-950 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-amber-300 transition-colors"
          >
            View Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(251,191,36,0.06),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border border-amber-400/20 rounded-full bg-amber-400/5">
            <span className="text-amber-400 text-xs">🔑</span>
            <span className="text-amber-400/60 text-xs font-mono tracking-widest uppercase">
              Game Master Console
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight text-white"
            style={{
              fontFamily: "'Cinzel', 'Georgia', serif",
              letterSpacing: '0.05em',
            }}
          >
            FORGE A NEW
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              ESCAPE ROOM
            </span>
          </h1>
          <p className="mt-3 text-neutral-500 text-sm font-mono">
            Design the labyrinth. Set the trap.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          <div className="p-8 md:p-10 space-y-8">
            <div>
              <FieldLabel>Room Title</FieldLabel>
              <input
                {...register('title', {
                  required: 'A title is required.',
                  minLength: { value: 3, message: 'At least 3 characters.' },
                  maxLength: { value: 80, message: 'Maximum 80 characters.' },
                })}
                type="text"
                placeholder="e.g. The Forgotten Asylum…"
                className="w-full bg-neutral-950/60 text-white placeholder-neutral-600 border border-neutral-700 rounded-lg px-4 py-3 text-sm font-mono outline-none transition-all duration-200 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10 hover:border-neutral-600"
              />
              <ErrorMsg message={errors.title?.message} />
            </div>

            <div>
              <FieldLabel>Genre</FieldLabel>
              <input type="hidden" {...register('genre', { required: true })} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GENRE_OPTIONS.map(({ value, label, icon }) => {
                  const active = selectedGenre === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setValue('genre', value, { shouldValidate: true })
                      }
                      className={`relative flex flex-col items-center gap-2 py-4 rounded-lg border text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${active ? 'border-amber-400/60 bg-amber-400/10 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.12)]' : 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300'}`}
                    >
                      <span className="text-2xl">{icon}</span>
                      {label}
                      {active && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <FieldLabel>Difficulty</FieldLabel>
              <input
                type="hidden"
                {...register('difficulty', { required: true })}
              />
              <div className="grid grid-cols-3 gap-3">
                {DIFFICULTY_OPTIONS.map(({ value, color }) => {
                  const active = selectedDifficulty === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setValue('difficulty', value, { shouldValidate: true })
                      }
                      className={`py-3 rounded-lg border text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer select-none ${active ? `${color} bg-white/5` : `${color} bg-transparent opacity-50 hover:opacity-80`}`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <FieldLabel>Target Audience</FieldLabel>
                <input
                  type="hidden"
                  {...register('targetAudience', { required: true })}
                />
                <div className="flex flex-col gap-2">
                  {AUDIENCE_OPTIONS.map((value) => {
                    const active = selectedAudience === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setValue('targetAudience', value, {
                            shouldValidate: true,
                          })
                        }
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm font-mono transition-all duration-200 cursor-pointer select-none text-left ${active ? 'border-amber-400/50 bg-amber-400/8 text-amber-300' : 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full border transition-colors ${active ? 'bg-amber-400 border-amber-400' : 'border-neutral-600'}`}
                        />
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <FieldLabel>Player Count</FieldLabel>
                <div className="relative">
                  <input
                    {...register('playerCount', {
                      required: 'Required.',
                      min: { value: 1, message: 'Minimum 1 player.' },
                      max: { value: 20, message: 'Maximum 20 players.' },
                      valueAsNumber: true,
                    })}
                    type="number"
                    min={1}
                    max={20}
                    className="w-full bg-neutral-950/60 text-white border border-neutral-700 rounded-lg px-4 py-3 text-3xl font-black text-center font-mono outline-none transition-all duration-200 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10 hover:border-neutral-600 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <div className="absolute right-3 inset-y-0 flex flex-col justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const cur = watch('playerCount');
                        if (cur < 20) setValue('playerCount', cur + 1);
                      }}
                      className="text-neutral-500 hover:text-amber-400 transition-colors leading-none text-xs"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const cur = watch('playerCount');
                        if (cur > 1) setValue('playerCount', cur - 1);
                      }}
                      className="text-neutral-500 hover:text-amber-400 transition-colors leading-none text-xs"
                    >
                      ▼
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-neutral-600 text-xs font-mono text-center">
                  1 – 20 players
                </p>
                <ErrorMsg message={errors.playerCount?.message} />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full py-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_40px_rgba(251,191,36,0.35)] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      FORGING…
                    </span>
                  ) : (
                    '⚒ Forge the Room'
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        </form>
        <p className="mt-6 text-center text-neutral-700 text-xs font-mono">
          Only Game Masters can forge rooms. Play wisely.
        </p>
      </div>
    </div>
  );
}
