import createBooleanSchema from './createBooleanSchema';
import createDateSchema from './createDateSchema';
import createEmailSchema from './createEmailSchema';
import createEnumSchema from './createEnumSchema';
import createListSchema from './createListSchema';
import createNumberSchema from './createNumberSchema';
import createPhoneSchema from './createPhoneSchema';
import createStringSchema from './createStringSchema';

const createSchema = (field) => {
  const validationType = field.validationType || field.type;
  switch (validationType) {
    case 'checkbox':
      return createBooleanSchema(field);
    case 'checkboxList':
      return createListSchema(field);
    case 'date':
      return createDateSchema(field);
    case 'email':
      return createEmailSchema(field);
    case 'number':
      return createNumberSchema(field);
    case 'radio':
      return createEnumSchema(field);
    case 'phone':
      return createPhoneSchema(field);
    case 'text':
      return createStringSchema(field);
    case 'boolean':
      return createBooleanSchema(field);
    default:
      throw new Error(
        `createSchema: ${validationType} validation schema not implemented for field ${field.name}.`,
      );
  }
};

export default createSchema;
