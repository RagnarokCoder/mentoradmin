import buildFormSchema from '../validations/buildFormSchema';

const addCompetitionSchema = buildFormSchema({
  fields: [
    {
      name: 'name',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'name content is required.',
        },
        {
          type: 'max',
          value: 50,
          message: 'Max 50 characters',
        },
      ],
    },
    {
      name: 'sportId',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'sport content is required.',
        },
      ],
    },
  ],
});

export default addCompetitionSchema;
