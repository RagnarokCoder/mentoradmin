import {actions} from '../actions/discount';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  discounts: null,
  discount: null,
  page: 1,
  size: 50,
});

const discount = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        discounts: action.result,
      };
    case actions.FETCH_MORE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_MORE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_MORE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        discounts: {
          ...action.result,
          data: [...state.discounts?.data, ...action.result?.data],
        },
      };
    case actions.FETCH_BY_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_BY_ID_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        discount: action.result,
      };
    case actions.CREATE_USER_DISCOUNT_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_USER_DISCOUNT_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_USER_DISCOUNT_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CREATE_SUBSCRIPTION_DISCOUNT_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_SUBSCRIPTION_DISCOUNT_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_SUBSCRIPTION_DISCOUNT_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CREATE_ALL_DISCOUNT_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_ALL_DISCOUNT_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_ALL_DISCOUNT_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.ADD_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.ADD_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.ADD_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.SET_DEFAULT_STATE:
      return {...state, status: getDefaultStatus()};
    case actions.CHANGE_PAGE:
      return {...state, page: action.page};
    case actions.CHANGE_SIZE:
      return {...state, size: action.size};
    default:
      return state;
  }
};

export default discount;
