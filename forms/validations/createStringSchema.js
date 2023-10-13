import {string, ref} from 'yup';
import {equalsTo, noEqualsTo} from './extensions';

const createStringSchema = ({name, validations = []}) => {
  let schema = string().trim();
  validations.forEach(({type, value, message}) => {
    switch (type) {
      case 'nullable':
        schema = schema.nullable();
        break;
      case 'required':
        schema = schema.required(message);
        break;
      case 'min':
        schema = schema.min(value, message);
        break;
      case 'max':
        schema = schema.max(value, message);
        break;
      case 'matches':
        schema = schema.matches(value, message);
        break;
      case 'equals':
        schema = schema.test(equalsTo(ref(value), message));
        break;
      case 'noEquals':
        schema = schema.test(noEqualsTo(ref(value), message));
        break;
      case 'test':
        schema = schema.test(value);
        break;
      default:
        throw new Error(
          `StringSchema: validation type ${type} not implemented for field ${name}.`,
        );
    }
  });
  return schema;
};

export default createStringSchema;
