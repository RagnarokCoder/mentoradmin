import {actions} from '../actions/language';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  languages: [],
});

const language = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_LANGUAGES_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_LANGUAGES_FAILED:
      return {...state, status: getErrorStatus(action.err), languages: []};
    case actions.FETCH_LANGUAGES_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        languages: action.result,
      };
    default:
      return state;
  }
};

export default language;
