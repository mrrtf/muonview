import axios from "axios";

// Middleware to intercept actions which have a request key in their payload
//
// the request itself generate a [type]_REQUEST action
// if the fetching is successfull then [type]_SUCCESS  action is dispatched
// otherwise [type]_FAILURE is dispatched
//

const fetchMiddleware = () => (next) => (action) => {
  if (!action.payload) {
    return next(action);
  }
  if (!action.payload.request) {
    return next(action);
  }

  const makeFetchAction = (baseAction) => ({
    type: `FETCH_${baseAction.type}`,
    payload: {
      url: baseAction.payload.request.url,
      id: baseAction.payload.request.id,
    },
  });
  next(makeFetchAction(action));

  const debugTimeOut = 0;

  return setTimeout(() => {
    axios
      .get(action.payload.request.url)
      .then((response) => {
        const nextAction = {
          type: `RECEIVE_${action.type}`,
          payload: {
            id: action.payload.request.id,
            response: response.data,
          },
        };
        next(nextAction);
      })
      .catch((error) => {
        const nextAction = {
          type: `ERROR_FETCH_${action.type}`,
          payload: {
            id: action.payload.request.id,
            message: error,
          },
        };
        next(nextAction);
      });
  }, debugTimeOut);
};

export default fetchMiddleware;
