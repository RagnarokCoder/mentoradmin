import Http from './http';

class PostService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetch = (params) => this.http.get('posts', params);
  create = (params) => this.http.post('posts', params);
  delete = (id) => this.http.del(`posts/${id}`, undefined, 'nothing');
  fetchById = (id) => this.http.get(`posts/${id}`);
  addPicture = (picture, id) =>
    this.http.putFile(`posts/${id}/picture`, picture, 'FileContent');
  addLike = (id, params) =>
    this.http.post(`posts/${id}/likes`, params, 'nothing');
  removeLike = (id, params) =>
    this.http.del(`posts/${id}/likes`, params, 'nothing');
  notify = (id, params) => this.http.put(`posts/${id}/warning`, params);
}

export default PostService;
