import Http from './http';

class PicksService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('picks', params);
  fetchById = (id) => this.http.get(`picks/${id}`);
  create = (params) => this.http.post('picks', params);
  update = (id, params) => this.http.put(`picks/${id}`, params);
  delete = (id) => this.http.del(`picks/${id}`, undefined, 'nothing');
  fetchBettingControl = (id, params) =>
    this.http.get(`picks/${id}/bettingcontrol`, params);
  createBettingControl = (id, params) =>
    this.http.post(`picks/${id}/bettingcontrol`, params, 'nothing');
  updateBettingControl = (id, params) =>
    this.http.put(`picks/${id}/bettingcontrol`, params, 'nothing');
}

export default PicksService;
