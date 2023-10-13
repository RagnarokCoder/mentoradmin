import buildFormSchema from '../validations/buildFormSchema';

const addUserSchema = buildFormSchema({
  fields: [
    {
      name: 'firstName',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'First name content is required.',
        },
        {
          type: 'max',
          value: 50,
          message: 'Max 50 characters',
        },
      ],
    },
    {
      name: 'lastName',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Last name content is required.',
        },
        {
          type: 'max',
          value: 50,
          message: 'Max 50 characters',
        },
      ],
    },
    {
      name: 'username',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Username content is required.',
        },
        {
          type: 'max',
          value: 50,
          message: 'Max 50 characters',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      validations: [
        {
          type: 'required',
          message: 'Email content is required.',
        },
      ],
    },
    {
      name: 'password',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Password is required.',
        },
        {
          type: 'min',
          value: 8,
          message: 'Password must contain between 8 and 60 characters.',
        },
        {
          type: 'max',
          value: 60,
          message: 'Password must contain between 8 and 60 characters.',
        },
        {
          type: 'matches',
          value:
            /^(?=.*[A-Z])(?=.*[ !"#\$%&\'\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`{\|}~])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
          message:
            'Your password must contain Special characters(ex. !@#$%^&*)',
        },
      ],
    },
    {
      name: 'confirmPassword',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Confirm password is required.',
        },
        {
          type: 'equals',
          value: 'password',
          message: 'Password and confirm password do not match',
        },
      ],
    },
  ],
});

export default addUserSchema;
