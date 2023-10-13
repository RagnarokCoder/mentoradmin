import {actions} from '../actions/subscriptions';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  subscriptions: null,
  subscription: null,
  page: 1,
  size: 50,
});

const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        subscriptions: action.result,
      };
    case actions.FETCH_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_ID_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        subscription: action.result,
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
    case actions.UPDATE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.UPDATE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.UPDATE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.DELETE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.DELETE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.DELETE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.ADD_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.ADD_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.ADD_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.ORDER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.ORDER_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.ORDER_SUCCESS:
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
export default subscriptions;
