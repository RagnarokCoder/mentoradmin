import buildFormSchema from '../validations/buildFormSchema';

const bettingControlSchema = buildFormSchema({
  fields: [
    {
      name: 'team1Result',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'team result content is required.',
        },
        {
          type: 'min',
          value: 0,
          message: 'Result must be more than 0',
        },
      ],
    },
    {
      name: 'team2Result',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'team result content is required.',
        },
        {
          type: 'min',
          value: 0,
          message: 'Result must be more than 0',
        },
      ],
    },
    {
      name: 'forecast',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'forecast content is required.',
        },
      ],
    },
    {
      name: 'benefit',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'benefit content is required.',
        },
      ],
    },
  ],
});

export default bettingControlSchema;
