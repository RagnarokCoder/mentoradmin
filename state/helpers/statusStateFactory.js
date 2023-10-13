const UNKNOWN_ERROR_MESSAGE = 'An unknown error occurred.';

export const parseErrorResponse = (error) => {
  if (!error) {
    return UNKNOWN_ERROR_MESSAGE;
  }
  if (!error.response) {
    return error.message || UNKNOWN_ERROR_MESSAGE;
  }
  if (typeof error.response === 'string') {
    return error.response;
  }
  const err = error.response?.errors;
  if (err && typeof err === 'object') {
    for (const key in err) {
      if (err.hasOwnProperty(key) && err[key]?.length) {
        return err[key][0];
      }
    }
  }

  return UNKNOWN_ERROR_MESSAGE;
};

export const getDefaultStatus = () =>
  Object.freeze({
    lastReceivedTime: null,
    isFetching: false,
    isError: false,
    errorMessage: null,
    error: null,
  });

export const getStartStatus = () =>
  Object.freeze({
    isFetching: true,
    isError: false,
    errorMessage: null,
    error: null,
  });

export const getSuccessStatus = (metaData) =>
  Object.freeze({
    lastReceivedTime: new Date(),
    success: true,
    isFetching: false,
    isError: false,
    errorMessage: null,
    error: null,
    metaData,
  });

export const getErrorStatus = (error) =>
  Object.freeze({
    lastReceivedTime: new Date(),
    isFetching: false,
    isError: true,
    errorMessage: parseErrorResponse(error),
    error,
  });
