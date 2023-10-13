export const getPrefit = (values) => {
  switch (values.forecast) {
    case 'win':
      return values.benefit;
    case 'lose':
      return -values.recommendedInvestment;
    default:
      return 0;
  }
};
