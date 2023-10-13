import Http from './http';

class UserSubscriptionReport {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('usersubscription/report', params, 'blob');
}

export default UserSubscriptionReport;
