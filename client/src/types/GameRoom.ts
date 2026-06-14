export interface GameRoom {
  _id: string;
  title: string;
  storyBackground: string;
  category: string;
  imageUrl: string;
}

export interface GamesResponse {
  data: GameRoom[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
