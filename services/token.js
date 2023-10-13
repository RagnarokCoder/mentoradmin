class TokenService {
  constructor(idToken) {
    this.idToken = idToken;
  }

  /**
   * Get the session token.
   * @returns {string} Returns the current session token.
   */
  getIdToken = () => this.idToken;

  /**
   * Check if a token session is present.
   * @returns {boolean} Returns True when a token is present.
   */
  hasSession = () => !!this.idToken;

  /**
   * Get a Bearer Auth Header for make HTTP requests.
   * @returns {Promise<string>} An authorization header.
   */
  getAuthHeader = () => `Bearer ${this.getIdToken()}`;
}

export default TokenService;
