import buildFormSchema from '../validations/buildFormSchema';

const addTeamSchema = buildFormSchema({
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
  ],
});

export default addTeamSchema;
