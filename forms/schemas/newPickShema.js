const newPickShema = [
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
    name: 'competition',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'competition content is required.',
      },
    ],
  },
  {
    name: 'date',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'date content is required.',
      },
    ],
  },
  {
    name: 'time',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'time content is required.',
      },
    ],
  },
  {
    name: 'team1',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'team content is required.',
      },
      {
        type: 'noEquals',
        value: 'team2',
        message: 'You may select diferents teams',
      },
    ],
  },
  {
    name: 'team2',
    type: 'text',
    validations: [
      {
        type: 'required',
        message: 'team content is required.',
      },
      {
        type: 'noEquals',
        value: 'team1',
        message: 'You may select diferents teams',
      },
    ],
  },
  {
    name: 'Recommendedinvestment',
    type: 'number',
    validations: [
      {
        type: 'required',
        message: 'Recommended investment content is required.',
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
];

export default newPickShema;
