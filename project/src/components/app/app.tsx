import MainStartComponent from '../main-start-component/main-start-component';
// import SignInComponent from '../sign-in-components/sign-in-component';
// import MyListComponent from '../my-list-component/my-list-component';
// import MoviePageComponent from '../movie-page-component/movie-page-component';
// import AddReviewComponent from '../add-review-component/add-review-component';
// import PlayerComponent from '../player-component/player-component';

type AppProps = {
  movieName: string;
  movieRelease: number;
  movieKind: string;
}

function App({movieName, movieRelease, movieKind}: AppProps): JSX.Element {
  return (
    <MainStartComponent movieName={movieName} movieRelease={movieRelease} movieKind={movieKind} />
    // <SignInComponent />
    // <MyListComponent />
    // <MoviePageComponent />
    // <AddReviewComponent />
    // <PlayerComponent />
  );
}

export default App;
