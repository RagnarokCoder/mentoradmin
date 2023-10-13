import Http from './http';

class SubscriptionsService {
  constructor(token) {
    this.http = new Http(token);
  }
  fetchSubscriptions = (query) => this.http.get('subscriptions', query);
  fetchSubscriptionDetail = (id) => this.http.get(`subscriptions/${id}`);
  createSubscription = (params) => this.http.post('subscriptions', params);
  editSubscription = (id, params) =>
    this.http.put(`subscriptions/${id}`, params);
  deleteSubscription = (id) =>
    this.http.del(`subscriptions/${id}`, undefined, 'nothing');
  addPictureSubscription = (id, params) =>
    this.http.putFile(`subscriptions/${id}/picture`, params, 'Picture');
  orderSubscription = (params) =>
    this.http.put('subscriptions/order', params, 'nothing');
}

export default SubscriptionsService;
