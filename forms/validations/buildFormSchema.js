import {object} from 'yup';
import createSchema from './createSchema';

const buildFormSchema = ({fields}) => {
  const schema = {};
  fields.forEach((field) => {
    schema[field.name] = createSchema(field);
  });
  return object(schema);
};

export default buildFormSchema;
