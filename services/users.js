import Http from './http';

class UsersService {
  constructor(tokenService) {
    this.http = new Http(tokenService);
  }
  fetchUsers = (params) => this.http.get('users', params);
  fetchUser = (id) => this.http.get(`users/${id}`);
  fetchUserByExternalId = (externalId) =>
    this.http.get(`users/byexternalid/${externalId}`);
  createUser = (user) => this.http.post('users', user);
  deleteUser = (id) => this.http.del(`users/${id}`, undefined, 'nothing');
  editUser = (user) => this.http.put(`users/${user.id}`, user);
  setPicture = (picture, id) =>
    this.http.put(`users/${id}/picture`, {fileContent: picture});
  fetchPicture = async (id) => {
    const r = await this.http.get(`users/${id}/picture`, undefined, 'blob');
    return new Promise((resolve, _) => {
      const reader = new window.FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(r);
    });
  };
  bannedUser = (id, params) => this.http.put(`users/${id}/banned`, params);
  verifiedUser = (id, params) => this.http.put(`users/${id}/verified`, params);
}

export default UsersService;
