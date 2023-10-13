import {useEffect, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import {Container, Stack, Text, Flex, SimpleGrid} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import CardAdd from '../../components/CardAdd';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import SubscripcionCard from '../../components/Subscripcion/SubscripcionCard';
import {
  fetch,
  order,
  changePage,
  changeSize,
} from '../../state/actions/subscriptions';
import {
  selectSubscriptions,
  selectSubscriptionStatus,
  selectSize,
  selectPage,
} from '../../state/selectors/subscriptions';
import {selectIsPermissions} from '../../state/selectors/users';
import {selectUser} from '../../state/selectors/users';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import useRoles from '../../hooks/useRoles';

const Subscriptions = withAuthenticationRequired(
  ({
    permissions,
    user,
    size,
    page,
    subscriptions,
    status,
    onMount,
    onOrder,
    onChangePage,
    onChangeSize,
  }) => {
    const [itemDrawing, setItemDrawing] = useState();
    const [itemOver, setItemOver] = useState();
    const [orderList, setOrderList] = useState([]);
    const {height} = useWindowsDimension();
    const router = useRouter();
    const {isAdmin} = useRoles();

    useEffect(() => {
      isAdmin
        ? onMount({
            orderBy: 'indexOrder',
            sortOrder: 0,
            pageSize: size,
            pageNumber: page,
          })
        : onMount({
            orderBy: 'indexOrder',
            sortOrder: 0,
            AssignedUserId: user?.id,
            pageSize: size,
            pageNumber: page,
          });
    }, [isAdmin, user, onMount, page, size]);

    useEffect(() => {
      setOrderList(subscriptions);
    }, [subscriptions]);

    useEffect(() => {
      if (itemDrawing !== undefined && itemOver !== undefined) {
        const d = orderList?.data[itemOver];
        const j = orderList?.data[itemDrawing];
        orderList.data[itemOver] = j;
        orderList.data[itemDrawing] = d;
        setOrderList(orderList);
        setItemDrawing(undefined);
        setItemOver(undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemDrawing, itemOver]);

    const handleOnItemOver = (index) => {
      setItemOver(index);
    };

    const handleOnItemDrawing = (index) => {
      setItemDrawing(index);
    };

    const handleOnSaveOrder = useCallback(() => {
      const subscriptionsOrdered = orderList?.data?.map((l, index) => {
        return {id: l.id, indexOrder: index};
      });
      onOrder({subscriptionsOrdered});
    }, [onOrder, orderList]);

    return (
     permissions && (
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <Stack
            direction="column"
            flex={1}
            p={10}
            bg="white"
            borderRadius="lg">
            <Flex flex={1} justify="space-between">
              <Text fontWeight="bold" size="18px">
                {isAdmin ? 'Suscripciones' : 'Suscripciones Asignadas'}
              </Text>
              {isAdmin && (
                <Button onClick={handleOnSaveOrder}>Guardar Orden</Button>
              )}
            </Flex>
            <Text size="14px" color="gray.700">
              Todas las suscripciones
            </Text>
            <SimpleGrid
              h={height - 300}
              overflow="scroll"
              columns={[1, 3]}
              spacing={10}>
              {isAdmin && (
                <CardAdd
                  title="Crear nueva suscripción"
                  onClick={() =>
                    router.push('/Subscriptions/SubscriptionManager')
                  }
                />
              )}
              {orderList?.data?.map((d, index) => (
                <SubscripcionCard
                  isAdmin={isAdmin}
                  index={index}
                  OnItemDragging={handleOnItemDrawing}
                  OnItemOver={handleOnItemOver}
                  onGiveSubscription={(item) =>
                    router.push(
                      `/Subscriptions/GiveSubscription?id=${item.translationId}`,
                    )
                  }
                  onClick={(item) =>
                    isAdmin
                      ? router.push(
                          `/Subscriptions/SubscriptionManager?id=${item.translationId}`,
                        )
                      : router.push(
                          `/Picks/PickManager?subscription=${item.id}`,
                        )
                  }
                  key={index.toString()}
                  item={d}
                />
              ))}
            </SimpleGrid>
            <Pagination
              {...orderList}
              onChangePage={(pageP) => onChangePage(pageP)}
              onSetPageSize={(pageS) => onChangeSize(pageS)}
            />
          </Stack>
        </Container>
     )
    );
  },
);

Subscriptions.Layout = HomeLayout;

export default connect(
  (state) => ({
    user: selectUser(state),
    subscriptions: selectSubscriptions(state),
    status: selectSubscriptionStatus(state),
    permissions: selectIsPermissions(state),
    size: selectSize(state),
    page: selectPage(state),
  }),
  {
    onMount: fetch,
    onOrder: order,
    onChangePage: changePage,
    onChangeSize: changeSize,
  },
)(Subscriptions);
