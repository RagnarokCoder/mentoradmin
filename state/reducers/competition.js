import {actions} from '../actions/competition';
import {
  getDefaultStatus,
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helpers';

const initialState = Object.freeze({
  status: getDefaultStatus(),
  competitions: null,
  competition: null,
  page: 1,
  size: 50,
});

const competition = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        competitions: action.result,
      };
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        competition: action.result,
      };
    case actions.FETCH_ID_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CREATE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.UPDATE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.UPDATE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.REMOVE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.REMOVE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.REMOVE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CLEAR_COMPETITION:
      return {...state, competition: null};
    case actions.CHANGE_PAGE:
      return {...state, page: action.page};
    case actions.CHANGE_SIZE:
      return {...state, size: action.size};
    default:
      return state;
  }
};

export default competition;
