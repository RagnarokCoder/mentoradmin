import BaseActions from './base';

export const actions = new BaseActions(
  'picks',
  [
    'FETCH_SUBSCRIPTION_COMPETITION',
    'FETCHING_SUBSCRIPTION_COMPETITION',
    'CHANGE_PAGE',
    'CHANGE_PAGE_DRAFT',
    'CHANGE_SIZE',
    'CHANGE_SIZE_DRAFT',
    'CHANGE_PAGE_WITH_ANALYSIS',
    'CHANGE_PAGE_WITHOUT_ANALYSIS',
    'CHANGE_SIZE_WITH_ANALYSIS',
    'CHANGE_SIZE_WITHOUT_ANALYSIS',
    'CHANGE_SUBSCRIPTION',
    'CHANGE_SUBSCRIPTION_BETTING_CONTROL',
  ],
  [
    'FETCH',
    'FETCH_DRAFT',
    'FETCH_CONTROLLED',
    'FETCH_NO_CONTROLLED',
    'FETCH_BY_ID',
    'CREATE',
    'UPDATE',
    'DELETE',
    'FETCH_BETTING_CONTROL',
    'CREATE_BETTING_CONTROL',
    'UPDATE_BETTING_CONTROL',
  ],
);

export const fetch = (params) => ({type: actions.FETCH, params});
export const fetchDraft = (params) => ({type: actions.FETCH_DRAFT, params});
export const fetchControlled = (params) => ({
  type: actions.FETCH_CONTROLLED,
  params,
});
export const fetchNoControlled = (params) => ({
  type: actions.FETCH_NO_CONTROLLED,
  params,
});
export const fetchById = (id) => ({type: actions.FETCH_BY_ID, id});
export const create = (params) => ({type: actions.CREATE, params});
export const update = (id, params) => ({type: actions.UPDATE, id, params});
export const remove = (id) => ({type: actions.DELETE, id});
export const fetchBettingControl = (id, params) => ({
  type: actions.FETCH_BETTING_CONTROL,
  id,
  params,
});
export const createBettingControl = (id, params) => ({
  type: actions.CREATE_BETTING_CONTROL,
  id,
  params,
});
export const updateBettingControl = (id, params) => ({
  type: actions.UPDATE_BETTING_CONTROL,
  id,
  params,
});
export const fetchSubscriptionCompetition = (
  subscriptionId,
  competitionId,
) => ({
  type: actions.FETCH_SUBSCRIPTION_COMPETITION,
  subscriptionId,
  competitionId,
});
export const fetchingSubcriptionCompetition = (complete) => ({
  type: actions.FETCHING_SUBSCRIPTION_COMPETITION,
  complete,
});
export const changePage = (page) => ({
  type: actions.CHANGE_PAGE,
  page,
});
export const changeSize = (size) => ({
  type: actions.CHANGE_SIZE,
  size,
});
export const changePageDraft = (page) => ({
  type: actions.CHANGE_PAGE_DRAFT,
  page,
});
export const changeSizeDraft = (size) => ({
  type: actions.CHANGE_SIZE_DRAFT,
  size,
});
export const changeSubscription = (subscription) => ({
  type: actions.CHANGE_SUBSCRIPTION,
  subscription,
});
export const changePageWithAnalisys = (page) => ({
  type: actions.CHANGE_PAGE_WITH_ANALYSIS,
  page,
});
export const changePageWithOutAnalisys = (page) => ({
  type: actions.CHANGE_PAGE_WITHOUT_ANALYSIS,
  page,
});
export const changeSizeWithAnalisys = (size) => ({
  type: actions.CHANGE_SIZE_WITH_ANALYSIS,
  size,
});
export const changeSizeWithOutAnalisys = (size) => ({
  type: actions.CHANGE_SIZE_WITHOUT_ANALYSIS,
  size,
});
export const changeSubscriptionBettingControl = (subscription) => ({
  type: actions.CHANGE_SUBSCRIPTION_BETTING_CONTROL,
  subscription,
});
