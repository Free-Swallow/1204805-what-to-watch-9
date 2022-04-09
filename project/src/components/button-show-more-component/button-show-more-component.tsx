import {useAppDispatch} from '../../hooks';
import {changeMoviesCount} from '../../store/content-process/content-process';

function ButtonShowMoreComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button onClick={() => {dispatch(changeMoviesCount());}} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ButtonShowMoreComponent;
