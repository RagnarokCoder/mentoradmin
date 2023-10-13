const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export const defaultParams = {
  orderBy: 'createdDate',
  sortOrder: 1,
  pageSize: 50,
};
export const defaultLanguageCode = 'en';
export const roles = {
  admin: 'admin',
  superadmin: 'superadmin',
  user: 'user',
  analist: 'analist',
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const validateMaxSize = (
  value,
  size,
  maxValue = 5,
  sizeValue = 'MB',
) => {
  const index01 = sizes.indexOf(size);
  const index02 = sizes.indexOf(sizeValue);
  if (index01 < index02) {
    return true;
  }
  if (index01 > index02) {
    return false;
  }
  if (Number(value) <= Number(maxValue)) {
    return true;
  }
  return false;
};

export const getFormDate = (date) => {
  return new Date(date.replaceAll('-', '/'));
};
