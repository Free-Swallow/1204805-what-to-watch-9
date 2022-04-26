import {useAppDispatch} from '../../hooks';
import {changeMoviesCount} from '../../store/content-process/content-process';

function ButtonShowMoreComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeMoviesCount());
  };

  return (
    <div className="catalog__more">
      <button onClick={handleClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ButtonShowMoreComponent;
