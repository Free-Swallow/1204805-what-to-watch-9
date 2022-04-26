import {Movie, MoviesData} from './movies';
import {RouteProps} from 'react-router-dom';
import {AuthorizationStatus} from '../const';

type MovieCardProps = {
  movie: Movie;
}

type MoviesListProps = {
  movies: MoviesData;
}

type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

type TabsMoviesListProps = {
  genres: string[];
}

type VideoPlayerProps = {
  isPlaying: boolean;
  src: string;
  srcPoster: string;
}

type MyListButtonProps = {
  id: number;
  isFavorite: boolean;
}

export type {
  MovieCardProps,
  MoviesListProps,
  PrivateRouteProps,
  TabsMoviesListProps,
  VideoPlayerProps,
  MyListButtonProps
};
