import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import ButtonShowMoreComponent from './button-show-more-component';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: button "Show More"', () => {
  it('should correctly render', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <ButtonShowMoreComponent />
        </HistoryRouter>
      </Provider>,
    );

    const buttonElement = screen.getByText('Show more');

    expect(buttonElement).toBeInTheDocument();
  });

  it('should call changeMoviesCount when user clicked button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={mockStore()}>
        <HistoryRouter history={history}>
          <ButtonShowMoreComponent />
        </HistoryRouter>
      </Provider>,
    );

    const buttonElement = screen.getByText('Show more');

    userEvent.click(buttonElement);

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith({type: 'CONTENT/changeMoviesCount'});
  });
});
