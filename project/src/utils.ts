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

function getSimilarMovies(movies: MoviesData, genre: string, number = movies.length): MoviesData {
  const moviesFiltered = [];

  for (const movie of movies) {
    if (movie.genre === genre || genre === 'All genres') {
      moviesFiltered.push(movie);
    }

    if (moviesFiltered.length === number) {
      break;
    }
  }

  return moviesFiltered;
}

export {getTimeFromMins, getSimilarMovies};
