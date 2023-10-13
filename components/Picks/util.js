import {getFormDate} from '../../utils/constants';

export const buildBody = (values, translations, matchId) => {
  const date = getFormDate(values.date);
  const timeAndMinutes = values.time.split(':');
  date.setHours(
    parseInt(timeAndMinutes[0], 10),
    parseInt(timeAndMinutes[1], 10),
  );
  const dateISO = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  ).toISOString();
  const _sections = [];
  if (values.extraInfo.length > 0) {
    values.extraInfo.forEach((i) => {
      i.values.forEach((y, index) => {
        _sections.push({
          title: y.title,
          description: y.description,
          language: i.languageCode,
          indexOrder: index,
          id: y.id,
        });
      });
    });
  }
  return {
    translations,
    stake: values.Recommendedinvestment,
    benefit: values.benefit,
    match: {
      id: matchId,
      homeTeamId: values.team1,
      visitorTeamId: values.team2,
      date: dateISO,
      competitionId: values.competition,
    },
    sections: _sections,
    url: values?.url,
    draft: values.draft,
    subscriptionId: values.subscription,
  };
};
