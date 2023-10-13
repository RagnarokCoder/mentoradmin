import {boolean} from 'yup';

const createBooleanSchema = ({name, validations = []}) => {
  let schema = boolean();
  validations.forEach(({type, message}) => {
    switch (type) {
      case 'required':
        schema = schema.required(message).oneOf([true], message);
        break;
      default:
        throw new Error(
          `BooleanSchema: validation type ${type} not implemented for field ${name}.`,
        );
    }
  });
  return schema;
};

export default createBooleanSchema;
