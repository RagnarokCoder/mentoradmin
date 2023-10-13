import Http from './http';

class SportService {
  constructor(token) {
    this.http = new Http(token);
  }
  fetch = () => this.http.get('sports');
}

export default SportService;
