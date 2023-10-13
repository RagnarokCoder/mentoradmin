import BaseActions from './base';

export const actions = new BaseActions(
  'post',
  [
    'CHANGE_PAGE_USER',
    'CHANGE_PAGE_ALL',
    'CHANGE_SIZE_USER',
    'CHANGE_SIZE_ALL',
  ],
  [
    'FETCH',
    'FETCH_MORE_POST',
    'CREATE',
    'REMOVE',
    'SET_PICTURE',
    'FETCH_BY_USER',
    'FETCH_MORE_POST_BY_USER',
    'FETCH_BY_ID',
    'ADD_LIKE',
    'REMOVE_LIKE',
    'BANNED_USER',
    'NOTIFY',
  ],
);

export const fetch = (params) => ({type: actions.FETCH, params});
export const remove = (id) => ({type: actions.REMOVE, id});
export const fetchMorePost = (params) => ({
  type: actions.FETCH_MORE_POST,
  params,
});
export const create = (params) => ({type: actions.CREATE, params});
export const fetchByUser = (params) => ({type: actions.FETCH_BY_USER, params});
export const fetchMorePostByUser = (params) => ({
  type: actions.FETCH_MORE_POST_BY_USER,
  params,
});
export const fetchById = (id) => ({type: actions.FETCH_BY_ID, id});
export const addLike = (id, params) => ({type: actions.ADD_LIKE, id, params});
export const removeLike = (id, params) => ({
  type: actions.REMOVE_LIKE,
  id,
  params,
});
export const setPicture = (picture, id) => ({
  type: actions.SET_PICTURE,
  picture,
  id,
});
export const bannedUser = (id) => ({
  type: actions.BANNED_USER,
  id,
});
export const notify = (id, params) => ({
  type: actions.NOTIFY,
  id,
  params,
});
export const changePageUser = (page) => ({
  type: actions.CHANGE_PAGE_USER,
  page,
});
export const changeSizeUser = (size) => ({
  type: actions.CHANGE_SIZE_USER,
  size,
});
export const changePageAll = (page) => ({
  type: actions.CHANGE_PAGE_ALL,
  page,
});
export const changeSizeAll = (size) => ({
  type: actions.CHANGE_SIZE_ALL,
  size,
});
