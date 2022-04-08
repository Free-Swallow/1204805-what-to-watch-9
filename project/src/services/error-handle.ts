import request from 'axios';
import {ErrorType} from '../types/error';
import {HttpCode} from '../const';
import {toast} from 'react-toastify';

const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.error(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.info(response.data.error);
        break;
      case HttpCode.NotFound:
        toast.warning(response.data.error);
        break;
    }
  }
};

export {errorHandle};
