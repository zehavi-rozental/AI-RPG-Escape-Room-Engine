import type { GameRoom } from '../types/GameRoom';
import './GameCard.css';

interface GameCardProps {
  game: GameRoom;
}

function GameCard({ game }: GameCardProps) {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.title} className="game-card-image" />
      <div className="game-card-body">
        <span className="game-card-category">{game.category}</span>
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-description">{game.storyBackground}</p>
        <button className="game-card-button">לכניסה למשחק</button>
      </div>
    </div>
  );
}

export default GameCard;
