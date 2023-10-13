import buildFormSchema from '../validations/buildFormSchema';

const subscriptionManagerSchema = buildFormSchema({
  fields: [
    {
      name: 'sports',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'sports content is required.',
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'start date content is required.',
        },
      ],
    },
    {
      name: 'endDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'finish date content is required.',
        },
        {
          type: 'after',
          value: 'startDate',
          message: 'Cannot be less than the start date',
        },
      ],
    },
    {
      name: 'preSaleDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'pre sale date content is required.',
        },
        {
          type: 'before',
          value: 'startDate',
          message: 'Cannot be greater than the start date',
        },
      ],
    },
  ],
});

export default subscriptionManagerSchema;
