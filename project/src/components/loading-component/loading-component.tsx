import {loadingComponentStyle} from './loading-component-style';

function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <h1 style={loadingComponentStyle} className="page-title user-page__title">Loading, please wait...</h1>
      </header>
    </div>
  );
}

export default LoadingScreen;
