import {Ratings} from './types/movies';

enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/films/:id/review',
  Player = '/player',
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
  Review = '/review',
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
  Similar = '/similar',
  Comments = '/comments',
  Favorite = '/favorite',
  Review = '/review',
  Reviews = '/reviews',
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

const enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Content = 'CONTENT',
}

const defaultGenre = 'All genres';
const MIN_MOVIES_SIMILAR = 0;
const MAX_MOVIES_SIMILAR = 4;
const RATING_DEFAULT = 0;
const COMMENT_MAX_LENGTH = 400;
const COMMENT_MIN_LENGTH = 50;
const MIN_COMMENT = 0;
const INTERVAL_START_VIDEO = 1000;
const BACKEND_URL = 'https://9.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;
const STEP_MOVIES_SHOW = 8;
const CURRENT_TIME_MOVIE = 0;

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
  COMMENT_MIN_LENGTH,
  MIN_COMMENT,
  INTERVAL_START_VIDEO,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  NameSpace,
  STEP_MOVIES_SHOW,
  CURRENT_TIME_MOVIE
};
