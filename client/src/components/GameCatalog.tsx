import { useSearchParams } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import GameCard from './GameCard';

// --- מצב פיתוח עם נתונים מדומים (Mock) ---
const GAMES_PER_PAGE = 6;

function GameCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(mockGames.length / GAMES_PER_PAGE);
  const startIndex = (currentPage - 1) * GAMES_PER_PAGE;
  const games = mockGames.slice(startIndex, startIndex + GAMES_PER_PAGE);

  const goToPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', page.toString());
      return next;
    });
  };

  // --- מצב חיבור לשרת האמיתי עם TanStack Query (להפעיל בשעה האחרונה) ---
  // import { useQuery } from '@tanstack/react-query';
  // import { fetchGames } from '../services/api';
  //
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['games', currentPage],
  //   queryFn: () => fetchGames(currentPage),
  // });
  //
  // if (isLoading) return <div className="status-message">טוען משחקים...</div>;
  // if (isError || !data) return <div className="status-message">שגיאה בטעינת הנתונים מהשרת.</div>;
  //
  // const games = data.data;
  // const totalPages = data.pagination.pages;

  return (
    <div className="min-h-screen bg-[#0b0a10] bg-[radial-gradient(ellipse_at_top,_#241a30_0%,_#0b0a10_55%)] px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        {/* כותרת */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-3xl tracking-widest">🕯️ &nbsp; 🗝️ &nbsp; 🕯️</p>
          <h1 className="font-heading text-4xl font-black text-amber-300 sm:text-5xl [text-shadow:0_0_25px_rgba(245,158,11,0.45)]">
            קטלוג חדרי בריחה
          </h1>
          <p className="mt-3 text-gray-500">בחרו חדר, אם תעזו להיכנס...</p>
        </div>

        {/* גריד הכרטיסיות */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>

        {/* פגינציה */}
        <div className="mt-14 flex items-center justify-center gap-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 transition-all duration-200 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-amber-700/50 disabled:hover:shadow-none"
          >
            ← הקודם
          </button>

          <span className="font-heading text-lg font-bold text-amber-400">
            עמוד {currentPage} מתוך {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer rounded-lg border border-amber-700/50 bg-[#1c1722] px-6 py-2 font-bold text-amber-300 transition-all duration-200 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-amber-700/50 disabled:hover:shadow-none"
          >
            הבא →
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameCatalog;
