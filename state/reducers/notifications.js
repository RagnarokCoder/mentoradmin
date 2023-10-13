import {actions} from '../actions/notifications';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  notifications: [],
  page: 1,
  size: 50,
});

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        notifications: action.result,
      };
    case actions.CREATE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CREATE_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_USER_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CHANGE_PAGE:
      return {...state, page: action.page};
    case actions.CHANGE_SIZE:
      return {...state, size: action.size};
    default:
      return state;
  }
};

export default notifications;
