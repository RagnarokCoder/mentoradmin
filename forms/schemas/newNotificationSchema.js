import buildFormSchema from '../validations/buildFormSchema';

const newNotificationSchema = buildFormSchema({
  fields: [
    {
      name: 'subscription',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'subscription content is required.',
        },
      ],
    },
    {
      name: 'language',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'language content is required.',
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'title content is required.',
        },
      ],
    },
    {
      name: 'message',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'message content is required.',
        },
      ],
    },
  ],
});

export default newNotificationSchema;
