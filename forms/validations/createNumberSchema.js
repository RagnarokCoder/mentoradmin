import {number, ref} from 'yup';
import {lessThan, moreThan} from './extensions';

const createNumberSchema = ({name, validations = []}) => {
  let schema = number().typeError('Please enter a valid number.');
  validations.forEach(({type, value, message}) => {
    switch (type) {
      case 'required':
        schema = schema.required(message);
        break;
      case 'integer':
        schema = schema.integer(message);
        break;
      case 'positive':
        schema = schema.positive(message);
        break;
      case 'min':
        schema = schema.min(value, message);
        break;
      case 'max':
        schema = schema.max(value, message);
        break;
      case 'moreThan':
        schema = schema.test(moreThan(ref(value), message));
        break;
      case 'lessThan':
        schema = schema.test(lessThan(ref(value), message));
        break;
      default:
        throw new Error(
          `NumberSchema: validation type ${type} not implemented for field ${name}.`,
        );
    }
  });
  return schema;
};

export default createNumberSchema;
