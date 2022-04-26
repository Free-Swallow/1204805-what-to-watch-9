import {AuthorizationStatus} from '../const';

function getTimeFromMins(mins: number) {
  const time = [];
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  time.push(hours, minutes);

  if (time[0] === 0) {
    return `${time[1]} m`;
  }

  return `${time[0]} h ${time[1]} m`;
}

const isCheckAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export {getTimeFromMins, isCheckAuth};
