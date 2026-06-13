import { Link } from 'react-router-dom';
import type { GameRoom } from '../types/GameRoom';

interface GameCardProps {
  game: GameRoom;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-amber-900/40 bg-gradient-to-b from-[#1c1722] to-[#0c0a10] shadow-lg shadow-black/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-900/30">
      {/* תמונה */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a10] via-black/10 to-transparent" />

        {/* תגית קטגוריה - כמו חותמת שעווה */}
        <span className="absolute top-3 right-3 rounded-full border border-amber-500/60 bg-black/70 px-3 py-1 text-xs font-bold text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] backdrop-blur-sm">
          {game.category}
        </span>
      </div>

      {/* תוכן */}
      <div className="flex flex-1 flex-col gap-3 p-5 text-right">
        <h3 className="font-heading text-xl font-bold text-amber-100 [text-shadow:0_0_12px_rgba(245,158,11,0.35)]">
          {game.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-gray-400">
          {game.storyBackground}
        </p>

        <Link
          to={`/games/${game._id}`}
          className="mt-2 block w-full cursor-pointer rounded-lg border border-amber-600/50 bg-gradient-to-r from-amber-700 via-orange-700 to-red-800 py-2.5 text-center font-bold text-amber-50 shadow-md transition-all duration-300 hover:shadow-[0_0_22px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-95"
        >
          🔒 לכניסה למשחק
        </Link>
      </div>

      {/* זוהר עליון בריחוף */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent transition-all duration-500 group-hover:via-amber-500/80" />
    </div>
  );
}

export default GameCard;
