import Http from './http';

class NotificationsService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('notifications', params);
  create = (body) => this.http.post('notifications', body);
  createUser = (body) => this.http.post('notifications/tokens', body);
}

export default NotificationsService;
