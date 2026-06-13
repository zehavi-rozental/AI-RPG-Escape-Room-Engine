import { useSearchParams } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import GameCard from './GameCard';
import './GameCatalog.css';

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
    <div className="catalog-page">
      <h1 className="catalog-title">קטלוג חדרי בריחה</h1>

      <div className="catalog-grid">
        {games.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          הקודם
        </button>
        <span>
          עמוד {currentPage} מתוך {totalPages}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          הבא
        </button>
      </div>
    </div>
  );
}

export default GameCatalog;
