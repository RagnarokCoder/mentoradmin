import {defaultLanguageCode} from '../../utils/constants';

export const selectSubscriptions = (state) => {
  const _data = [];
  state.subscriptions?.subscriptions?.data.forEach((i) => {
    const translation = i.translations.find(
      (t) => t.language === defaultLanguageCode,
    );
    _data.push({...translation, translationId: i.id, ...i});
  });
  return {...state.subscriptions?.subscriptions, data: _data};
};
export const selectSubscription = (state) => state.subscriptions.subscription;
export const selectSubscriptionStatus = (state) => state.subscriptions.status;
export const selectSize = (state) => state.subscriptions.size;
export const selectPage = (state) => state.subscriptions.page;
