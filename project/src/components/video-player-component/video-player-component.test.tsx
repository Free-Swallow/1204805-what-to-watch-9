import {fireEvent, render, screen} from '@testing-library/react';
import VideoPlayerComponent from './video-player-component';

describe('Component: video player.', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('Should render correctly.', () => {
    const isPlay = false;
    const mockUrl = 'testSting';

    render(
      <VideoPlayerComponent isPlaying={isPlay} src={mockUrl} srcPoster={mockUrl} />,
    );

    expect(screen.getByTestId(/video-player/i)).toBeInTheDocument();
  });

  it('Should play or pause video when isPlaying true or false.', () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    const isPlay = false;
    const mockUrl = 'testSting';

    const {rerender} = render(
      <VideoPlayerComponent isPlaying src={mockUrl} srcPoster={mockUrl} />,
    );

    fireEvent(screen.getByTestId(/video-player/i) as Element,
      new Event('loadeddata'));

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    rerender(
      <VideoPlayerComponent isPlaying={isPlay} src={mockUrl} srcPoster={mockUrl} />,
    );

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
