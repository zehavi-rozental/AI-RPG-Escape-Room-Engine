import { useParams, Link } from 'react-router-dom';
import { mockGames } from '../data/mockGames';

function GamePage() {
  const { id } = useParams();
  const game = mockGames.find((g) => g._id === id);

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0b0a10] text-center text-white">
        <h1 className="font-heading text-3xl font-bold text-amber-300">
          החדר לא נמצא
        </h1>
        <Link
          to="/"
          className="rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 hover:border-amber-400"
        >
          ← חזרה לקטלוג
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0b0a10] bg-[radial-gradient(ellipse_at_top,_#241a30_0%,_#0b0a10_55%)] px-4 text-center text-white">
      <p className="text-3xl">🔓</p>
      <h1 className="font-heading text-4xl font-black text-amber-300 [text-shadow:0_0_25px_rgba(245,158,11,0.45)]">
        {game.title}
      </h1>
      <p className="max-w-xl text-gray-400">{game.storyBackground}</p>

      <div className="mt-4 rounded-xl border border-amber-700/40 bg-[#1c1722] px-6 py-4 text-amber-200">
        מסך המשחק עצמו (התחברות/הרשמה ולוח החידות) נמצא בבנייה ע"י בת ג' ✨
      </div>

      <Link
        to="/"
        className="mt-4 rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 transition-all hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
      >
        ← חזרה לקטלוג
      </Link>
    </div>
  );
}

export default GamePage;
