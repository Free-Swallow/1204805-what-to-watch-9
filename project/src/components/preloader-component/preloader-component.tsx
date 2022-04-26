const preloaderTitle = 'loading';

function PreloaderComponent(): JSX.Element {
  return (
    <div className="loader">{preloaderTitle}</div>
  );
}

export default PreloaderComponent;
export {preloaderTitle};
