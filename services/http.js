const JSON_MIME_TYPE = 'application/json';
/**
 * A wrapper for the fetch API.
 */
class Http {
  constructor(tokenService, baseUrl = process.env.API_ENDPOINT) {
    this.tokenService = tokenService;
    this.baseUrl = baseUrl;
    this.headers = {
      accept: JSON_MIME_TYPE,
    };
    this.contentType = JSON_MIME_TYPE;
  }

  setContentType = (contentType) => {
    this.contentType = contentType;
    this.headers = {accept: contentType};
  };

  getContentType = () => {
    return this.contentType;
  };

  getBaseUrl = () => {
    return this.baseUrl;
  };

  setBaseUrl = (baseUrl) => {
    this.baseUrl = baseUrl;
  };

  getUrl = (url = '') => `${this.baseUrl}${url}`;

  getSearchParams = (params) => {
    if (!params) {
      return '';
    }
    const searchParams = new URLSearchParams();
    Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => searchParams.append(key, value));
    return `?${searchParams.toString()}`;
  };

  processResponse = async (response, type = 'json') => {
    let result;
    switch (type) {
      case 'json':
        result = await response.json();
        break;
      case 'blob':
        result = await response.blob();
        break;
      default:
        result = {};
        break;
    }
    if (response.ok) {
      return result;
    }
    const error = new Error(result.title || response.statusText);
    error.status = response.status;
    error.response = result;
    throw error;
  };

  getJsonPatch = (data) =>
    Object.entries(data).map(([key, value]) => ({
      value,
      op: 'add',
      path: `/${key}`,
    }));

  setHeader = (key, value) => {
    this.headers[key] = value;
  };

  /**
   * Send a GET request to the given URL.
   * @param {String} url a URL where the request is send.
   * @param {Object} params The query params to be added to the request.
   * @returns {Promise<any>} A promise with the response body when the request is completed.
   */
  get = async (url, params, typeResponse) => {
    const response = await fetch(
      `${this.getUrl(url)}${this.getSearchParams(params)}`,
      {
        headers: {
          authorization: this.tokenService.getAuthHeader(),
          ...this.headers,
        },
      },
    );
    return this.processResponse(response, typeResponse);
  };

  /**
   * Send a POST request to the given URL.
   * @param {string} url a URL where the request is send.
   * @param {any} body data to be included in the request body.
   * @returns {Promise<any>} A promise with the response body when the request is completed.
   */
  post = async (url, body, typeResponse) => {
    const response = await fetch(this.getUrl(url), {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        authorization: this.tokenService.getAuthHeader(),
        'content-type': this.contentType,
        ...this.headers,
      },
    });
    return this.processResponse(response, typeResponse);
  };

  /**
   * Send a PUT request to the given URL.
   * @param {string} url a URL where the request is send.
   * @param {any} body data to be included in the request body.
   * @returns {Promise<any>} A promise with the response body when the request is completed.
   */
  put = async (url, body, typeResponse) => {
    const response = await fetch(this.getUrl(url), {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'content-type': this.contentType,
        authorization: this.tokenService.getAuthHeader(),
        ...this.headers,
      },
    });
    return this.processResponse(response, typeResponse);
  };

  /**
   * Send a PATCH request to the given URL.
   * @param {string} url a URL where the request is send.
   * @param {any} data data to be included in the JSON Patch.
   * @return {Promise<*>} A promise with the response body when the request is completed.
   */
  patch = async (url, data) => {
    const response = await fetch(this.getUrl(url), {
      method: 'patch',
      body: JSON.stringify(this.getJsonPatch(data)),
      headers: {
        'content-type': this.contentType,
        authorization: this.tokenService.getAuthHeader(),
        ...this.headers,
      },
    });
    return this.processResponse(response);
  };

  /**
   * Send a DELETE request to the given URL.
   * @param {string} url a URL where the request is send.
   * @param {any} body data to be included in the request body.
   * @returns {Promise<any>} A promise with the response body when the request is completed.
   */
  del = async (url, body, typeResponse) => {
    const response = await fetch(this.getUrl(url), {
      method: 'delete',
      body: JSON.stringify(body),
      headers: {
        'content-type': this.contentType,
        authorization: this.tokenService.getAuthHeader(),
        ...this.headers,
      },
    });
    return this.processResponse(response, typeResponse);
  };

  /**
   * Send a POST file request to the given URL.
   * @param {string} url a URL where the request is send.
   * @param {string} uri a URI to the file to be send in the request body.
   * @returns {Promise<any>} A promise with the response body when the request is completed.
   */
  postFile = async (url, uri, key = 'file', typeResponse) => {
    const body = new FormData();
    body.append(key, uri);
    const response = await fetch(this.getUrl(url), {
      body,
      method: 'POST',
      headers: {
        ...this.headers,
        authorization: this.tokenService.getAuthHeader(),
      },
    });
    return this.processResponse(response, typeResponse);
  };
  putFile = async (url, uri, key = 'file', typeResponse) => {
    const body = new FormData();
    body.append(key, uri);
    const response = await fetch(this.getUrl(url), {
      body,
      method: 'PUT',
      headers: {
        ...this.headers,
        authorization: this.tokenService.getAuthHeader(),
      },
    });
    return this.processResponse(response, typeResponse);
  };
}

export default Http;
