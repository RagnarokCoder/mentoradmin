export const schemaForPlan = (
  startDateSubscription,
  finishDateSubscription,
) => {
  return [
    {
      name: 'startDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'start date content is required.',
        },
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
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
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
        },
      ],
    },
    {
      name: 'endDatePicks',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'end date pick content is required.',
        },
        {
          type: 'after',
          value: 'startDatePicks',
          message: 'Cannot be less than the start date',
        },
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
        },
      ],
    },
    {
      name: 'startDatePicks',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'finish date pick content is required.',
        },
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
        },
      ],
    },
    {
      name: 'normalPriceDollar',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'price in dollar is required.',
        },
        {
          type: 'min',
          value: 0,
          message: 'Price cannot be less than 0',
        },
      ],
    },
    {
      name: 'warrantyPriceDollar',
      type: 'number',
      validations: [
        // {
        //   type: 'moreThan',
        //   value: 'normalPriceDollar',
        //   message: 'price in dollar is required.',
        // },
        {
          type: 'min',
          value: 0,
          message: 'Price cannot be less than 0',
        },
      ],
    },
  ];
};

export const schemaForMonthlyPlan = (
  startDateSubscription,
  finishDateSubscription,
) => {
  return [
    {
      name: 'startDate',
      type: 'date',
      validations: [
        {
          type: 'required',
          message: 'start date content is required.',
        },
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
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
        {
          type: 'min',
          value: `${startDateSubscription.split('T')[0]}`,
          message: 'start date content is required.',
        },
        {
          type: 'max',
          value: `${finishDateSubscription.split('T')[0]}`,
          message: 'finish date content is required.',
        },
      ],
    },
    {
      name: 'normalPriceDollar',
      type: 'number',
      validations: [
        {
          type: 'required',
          message: 'price in dollar is required.',
        },
        {
          type: 'min',
          value: 0,
          message: 'Price cannot be less than 0',
        },
      ],
    },
    {
      name: 'warrantyPriceDollar',
      type: 'number',
      validations: [
        // {
        //   type: 'moreThan',
        //   value: 'normalPriceDollar',
        //   message: 'price in dollar is required.',
        // },
        {
          type: 'min',
          value: 0,
          message: 'Price cannot be less than 0',
        },
      ],
    },
  ];
};
