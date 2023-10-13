import {actions} from '../actions/userSubscriptionReport';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  file: null,
});

const usersubscriptionreport = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DEFAULT_STATE:
      return {...state, status: getDefaultStatus(), file: null};
    case actions.FETCH:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err), languages: []};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        file: action.result,
      };
    default:
      return state;
  }
};

export default usersubscriptionreport;
