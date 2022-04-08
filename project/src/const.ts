import {Ratings} from './types/movies';

enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/films/:id/review',
  Player = '/player/:id/*',
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  similar = '/similar',
  comments = '/comments',
  favorite = '/favorite',
  review = '/review',
  reviews = '/reviews',
}

enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

enum RatingText {
  Bad = 'bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

enum RatingNumber {
  Bad = 3,
  Normal = 5,
  Good = 8,
  VeryGood = 9,
  Awesome = 10,
}

const ratings: Ratings = [
  {
    rating: 10,
  },
  {
    rating: 9,
  },
  {
    rating: 8,
  },
  {
    rating: 7,
  },
  {
    rating: 6,
  },
  {
    rating: 5,
  },
  {
    rating: 4,
  },
  {
    rating: 3,
  },
  {
    rating: 2,
  },
  {
    rating: 1,
  },
];

const defaultGenre = 'All genres';
const MIN_MOVIES_SIMILAR = 0;
const MAX_MOVIES_SIMILAR = 4;
const RATING_DEFAULT = 0;
const COMMENT_MAX_LENGTH = 400;
const COMMENT_MIN_LENGTH = 50;

export {
  AppRoute,
  AuthorizationStatus,
  defaultGenre,
  APIRoute,
  HttpCode,
  MIN_MOVIES_SIMILAR,
  MAX_MOVIES_SIMILAR,
  RatingText,
  RatingNumber,
  RATING_DEFAULT,
  ratings,
  COMMENT_MAX_LENGTH,
  COMMENT_MIN_LENGTH
};
