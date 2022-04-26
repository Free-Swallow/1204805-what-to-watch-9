import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route-component/history-route-component';
import CommentComponent from './comment-component';
import {makeFakeComment} from '../../utils/mocks';

const mockComment = makeFakeComment();

describe('Component: comment.', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {user: {name}, rating, comment} = mockComment;
    const convertTime = 'February 14, 2022';

    render(
      <HistoryRouter history={history}>
        <CommentComponent commentData={mockComment} />
      </HistoryRouter>,
    );

    const commentElement = screen.getByText(comment);
    const dateElement = screen.getByText(convertTime);
    const ratingElement = screen.getByText(rating);
    const nameElement = screen.getByText(name);

    expect(commentElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
