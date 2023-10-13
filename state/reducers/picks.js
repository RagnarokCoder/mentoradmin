import {actions} from '../actions/picks';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  picks: [],
  picksDraft: [],
  picksControlled: [],
  picksNoControlled: [],
  pick: null,
  bettingControl: null,
  complete: false,
  pageSizeDraft: 50,
  pageNumberDraft: 1,
  pageSizeNoDraft: 50,
  pageNumberNoDraft: 1,
  subscriptionSelected: null,
  pageSizeWithAnalisys: 50,
  pageNumberWithAnalisys: 1,
  pageSizeWithOutAnalisys: 50,
  pageNumberWithOutAnalisys: 1,
  subscriptionSelectedBettingControl: null,
});

const picks = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        picks: action.result,
      };
    case actions.FETCH_DRAFT_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_DRAFT_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_DRAFT_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        picksDraft: action.result,
      };
    case actions.FETCH_CONTROLLED_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_CONTROLLED_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_CONTROLLED_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        picksControlled: action.result,
      };
    case actions.FETCH_NO_CONTROLLED_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_NO_CONTROLLED_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_NO_CONTROLLED_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        picksNoControlled: action.result,
      };
    case actions.FETCH_BY_ID_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_BY_ID_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        pick: action.result,
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
    case actions.FETCH_BETTING_CONTROL_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_BETTING_CONTROL_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_BETTING_CONTROL_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        bettingControl: action.result,
      };
    case actions.CREATE_BETTING_CONTROL_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.CREATE_BETTING_CONTROL_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.CREATE_BETTING_CONTROL_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.UPDATE_BETTING_CONTROLL_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.UPDATE_BETTING_CONTROL_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.UPDATE_BETTING_CONTROL_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.FETCHING_SUBSCRIPTION_COMPETITION:
      return {...state, complete: action.complete};
    case actions.CHANGE_PAGE:
      return {...state, pageNumberNoDraft: action.page};
    case actions.CHANGE_SIZE:
      return {...state, pageSizeNoDraft: action.size};
    case actions.CHANGE_PAGE_DRAFT:
      return {...state, pageNumberDraft: action.page};
    case actions.CHANGE_SIZE_DRAFT:
      return {...state, pageSizeDraft: action.size};
    case actions.CHANGE_SUBSCRIPTION:
      return {...state, subscriptionSelected: action.subscription};

    case actions.CHANGE_PAGE_WITH_ANALYSIS:
      return {...state, pageNumberWithAnalisys: action.page};
    case actions.CHANGE_PAGE_WITHOUT_ANALYSIS:
      return {...state, pageNumberWithOutAnalisys: action.page};
    case actions.CHANGE_SIZE_WITH_ANALYSIS:
      return {...state, pageSizeWithAnalisys: action.size};
    case actions.CHANGE_SIZE_WITHOUT_ANALYSIS:
      return {...state, pageSizeWithOutAnalisys: action.size};
    case actions.CHANGE_SUBSCRIPTION_BETTING_CONTROL:
      return {
        ...state,
        subscriptionSelectedBettingControl: action.subscription,
      };
    default:
      return state;
  }
};

export default picks;
