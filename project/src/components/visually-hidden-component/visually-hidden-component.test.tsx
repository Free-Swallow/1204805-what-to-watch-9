import {render, screen} from '@testing-library/react';
import VisuallyHiddenComponent from './visually-hidden-component';

describe('Component: visually hidden.', () => {
  it('Should correctly render.', () => {
    render(
      <VisuallyHiddenComponent />,
    );

    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
  });
});
