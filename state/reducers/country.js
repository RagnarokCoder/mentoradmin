import {actions} from '../actions/country';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  countries: [],
});

const country = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_COUNTRIES_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_COUNTRIES_FAILED:
      return {...state, status: getErrorStatus(action.err), countries: []};
    case actions.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        countries: action.result,
      };
    default:
      return state;
  }
};

export default country;
