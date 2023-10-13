import {actions} from '../actions/report';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  reportsResolved: null,
  reportsUnResolved: null,
  report: null,
  pageSizeResolved: 50,
  pagePageResolved: 1,
  pageSizeNoResolved: 50,
  pagePageNoResolved: 1,
});

const report = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_RESOLVED_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_RESOLVED_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_RESOLVED_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        reportsResolved: action.result,
      };
    case actions.FETCH_NO_RESOLVED_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_NO_RESOLVED_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_NO_RESOLVED_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        reportsUnResolved: action.result,
      };
    case actions.FETCH_BY_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_BY_ID_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        report: action.result,
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
    case actions.EDIT_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.EDIT_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.EDIT_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CHANGE_PAGE_RESOLVED:
      return {...state, pagePageResolved: action.page};
    case actions.CHANGE_SIZE_RESOLVED:
      return {...state, pageSizeResolved: action.size};
    case actions.CHANGE_PAGE_NO_RESOLVED:
      return {...state, pagePageNoResolved: action.page};
    case actions.CHANGE_SIZE_NO_RESOLVED:
      return {...state, pageSizeNoResolved: action.size};
    default:
      return state;
  }
};

export default report;
