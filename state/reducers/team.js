import {actions} from '../actions/team';
import {
  getDefaultStatus,
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helpers';

const initialState = Object.freeze({
  status: getDefaultStatus(),
  teams: null,
  team: null,
  page: 1,
  size: 50,
});

const team = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        teams: action.result,
      };
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        team: action.result,
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
    case actions.DELETE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.DELETE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.ADD_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.ADD_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.ADD_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CHANGE_PAGE:
      return {...state, page: action.page};
    case actions.CHANGE_SIZE:
      return {...state, size: action.size};
    default:
      return state;
  }
};

export default team;
