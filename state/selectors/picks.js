export const selectPicksStatus = (state) => state.picks.status;
export const selectPicks = (state) => state.picks.picks;
export const selectBettingControl = (state) => state.picks.bettingControl;
export const selectPicksDraft = (state) => state.picks.picksDraft;
export const selectPicksControlled = (state) => state.picks.picksControlled;
export const selectPicksNoControlled = (state) => state.picks.picksNoControlled;
export const selectPick = (state) => state.picks.pick;
export const selectComplete = (state) => state.picks.complete;
export const selectPageSizeDraft = (state) => state.picks.pageSizeDraft;
export const selectPageNumberDraft = (state) => state.picks.pageNumberDraft;
export const selectPageSizeNoDraft = (state) => state.picks.pageSizeNoDraft;
export const selectPageNumberNoDraft = (state) => state.picks.pageNumberNoDraft;
export const selectSubscriptionSelected = (state) =>
  state.picks.subscriptionSelected;
export const selectPageSizeWithAnalisys = (state) =>
  state.picks.pageSizeWithAnalisys;
export const selectPageNumberWithAnalisys = (state) =>
  state.picks.pageNumberWithAnalisys;
export const selectPageSizeWithOutAnalisys = (state) =>
  state.picks.pageSizeWithOutAnalisys;
export const selectPageNumberWithOutAnalisys = (state) =>
  state.picks.pageNumberWithOutAnalisys;
export const selectSubscriptionSelectedBettingControl = (state) =>
  state.picks.subscriptionSelectedBettingControl;
