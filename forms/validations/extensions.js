import {parsePhoneNumberFromString} from 'libphonenumber-js';

export const equalsTo = (ref, msg) => ({
  message: msg || '${path} must be the same as ${reference}',
  params: {
    reference: ref.path,
  },
  test(value) {
    return value === this.resolve(ref);
  },
});

export const noEqualsTo = (ref, msg) => ({
  message: msg || '${path} must not be the same as ${reference}',
  params: {
    reference: ref.path,
  },
  test(value) {
    return value !== this.resolve(ref);
  },
});

export const moreThan = (ref, msg) => ({
  message: msg || '${path} must not be the same as ${reference}',
  params: {
    reference: ref.path,
  },
  test(value) {
    return value > this.resolve(ref);
  },
});

export const lessThan = (ref, msg) => ({
  message: msg || '${path} must not be the same as ${reference}',
  params: {
    reference: ref.path,
  },
  test(value) {
    return value < this.resolve(ref);
  },
});

export const isValidPhone = (msg = '') => ({
  message: msg || '',
  test(value) {
    if (!value) {
      return false;
    }
    const phone = parsePhoneNumberFromString(value, 'US');
    return !!phone && phone.isValid() && phone.country === 'US';
  },
});
