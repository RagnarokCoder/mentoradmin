import {menuItems} from '../layouts/HomeLayout/menuItems';

const getCookieValue = (cookie) => {
  const searchValue = `${cookie}=`;
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(searchValue))
    ?.split('=')[1];
};
class SessionService {
  setSessionCookies = (accessToken) =>
    (document.cookie = `access_token=${accessToken.token};secure;path=/`);

  setUserId = (userId) => (document.cookie = `user_id=${userId};secure;path=/`);

  getSessionFromCookies = () => getCookieValue('access_token');
  getUserIdFromCookies = () => getCookieValue('user_id');
  checkPermissions = (pathname, role) => {
    const basePath = pathname.split('?')[0];
    let _roles = [];
    for (let i = 0; i < menuItems.body.length; i++) {
      if (menuItems.body[i].path === basePath) {
        _roles = menuItems.body[i].roles;
        break;
      }
      if (menuItems.body[i].children) {
        const child = menuItems.body[i].children.find(
          (c) => c.path === basePath,
        );
        if (child) {
          _roles = child.roles;
          break;
        }
      }
    }
    if (_roles && _roles.length > 0) {
      return _roles.find((r) => r === role) ? true : false;
    } else {
      return true;
    }
  };
}

export default SessionService;
