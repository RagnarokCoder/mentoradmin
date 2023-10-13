import {actions} from '../actions/users';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  users: null,
  usersDeleted: null,
  user: null,
  isPermissions: false,
  roles: [],
  pictureUrl: '',
  page: 1,
  size: 10,
  pageDelete: 1,
  sizeDelete: 10,
});

const users = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USERS_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_USERS_FAILED:
      return {...state, status: getErrorStatus(action.err), users: null};
    case actions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        users: action.result,
      };
    case actions.FETCH_USER_BY_EXTERNAL_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_USER_BY_EXTERNAL_ID_FAILED:
      return {...state, status: getErrorStatus(action.err), user: null};
    case actions.FETCH_USER_BY_EXTERNAL_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        user: action.result,
      };
    case actions.FETCH_USERS_DELETED_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_USERS_DELETED_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_USERS_DELETED_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        usersDeleted: action.result,
      };
    case actions.FETCH_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_USER_FAILED:
      return {...state, status: getErrorStatus(action.err), user: null};
    case actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        user: action.result,
      };
    case actions.CREATE_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_USER_FAILED:
      return {
        ...state,
        status: getErrorStatus(action.err),
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.DELETE_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.DELETE_USER_FAILED:
      return {
        ...state,
        status: getErrorStatus(action.err),
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.EDIT_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.EDIT_USER_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        user: action.result,
      };
    case actions.SET_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.SET_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.SET_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        user: action.result,
      };
    case actions.FETCH_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        pictureUrl: action.result,
      };
    case actions.GET_ROLES:
      return {...state, roles: action.roles};
    case actions.SET_PERMISSIONS:
      return {
        ...state,
        status: getStartStatus(),
        isPermissions: action.permissions,
      };
    case actions.CHANGE_PAGE:
      return {...state, page: action.page};
    case actions.CHANGE_SIZE:
      return {...state, size: action.size};
    case actions.CHANGE_PAGE_DELETE:
      return {...state, pageDelete: action.page};
    case actions.CHANGE_SIZE_DELETE:
      return {...state, sizeDelete: action.size};
    default:
      return state;
  }
};

export default users;
