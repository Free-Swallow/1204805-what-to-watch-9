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

export type {Movie, MoviesData, Comment, CommentsData};
