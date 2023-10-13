import {actions} from '../actions/admin';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  roles: [],
  role: [],
  createUserSuccess: null,
});

const language = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        roles: action.result,
      };
    case actions.CREATE_USER_REQUEST:
      return {...state, status: getStartStatus(), createUserSuccess: null};
    case actions.CREATE_USER_FAILED:
      return {
        ...state,
        status: getErrorStatus(action.err),
        createUserSuccess: false,
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        createUserSuccess: true,
      };
    case actions.CREATE_ROLE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_ROLE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.DELETE_ROLE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.DELETE_ROLE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.DELETE_ROLE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.FETCH_ROLE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_ROLE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        role: action.result,
      };
    case actions.SET_CREATE_USER_STATUS:
      return {...state, createUserSuccess: null};
    case actions.GIVE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.GIVE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.GIVE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    default:
      return state;
  }
};

export default language;
