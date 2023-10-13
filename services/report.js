import Http from './http';

class ReportService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('report', params);
  fetchById = (id) => this.http.get(`report/${id}`);
  create = (params) => this.http.post('report', params);
  edit = (id, params) => this.http.put(`report/${id}`, params);
}

export default ReportService;
