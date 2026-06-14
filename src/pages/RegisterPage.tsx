import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, type Role } from '../context/AuthContext';

interface RegisterFields {
  username: string;
  email: string;
  password: string;
  role: Role;
}

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({ defaultValues: { role: 'Player' } });

  const onSubmit = async (data: RegisterFields) => {
    await new Promise((r) => setTimeout(r, 700));
    const fakeToken = `mock_token_${Date.now()}`;
    login(fakeToken, data.role, data.email);
    navigate('/catalog', { replace: true });
  };

  const inputCls = `
    w-full bg-neutral-950/60 text-white placeholder-neutral-600
    border border-neutral-700 rounded-lg px-4 py-3 text-sm font-mono
    outline-none transition-all duration-200
    focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/10
    hover:border-neutral-600
  `;

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(251,191,36,0.05),transparent)]" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🗝</div>
          <h1
            className="text-3xl font-black text-white tracking-widest"
            style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
          >
            CREATE IDENTITY
          </h1>
          <p className="mt-2 text-neutral-500 text-xs font-mono">
            Join the order of puzzle architects
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl p-8 space-y-5 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >
          <div>
            <label className="block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80">
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required.' })}
              type="text"
              placeholder="the_architect"
              className={inputCls}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80">
              Email
            </label>
            <input
              {...register('email', { required: 'Email is required.' })}
              type="email"
              placeholder="you@vault.io"
              className={inputCls}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80">
              Password
            </label>
            <input
              {...register('password', {
                required: 'Password is required.',
                minLength: { value: 6, message: 'Min. 6 chars.' },
              })}
              type="password"
              placeholder="••••••••"
              className={inputCls}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-400">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xs font-semibold tracking-widest uppercase text-amber-400/80">
              Role
            </label>
            <select
              {...register('role')}
              className={`${inputCls} cursor-pointer`}
            >
              <option value="Player">Player</option>
              <option value="Game_Master">Game Master</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-black text-xs tracking-[0.2em] uppercase hover:from-amber-400 hover:to-orange-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'REGISTERING…' : 'CLAIM YOUR KEY'}
          </button>
          <p className="text-center text-neutral-600 text-xs font-mono pt-1">
            Already have access?{' '}
            <Link
              to="/login"
              className="text-amber-400/80 hover:text-amber-400 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
