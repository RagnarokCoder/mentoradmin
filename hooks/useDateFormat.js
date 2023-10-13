import {
  format,
  differenceInDays,
  isEqual,
  isAfter,
  isBefore,
  addDays,
} from 'date-fns';
import * as locales from 'date-fns/locale';
import i18n from 'i18n-js';

const useDateFormat = () => {
  const languageToLocale = () => {
    switch (i18n.locale) {
      case 'it':
      case 'de':
      case 'es':
      case 'ko':
      case 'pt':
      case 'fr':
        return locales[i18n.locale];
      case 'ar':
        return locales.ar;
      case 'zh-CN':
        return locales.zhCN;
      case 'zh-TW':
        return locales.zhTW;
      default:
        return locales.enUS;
    }
  };
  const locale = languageToLocale();
  const d = (date = new Date(), formatString = 'MMM dd') =>
    format(date, formatString, {locale});
  const compareDateisEqual = (dateOne, dateTwo) => isEqual(dateOne, dateTwo);
  const compareDateisAfter = (dateOne, dateTwo) => isAfter(dateOne, dateTwo);
  const compareDateisBefore = (dateOne, dateTwo) => isBefore(dateOne, dateTwo);
  const differenceDatesInDays = (dateOne, dateTwo) =>
    differenceInDays(dateOne, dateTwo);
  const addDaysToDate = (date, numberOfDays) => addDays(date, numberOfDays);
  return {
    d,
    compareDateisEqual,
    compareDateisAfter,
    compareDateisBefore,
    differenceDatesInDays,
    addDaysToDate,
  };
};

export default useDateFormat;
