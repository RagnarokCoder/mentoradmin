import Http from './http';

class CountryService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetchCountries = () => this.http.get('countries');
}

export default CountryService;
