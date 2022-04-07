enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Overview = '/overview',
  Details = '/details',
  Reviews = '/reviews'
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
}

enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

const basicGenre = 'All genres';
const TIMEOUT_SHOW_ERROR = 2000;

export {AppRoute, AuthorizationStatus, basicGenre, APIRoute, TIMEOUT_SHOW_ERROR, HTTP_CODE};
