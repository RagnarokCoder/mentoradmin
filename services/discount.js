import Http from './http';

class DiscountService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('discounts', params);
  fetchById = (id) => this.http.get(`discounts/${id}`);
  createUserDiscount = (params) => this.http.post('discounts', params);
  createSubscriptionDiscount = (params) =>
    this.http.post('discounts/subscriptions', params);
  createAllDiscount = (params) => this.http.post('discounts/all', params);
  addPicture = (id, uri) =>
    this.http.putFile(`discounts/${id}/picture`, uri, 'Picture');
}

export default DiscountService;
