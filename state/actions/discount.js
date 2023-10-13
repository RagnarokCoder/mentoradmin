import BaseActions from './base';

export const actions = new BaseActions(
  'discount',
  ['SET_DEFAULT_STATE', 'CHANGE_PAGE', 'CHANGE_SIZE'],
  [
    'FETCH',
    'FETCH_MORE',
    'FETCH_BY_ID',
    'CREATE_USER_DISCOUNT',
    'CREATE_SUBSCRIPTION_DISCOUNT',
    'CREATE_ALL_DISCOUNT',
    'ADD_PICTURE',
  ],
);

export const fetch = (params) => ({type: actions.FETCH, params});
export const fetchMore = (params) => ({type: actions.FETCH_MORE, params});
export const fetchById = (id) => ({type: actions.FETCH, id});
export const createUserDiscount = (params) => ({
  type: actions.CREATE_USER_DISCOUNT,
  params,
});
export const createSubscriptionDiscount = (params) => ({
  type: actions.CREATE_SUBSCRIPTION_DISCOUNT,
  params,
});
export const createAllDiscount = (params) => ({
  type: actions.CREATE_ALL_DISCOUNT,
  params,
});
export const setDefaultState = () => ({type: actions.SET_DEFAULT_STATE});
export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
export const addPicture = (id, params) => ({
  type: actions.ADD_PICTURE,
  id,
  params,
});
