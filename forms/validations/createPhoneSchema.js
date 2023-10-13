import {string, ref} from 'yup';
import {equalsTo, isValidPhone} from './extensions';

const createPhoneSchema = ({name, validations = []}) => {
  let schema = string();
  validations.forEach(({type, value, message}) => {
    switch (type) {
      case 'required':
        schema = schema.required(message);
        break;
      case 'matches':
        schema = schema.matches(value, message);
        break;
      case 'phone':
        schema = schema.ensure().trim().test(isValidPhone(message));
        break;
      case 'equals':
        schema = schema.test(equalsTo(ref(value), message));
        break;
      default:
        throw new Error(
          `PhoneSchema: validation type ${type} not implemented for field ${name}.`,
        );
    }
  });
  return schema;
};

export default createPhoneSchema;
