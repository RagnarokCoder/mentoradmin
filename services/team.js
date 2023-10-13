import Http from './http';

class TeamService {
  constructor(token) {
    this.http = new Http(token);
  }
  fetch = (params) => this.http.get('teams', params);
  fetchById = (id) => this.http.get(`teams/${id}`);
  create = (params) => this.http.post('teams', params);
  update = (id, params) => this.http.put(`teams/${id}`, params);
  delete = (id) => this.http.del(`teams/${id}`, undefined, 'nothing');
  addPicture = (id, uri) =>
    this.http.putFile(`teams/${id}/picture`, uri, 'Picture');
}

export default TeamService;
