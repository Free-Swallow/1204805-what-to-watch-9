import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';

const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export {getAuthStatus};
