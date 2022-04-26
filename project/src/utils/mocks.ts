import {image} from 'faker';
import {Movie, Comment, CommentUser, FavoriteMovie} from '../types/movies';

const makeFakeMovie = (): Movie => (
  {
    name: 'The Grand Budapest Hotel',
    posterImage: image.imageUrl(),
    previewImage: image.imageUrl(),
    backgroundImage: image.imageUrl(),
    backgroundColor: '#B6A99F',
    description: 'In an effort to thwart Grindelwalds plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though hes unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.',
    rating: 3.4,
    scoresCount: 160757,
    director: 'David Yates',
    starring: ['Bazuzu', 'Huiii', 'Penis-Dominator'],
    runTime: 134,
    genre: 'Fantasy',
    released: 2018,
    id: 8,
    isFavorite: false,
    videoLink: 'sssss',
    previewVideoLink: 'ssss',
  } as Movie
);

const makeFakeComment = (): Comment => (
  {
    comment: 'string',
    date: '2022-02-13T21:48:13.678Z',
    id: 22,
    rating: 199,
    user: {
      id: 22,
      name: 'Zak',
    },
  } as Comment
);

const makeFakeUserComment = (): CommentUser => (
  {
    id: 11,
    comment: 'string',
    rating: 9.8,
  } as CommentUser
);

const pushFakeFavoriteMovie = (): FavoriteMovie => (
  {
    id: 1,
    favoriteStatus: 0,
  } as FavoriteMovie
);

const Genre = {
  HORROR: 'Horror',
};

export {
  Genre,
  makeFakeMovie,
  makeFakeComment,
  makeFakeUserComment,
  pushFakeFavoriteMovie
};
