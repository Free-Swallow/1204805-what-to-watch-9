import {isCheckAuth, getTimeFromMins} from './utils';
import {makeFakeMovie} from './mocks';
import {AuthorizationStatus} from '../const';

const mockMovie = makeFakeMovie();

describe('Function: isCheckAuth', () => {
  it('should return "true" if authorization is unknown', () => {
    expect(isCheckAuth(AuthorizationStatus.Unknown))
      .toBe(true);
  });

  it('should return "false" if authorization is auth', () => {
    expect(isCheckAuth(AuthorizationStatus.Auth))
      .toBe(false);
  });

  it('should return "false" if authorization is noAuth', () => {
    expect(isCheckAuth(AuthorizationStatus.NoAuth))
      .toBe(false);
  });
});

describe('Function: getTimeMins', () => {
  it('should return (2 h 14 m)', () => {
    const {runTime} = mockMovie;
    expect(getTimeFromMins(runTime))
      .toBe('2 h 14 m');
  });

  it('should return "50 m"', () => {
    const runtim = 50;
    expect(getTimeFromMins(runtim))
      .toBe('50 m');
  });
});
