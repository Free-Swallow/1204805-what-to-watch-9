import {MyListButtonProps} from '../../types/components';
import {useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {pushFavoriteMovie} from '../../store/api-actions';
import {getAuthStatus} from '../../store/user-process/selectors';

function MyListButtonComponent({id, isFavorite}: MyListButtonProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangeFavorite = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }

    const status: number = isFavorite ? 0 : 1;
    dispatch(pushFavoriteMovie({id: Number(id), favoriteStatus: status}));
  };

  return (
    <button data-testid="my-list-button" onClick={handleChangeFavorite} className="btn btn--list film-card__button" type="button">
      {isFavorite ? (
        <svg data-testid="in-list" viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg data-testid="add" viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      )}
      <span>My list</span>
    </button>
  );
}

export default MyListButtonComponent;
