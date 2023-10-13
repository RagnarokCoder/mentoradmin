import Http from './http';

class AdminService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('admin/roles', params);
  createUser = (body) => this.http.post('admin/users', body);
  createRoles = (id, body) => this.http.post(`admin/users/${id}/roles`, body);
  deleteRoles = (id) => this.http.del(`admin/users/${id}/roles`);
  fetchRole = (id, params) => this.http.get(`admin/users/${id}/roles`, params);
  giveSubscription = (id, params) =>
    this.http.post(`admin/users/${id}/subscriptions`, params);
}

export default AdminService;
