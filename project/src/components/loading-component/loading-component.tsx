function LoadingScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <h1 style={{marginTop: '150px', fontSize: '60px'}} className="page-title user-page__title">Loading, please wait...</h1>
      </header>
    </div>
  );
}

export default LoadingScreen;
