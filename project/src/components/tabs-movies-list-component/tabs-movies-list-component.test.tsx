import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route-component/history-route-component';
import TabsMoviesListComponent from './tabs-movies-list-component';
import {defaultGenre} from '../../const';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';

const kindList = ['All genres', 'Horror', 'Musical', 'Comedy', 'History'];
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  CONTENT: {
    genre: defaultGenre,
  },
});

describe('Component: tabs movies list', () => {
  it('Should correctly render.', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TabsMoviesListComponent genres={kindList} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/Horror/i)).toBeInTheDocument();
    expect(screen.getByText(/Musical/i)).toBeInTheDocument();
    expect(screen.getByText(/Comedy/i)).toBeInTheDocument();
    expect(screen.getByText(/History/i)).toBeInTheDocument();
  });

  it('Should change kind when user clicked on tab.', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TabsMoviesListComponent genres={kindList} />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Comedy/i));

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(1, {
      payload: 'Comedy',
      type: 'CONTENT/changeGenre',
    });
    expect(dispatch).nthCalledWith(2, {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });

    userEvent.click(screen.getByText(/Musical/i));

    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).nthCalledWith(3, {
      payload: 'Musical',
      type: 'CONTENT/changeGenre',
    });
    expect(dispatch).nthCalledWith(4, {
      payload: undefined,
      type: 'CONTENT/resetMoviesCount',
    });
  });
});
