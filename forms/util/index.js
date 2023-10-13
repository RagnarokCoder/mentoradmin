export const getErrorText = (errors, touched, field) =>
  errors[field] && touched[field] ? errors[field] : undefined;

export const isValid = (errors, touched, field) =>
  !!touched[field] && !errors[field];
