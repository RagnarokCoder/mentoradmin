import buildFormSchema from '../validations/buildFormSchema';

export const newDiscountUserSchema = buildFormSchema({
  fields: [
    {
      name: 'percentage',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'Percentage content is required.',
        },
        {
          type: 'min',
          value: 1,
          message: 'Must be greater than 1',
        },
        {
          type: 'max',
          value: 100,
          message: 'Must be less than 100',
        },
        {
          type: 'positive',
          message: 'Must be greater than 1',
        },
      ],
    },
    {
      name: 'effectiveDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'Effective date content is required.',
        },
        {
          type: 'min',
          value: `${new Date().toISOString().split('T')[0]}`,
          message: 'start date content is required.',
        },
      ],
    },
    {
      name: 'subscription',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Subscription content is required.',
        },
      ],
    },
    {
      name: 'name',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Name is required.',
        },
      ],
    },
    {
      name: 'discount',
      type: 'text',
      validations: [
        {
          type: 'required',
          message: 'Discount is required.',
        },
      ],
    },
  ],
});

const newDiscountSchema = [
  {
    name: 'percentage',
    type: 'number',
    validations: [
      {
        type: 'required',
        message: 'Percentage content is required.',
      },
      {
        type: 'min',
        value: 1,
        message: 'Must be greater than 1',
      },
      {
        type: 'max',
        value: 100,
        message: 'Must be less than 100',
      },
      {
        type: 'positive',
        message: 'Must be greater than 1',
      },
    ],
  },
  {
    name: 'effectiveDate',
    type: 'date',
    validations: [
      {
        type: 'required',
        message: 'Effective date content is required.',
      },
      {
        type: 'min',
        value: `${new Date().toISOString().split('T')[0]}`,
        message: 'start date content is required.',
      },
    ],
  },
  {
    name: 'subscription',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'Subscription content is required.',
      },
    ],
  },
];

export default newDiscountSchema;
