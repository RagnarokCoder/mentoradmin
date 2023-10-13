import Http from './http';

class LanguageService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetchLanguages = () => this.http.get('languages');
}

export default LanguageService;
