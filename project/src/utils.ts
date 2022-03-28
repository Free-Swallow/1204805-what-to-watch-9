import {MoviesData} from './types/movies';

function getTimeFromMins(mins: number) {
  const time = [];
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  time.push(hours, minutes);

  if (time[0] === 0) {
    return `${time[1]} m`;
  }

  return `${time[0]} h ${time[1]}  m`;
}

function getSimilarMovies(movies: MoviesData, genre: string): MoviesData {
  const moviesFiltered = [];
  const NUMBER_OF_MOVIES = 4;

  for (const movie of movies) {
    if (movie.genre === genre) {
      moviesFiltered.push(movie);
    }

    if (moviesFiltered.length === NUMBER_OF_MOVIES) {
      break;
    }
  }

  return moviesFiltered;
}

export {getTimeFromMins, getSimilarMovies};
