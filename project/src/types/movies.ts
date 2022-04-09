type Movie = {
  id: number
  name: string
  posterImage: string
  previewImage: string
  backgroundImage: string
  backgroundColor: string
  videoLink: string
  previewVideoLink: string
  description: string
  rating: number
  scoresCount: number
  director: string
  starring: string[]
  runTime: number
  genre: string
  released: number
  isFavorite: boolean
};

type MoviesData = Movie[];

type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

type CommentsData = Comment[];

type FavoriteMovie = {
  id: number;
  favoriteStatus: number;
};

type CommentUser = {
  id: number;
  comment: string;
  rating: number;
};

type Rating = {
  rating: number;
}

type Ratings = Rating[];

export type {Movie, MoviesData, Comment, CommentsData, FavoriteMovie, CommentUser, Rating, Ratings};
