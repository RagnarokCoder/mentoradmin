export const selectCountryCountries = (state) => state.country.countries;
export const selectCountryCountriesNames = (state) =>
  state.country.countries.map((l) => l.name);
