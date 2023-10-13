import {actions} from '../actions/sport';
import {
  getDefaultStatus,
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helpers';

const initialState = Object.freeze({
  status: getDefaultStatus(),
  sports: [],
});

const sport = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        sports: action.result,
      };
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    default:
      return state;
  }
};

export default sport;
