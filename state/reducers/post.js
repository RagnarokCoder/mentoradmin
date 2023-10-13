import {actions} from '../actions/post';
import {
  getErrorStatus,
  getSuccessStatus,
  getStartStatus,
  getDefaultStatus,
} from '../helpers';

export const initialState = Object.freeze({
  status: getDefaultStatus(),
  posts: null,
  postsByUser: null,
  post: null,
  pageSizeAll: 50,
  pagePageAll: 1,
  pageSizeUser: 50,
  pagePageUser: 1,
});

const post = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        posts: action.result,
      };
    case actions.FETCH_MORE_POST_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_MORE_POST_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_MORE_POST_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        posts: {
          ...action.result,
          data: [...state.posts?.data, ...action.result?.data],
        },
      };
    case actions.FETCH_BY_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_BY_USER_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_BY_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        postsByUser: action.result,
      };
    case actions.FETCH_MORE_POST_BY_USER_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.FETCH_MORE_POST_BY_USER_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.FETCH_MORE_POST_BY_USER_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
        postsByUser: {
          ...action.result,
          data: [...state.postsByUser?.data, ...action.result?.data],
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
        post: action.result,
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
    case actions.ADD_LIKE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.ADD_LIKE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.ADD_LIKE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.REMOVE_LIKE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.REMOVE_LIKE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.REMOVE_LIKE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.REMOVE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.REMOVE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.REMOVE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.SET_PICTURE_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.SET_PICTURE_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.SET_PICTURE_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.NOTIFY_REQUEST:
      return {...state, status: getStartStatus()};
    case actions.NOTIFY_FAILED:
      return {...state, status: getErrorStatus(action.err)};
    case actions.NOTIFY_SUCCESS:
      return {
        ...state,
        status: getSuccessStatus(),
      };
    case actions.CHANGE_PAGE_USER:
      return {...state, pagePageUser: action.page};
    case actions.CHANGE_SIZE_USER:
      return {...state, pageSizeUser: action.size};
    case actions.CHANGE_PAGE_ALL:
      return {...state, pagePageAll: action.page};
    case actions.CHANGE_SIZE_ALL:
      return {...state, pageSizeAll: action.size};
    default:
      return state;
  }
};

export default post;
