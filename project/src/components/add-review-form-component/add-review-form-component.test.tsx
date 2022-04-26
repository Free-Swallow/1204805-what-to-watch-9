import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route-component/history-route-component';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import AddReviewFormComponent from './add-review-form-component';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: add review form', () => {
  it('should correctly render.', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    const store = mockStore({
      DATA: {isCommentPush: false},
    });

    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewFormComponent />
        </HistoryRouter>
      </Provider>,
    );

    const buttonRatingFive = screen.getByTestId('ratings-5');
    const textareaElement = screen.getByTestId('textarea');
    const buttonElement = screen.getByTestId('add-review-button');

    expect(buttonRatingFive).toBeInTheDocument();
    expect(textareaElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    userEvent.type(textareaElement, 'User-review');

    expect(screen.getByDisplayValue(/User-review/i)).toBeInTheDocument();

    userEvent.click(buttonElement);

    expect(useDispatch).toBeCalledTimes(12);
  });
});
