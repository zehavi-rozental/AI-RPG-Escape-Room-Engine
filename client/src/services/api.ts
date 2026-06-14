import axios from 'axios';
import type { GamesResponse } from '../types/GameRoom';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchGames = async (page: number): Promise<GamesResponse> => {
  const response = await axios.get<GamesResponse>(
    `${API_BASE_URL}/escaperooms`,
    {
      params: { page },
    }
  );
  return response.data;
};
