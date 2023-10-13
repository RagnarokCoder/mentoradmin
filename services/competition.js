import Http from './http';

class CompetitionService {
  constructor(token) {
    this.http = new Http(token);
  }
  fetch = (params) => this.http.get('competitions', params);
  fetchById = (id) => this.http.get(`competitions/${id}`);
  create = (params) => this.http.post('competitions', params);
  update = (id, params) => this.http.put(`competitions/${id}`, params);
  remove = (id) => this.http.del(`competitions/${id}`, undefined, 'nothing');
}

export default CompetitionService;
