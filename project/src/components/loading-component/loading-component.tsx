import {loadingComponentStyle} from './loading-component-style';
import PreloaderComponent from '../preloader-component/preloader-component';

const loadingScreenTitle = 'Loading, please wait...';

function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <h1 style={loadingComponentStyle} className="page-title user-page__title">{loadingScreenTitle}</h1>
      </header>
      <PreloaderComponent />
    </div>
  );
}

export default LoadingScreen;
export {loadingScreenTitle};
