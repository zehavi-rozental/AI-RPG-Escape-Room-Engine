import { Routes, Route } from 'react-router-dom';
import GameCatalog from './components/GameCatalog';
import GamePage from './components/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GameCatalog />} />
      <Route path="/games/:id" element={<GamePage />} />
    </Routes>
  );
}

export default App;
