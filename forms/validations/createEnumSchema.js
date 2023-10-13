import {mixed} from 'yup';

const createEnumSchema = ({name, options, validations = []}) => {
  let schema = mixed().oneOf(options.map((option) => option.value));
  validations.forEach(({type, message}) => {
    switch (type) {
      case 'required':
        schema = schema.required(message);
        break;
      default:
        throw new Error(
          `EnumSchema: validation type ${type} not implemented for field ${name}.`,
        );
    }
  });
  return schema;
};

export default createEnumSchema;
