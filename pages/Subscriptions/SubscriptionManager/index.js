import {useEffect, useState, useMemo} from 'react';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {Container, Stack, useDisclosure, Box} from '@chakra-ui/react';
import {HomeLayout} from '../../../layouts';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import ModalConfirmation from '../../../components/Modals/ModalConfirmation';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {fetchLanguages} from '../../../state/actions/language';
import {fetch} from '../../../state/actions/competition';
import {fetch as fetchSport} from '../../../state/actions/sport';
import {fetchCountries} from '../../../state/actions/country';
import {
  create,
  update,
  deleted,
  fetchById,
} from '../../../state/actions/subscriptions';
import {fetchUsers} from '../../../state/actions/users';
import {selectLanguageLanguages} from '../../../state/selectors/language';
import {selectCompetitions} from '../../../state/selectors/competition';
import {selectCountryCountries} from '../../../state/selectors/country';
import {
  selectSubscriptionStatus,
  selectSubscription,
} from '../../../state/selectors/subscriptions';
import {selectSports} from '../../../state/selectors/sport';
import {selectIsPermissions, selectUsers} from '../../../state/selectors/users';
import AddSubscriptionLanguage from '../../../components/Subscripcion/AddSubscriptionLanguage';
import AddPlan from '../../../components/Subscripcion/AddPlan';

const SubscriptionManager = withAuthenticationRequired(
  ({
    permissions,
    languages,
    competitions,
    countries,
    subscription,
    sports,
    status,
    onFetchCompetitions,
    onFetchLanguage,
    onFetchCountries,
    onFetchSport,
    onCreate,
    onUpdate,
    onDeleted,
    onFetchById,
    onFetchUsers,
    users,
  }) => {
    const router = useRouter();
    const {id} = router.query;
    const modalDelete = useDisclosure();
    const [competitionIdsAdded, setCompetitionIdsAdded] = useState([]);
    const [translationsSubscriptionAdded, setTranslationsSubscriptionAdded] =
      useState([]);
    const [valueToEdit, setValueToEdit] = useState();
    const [plansSubscriptionAdded, setPlansSubscriptionAdded] = useState([]);
    const [sportId, setSportId] = useState();
    const [sportName, setSportName] = useState();
    const [pictureUrl, setPictureUrl] = useState();
    const [assignedUser, setAssignedUser] = useState();
    const [startDateSubscription, setStartDateSubscription] = useState();
    const [finishDateSubscription, setFinishDateSubscription] = useState();
    const [preSaleDate, setPreSaleDate] = useState();
    const [picture, setPicture] = useState();
    const [modalDeleteTitle, setModalDeleteTitle] = useState();
    const [modalDeleteInfo, setModalDeleteInfo] = useState();
    const [modalDeleteButtons, setModalDeleteButtons] = useState([]);
    useEffect(() => {
      onFetchCompetitions();
      onFetchLanguage();
      onFetchCountries();
      onFetchSport();
      if (id) {
        onFetchById(id);
      }
    }, [
      id,
      onFetchById,
      onFetchCompetitions,
      onFetchCountries,
      onFetchLanguage,
      onFetchSport,
    ]);

    useEffect(() => {
      if (subscription && id) {
        setSportId(subscription.sportId);
        setSportName(subscription.sportName);
        setPictureUrl(subscription.pictureUrl);
        setStartDateSubscription(
          new Date(subscription.startDate).toISOString(),
        );
        setFinishDateSubscription(new Date(subscription.endDate).toISOString());
        setPreSaleDate(
          subscription.preSaleDate
            ? new Date(subscription.preSaleDate).toISOString()
            : undefined,
        );
        setCompetitionIdsAdded(
          subscription.competitionIds.map((i) => {
            return {
              id: i,
              name: competitions?.data.find((c) => c.id === i)?.name,
            };
          }),
        );
        setTranslationsSubscriptionAdded(
          subscription.translations.map((s) => {
            return {
              name: s.name,
              subheader: s.subheading,
              description: s.description,
              languageCode: s.language,
              languageName: languages.find((l) => l.code === s.language)?.name,
            };
          }),
        );
        let objectTranslations = {};
        subscription.translations.forEach((s) => {
          const language_name_subscription_ = `language_name_subscription_${
            languages.find((l) => l.code === s.language)?.id
          }`;
          const language_subheader_subscription_ = `language_subheader_subscription_${
            languages.find((l) => l.code === s.language)?.id
          }`;
          const language_description_subscription_ = `language_description_subscription_${
            languages.find((l) => l.code === s.language)?.id
          }`;
          objectTranslations = {
            ...objectTranslations,
            [language_name_subscription_]: s.name,
            [language_subheader_subscription_]: s.subheading,
            [language_description_subscription_]: s.description,
          };
        });
        const _valueToEdit = {
          ...objectTranslations,
          startDate: subscription.startDate.split('T')[0],
          endDate: subscription.endDate.split('T')[0],
          preSaleDate: subscription?.preSaleDate?.split('T')[0],
          sports: subscription.sportId,
        };
        setValueToEdit(_valueToEdit);
        const _plansSubscriptionAdded = [];
        subscription.plans.forEach((s) => {
          let objectPlanTranslations = {};
          s.translations.forEach((t) => {
            const language_description_plan_ = `language_description_plan_${
              languages.find((l) => l.code === t.language)?.id
            }`;
            const language_name_plan_ = `language_name_plan_${
              languages.find((l) => l.code === t.language)?.id
            }`;
            objectPlanTranslations = {
              ...objectPlanTranslations,
              [language_description_plan_]: t.description,
              [language_name_plan_]: t.name,
            };
          });
          _plansSubscriptionAdded.push({
            id: s.id,
            endDate: s.purchaseEndDate.split('T')[0],
            startDate: s.purchaseStartDate.split('T')[0],
            planMonthly: s.monthly,
            startDatePicks: s.startDate?.split('T')[0],
            endDatePicks: s.endDate?.split('T')[0],
            normalPriceDollar: s.prices.find(
              (sp) =>
                sp.countryCode ===
                countries.find((c) => c.code.toLowerCase() === 'us')?.code,
            )?.normalPrice,
            warrantyPriceDollar: s.prices.find(
              (sp) =>
                sp.countryCode ===
                countries.find((c) => c.code.toLowerCase() === 'us')?.code,
            )?.warrantyPrice,
            benefitsAdded: s.benefits.map((b) => {
              return {
                languageId: languages.find((l) => l.code === b.language)?.id,
                name: b.name,
                language: b.language,
              };
            }),
            pricesAdded: s.prices
              .filter(
                (sp) =>
                  sp.countryCode !==
                  countries.find((c) => c.code.toLowerCase() === 'us')?.code,
              )
              .map((sfp) => {
                return {
                  price: sfp.normalPrice,
                  priceWarranty: sfp.warrantyPrice,
                  id: countries.find((c) => c.code === sfp.countryCode)?.id,
                  currencyId: countries.find((c) => c.code === sfp.countryCode)
                    ?.currencyId,
                  country: countries.find((c) => c.code === sfp.countryCode),
                };
              }),
            ...objectPlanTranslations,
          });
        });
        setPlansSubscriptionAdded([..._plansSubscriptionAdded]);
        if (subscription.assignedUserId) {
          onFetchUsers({id: subscription.assignedUserId});
        }
      }
    }, [subscription, competitions, languages, countries, id, onFetchUsers]);

    useEffect(() => {
      if (users?.data?.length > 0 && subscription && id) {
        setAssignedUser(users?.data?.[0]);
      }
    }, [id, subscription, users]);

    const isCompleteForm = useMemo(() => {
      if (
        !sportId ||
        (!picture && !id) ||
        !startDateSubscription ||
        !finishDateSubscription ||
        !preSaleDate ||
        translationsSubscriptionAdded.length === 0 ||
        competitionIdsAdded.length === 0 ||
        plansSubscriptionAdded.length === 0
      ) {
        return false;
      }
      return true;
    }, [
      competitionIdsAdded,
      finishDateSubscription,
      picture,
      plansSubscriptionAdded,
      sportId,
      id,
      startDateSubscription,
      translationsSubscriptionAdded,
      preSaleDate,
    ]);

    const handleOnSubmitSubscription = (values) => {
      setAssignedUser(values.assignedUser);
      if (values.file) {
        setPictureUrl(URL.createObjectURL(values.file));
        setPicture(values.file);
      }
      setSportName(sports.find((s) => s.id === values.sports).name);
      setSportId(values.sports);
      setStartDateSubscription(new Date(values.startDate).toISOString());
      setFinishDateSubscription(new Date(values.endDate).toISOString());
      setPreSaleDate(new Date(values.preSaleDate).toISOString());
    };

    const handleOnSubmitSubscriptionLanguage = (values) => {
      const _translationsSubscriptionAdded = [];
      languages?.forEach((l) => {
        _translationsSubscriptionAdded.push({
          name: values[`language_name_subscription_${l.id}`],
          subheader: values[`language_subheader_subscription_${l.id}`],
          description: values[`language_description_subscription_${l.id}`],
          languageCode: l.code,
          languageName: l.name,
        });
      });
      setTranslationsSubscriptionAdded([..._translationsSubscriptionAdded]);
    };

    const handleOnCreate = () => {
      const _plans = [];
      plansSubscriptionAdded.forEach((plan) => {
        const _translations = [];
        const _prices = [];
        const _benefits = [];
        languages?.forEach((l) => {
          _translations.push({
            name: plan[`language_name_plan_${l.id}`],
            description: plan[`language_description_plan_${l.id}`],
            language: languages.find((la) => la.id === l.id)?.code,
          });
        });
        _prices.push({
          normalPrice: plan.normalPriceDollar,
          warrantyPrice: plan.warrantyPriceDollar == null ? -1 : plan.warrantyPriceDollar,
          currencyId: countries.find((c) => c.code.toLowerCase() === 'us')
            ?.currencyId,
          countryCode: countries.find((c) => c.code.toLowerCase() === 'us')
            ?.code,
        });
        if (plan.pricesAdded) {
          plan.pricesAdded.forEach((pa) => {
            _prices.push({
              normalPrice: Number(pa.price),
              warrantyPrice: plan.warrantyPriceDollar == null ? -1 : Number(pa.priceWarranty),
              currencyId: pa.currencyId,
              countryCode: pa.country.code,
            });
          });
        }
        if (plan.benefitsAdded) {
          plan.benefitsAdded.forEach((ba, i) => {
            _benefits.push({
              name: ba.name,
              language: ba.language,
              indexOrder: i,
            });
          });
        }
        plan.planMonthly
          ? _plans.push({
              id: plan?.id,
              monthly: true,
              purchaseStartDate: new Date(plan.startDate).toISOString(),
              purchaseEndDate: new Date(plan.endDate).toISOString(),
              translations: _translations,
              prices: _prices,
              benefits: _benefits,
            })
          : _plans.push({
              id: plan?.id,
              monthly: false,
              startDate: new Date(plan.startDatePicks).toISOString(),
              endDate: new Date(plan.endDatePicks).toISOString(),
              purchaseStartDate: new Date(plan.startDate).toISOString(),
              purchaseEndDate: new Date(plan.endDate).toISOString(),
              translations: _translations,
              prices: _prices,
              benefits: _benefits,
            });
      });
      const body = {
        picture,
        sportId,
        startDate: startDateSubscription,
        endDate: finishDateSubscription,
        preSaleDate,
        draft: true,
        translations: translationsSubscriptionAdded.map((t) => {
          return {
            name: t.name,
            description: t.description,
            subheading: t.subheader,
            language: t.languageCode,
          };
        }),
        plans: _plans,
        competitionIds: competitionIdsAdded.map((c) => c.id),
        assignedUserId: assignedUser.id,
      };
      id ? onUpdate(id, body) : onCreate(body);
    };

    const handleOnDeleteSubscription = () => {
      setModalDeleteTitle('Confirma borrado');
      setModalDeleteInfo(
        `Esta seguro que desea eliminar la subscription ${subscription?.translations[0].name}?`,
      );
      setModalDeleteButtons([
        <Button
          onClick={() => {
            modalDelete.onClose();
            onDeleted(subscription.id);
          }}>
          Aceptar
        </Button>,
        <Button
          onClick={() => {
            modalDelete.onClose();
          }}>
          Cancelar
        </Button>,
      ]);
      modalDelete.onOpen();
    };

    const handleOnClickRemoveLeague = (item) => {
      setModalDeleteTitle('Confirma borrado');
      setModalDeleteInfo(
        `Esta seguro que desea eliminar la liga ${item.name}?`,
      );
      setModalDeleteButtons([
        <Button
          onClick={() => {
            modalDelete.onClose();
            setCompetitionIdsAdded(
              competitionIdsAdded.filter((c) => c.id !== item.id),
            );
          }}>
          Aceptar
        </Button>,
        <Button
          onClick={() => {
            modalDelete.onClose();
          }}>
          Cancelar
        </Button>,
      ]);
      modalDelete.onOpen();
    };

    const handleOnAddLeague = (competitionsId) => {
      if (competitionIdsAdded.length > 0) {
        if (!competitionIdsAdded.find((c) => c.id === competitionsId)) {
          competitionIdsAdded.push({
            id: competitionsId,
            name: competitions?.data.find((i) => i.id === competitionsId)?.name,
          });
        }
      } else {
        competitionIdsAdded.push({
          id: competitionsId,
          name: competitions?.data.find((i) => i.id === competitionsId)?.name,
        });
      }
      setCompetitionIdsAdded([...competitionIdsAdded]);
    };

    const handleOnAddPlan = (plan, index) => {
      if (index !== undefined) {
        setPlansSubscriptionAdded(
          plansSubscriptionAdded.map((p, i) => {
            return index === i ? plan : p;
          }),
        );
      } else {
        plansSubscriptionAdded.push(plan);
        setPlansSubscriptionAdded([...plansSubscriptionAdded]);
      }
    };

    const handleOnRemovePlan = (index, _plan) => {
      setModalDeleteTitle('Confirma borrado');
      setModalDeleteInfo(`Esta seguro que desea eliminar el plan ${index}?`);
      setModalDeleteButtons([
        <Button
          onClick={() => {
            modalDelete.onClose();
            plansSubscriptionAdded.splice(index, 1);
            setPlansSubscriptionAdded([...plansSubscriptionAdded]);
          }}>
          Aceptar
        </Button>,
        <Button
          onClick={() => {
            modalDelete.onClose();
          }}>
          Cancelar
        </Button>,
      ]);
      modalDelete.onOpen();
    };

    return (
      // permissions && (
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <ModalConfirmation
            title={modalDeleteTitle}
            info={modalDeleteInfo}
            buttons={modalDeleteButtons}
            isOpen={modalDelete.isOpen}
            onClose={modalDelete.onClose}
          />
          <AddSubscriptionLanguage
            languages={languages}
            competitions={competitions}
            sports={sports}
            onAddLeague={handleOnAddLeague}
            sportName={sportName}
            assignedUser={assignedUser}
            competitionIdsAdded={competitionIdsAdded}
            pictureUrl={pictureUrl}
            startDate={startDateSubscription}
            endDate={finishDateSubscription}
            preSaleDate={preSaleDate}
            onClickRemoveLeague={handleOnClickRemoveLeague}
            onSubmit={handleOnSubmitSubscriptionLanguage}
            onSubmitSubscription={handleOnSubmitSubscription}
            valueToEdit={valueToEdit}
            translationsSubscriptionAdded={translationsSubscriptionAdded}
          />
          <Box h={10} />
          <AddPlan
            languages={languages}
            countries={countries}
            preSaleDate={preSaleDate}
            finishDateSubscription={finishDateSubscription}
            plansSubscriptionAdded={plansSubscriptionAdded}
            onClickRemovePlan={handleOnRemovePlan}
            onAddPlan={handleOnAddPlan}
          />
          <Stack display="flex" justify="end" direction="row" mt={10}>
            {id && (
              <Button onClick={handleOnDeleteSubscription} background="red">
                Eliminar Subscription
              </Button>
            )}
            <Button disabled={!isCompleteForm} onClick={handleOnCreate}>
              {id ? 'Editar suscripción' : 'Crear suscripción'}
            </Button>
          </Stack>
        </Container>
      // )
    );
  },
);

SubscriptionManager.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    languages: selectLanguageLanguages(state),
    competitions: selectCompetitions(state),
    countries: selectCountryCountries(state),
    sports: selectSports(state),
    users: selectUsers(state),
    subscription: selectSubscription(state),
    status: selectSubscriptionStatus(state),
  }),
  {
    onFetchCompetitions: fetch,
    onFetchLanguage: fetchLanguages,
    onFetchCountries: fetchCountries,
    onFetchSport: fetchSport,
    onCreate: create,
    onUpdate: update,
    onDeleted: deleted,
    onFetchById: fetchById,
    onFetchUsers: fetchUsers,
  },
)(SubscriptionManager);
