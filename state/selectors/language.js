export const selectLanguageStatus = (state) => state.language.status;
export const selectLanguageLanguages = (state) => state.language.languages;
export const selectLanguageLanguagesNames = (state) =>
  state.language.languages.map((l) => l.name);
