import {Fragment, useState, useEffect} from 'react';
import {
  Container,
  Stack,
  Box,
  Tabs,
  TabList,
  Tab,
  Text,
} from '@chakra-ui/react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import RowComment from '../../components/Community/RowComment';
import InputTweet from '../../components/InputTweet';
import LensGlass from '../../assets/Icons/LensGlass';
import {HomeLayout} from '../../layouts';
import {
  selectIsPermissions,
  selectPictureUrl,
} from '../../state/selectors/users';
import {
  selectPosts,
  selectPostsByUser,
  selectPostStatus,
  selectPagePageAll,
  selectPagePageUser,
  selectPageSizeAll,
  selectPageSizeUser,
} from '../../state/selectors/post';
import {selectUser} from '../../state/selectors/users';
import {
  fetch,
  fetchByUser,
  removeLike,
  remove,
  create,
  addLike,
  bannedUser,
  changePageAll,
  changePageUser,
  changeSizeAll,
  changeSizeUser,
} from '../../state/actions/post';
import useWindowsDimension from '../../hooks/useWindowsDimension';
import useRoles from '../../hooks/useRoles';

const Community = withAuthenticationRequired(
  ({
    permissions,
    pictureUrl,
    user,
    posts,
    postsByUser,
    status,
    pagePageAll,
    pagePageUser,
    pageSizeUser,
    pageSizeAll,
    onFetch,
    onFetchByUser,
    onRemove,
    onRemoveLike,
    onAddLike,
    onCreate,
    onBannedUser,
    onChangePageAll,
    onChangeSizeAll,
    onChangePageUser,
    onChangeSizeUser,
  }) => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [allPost, setAllPost] = useState();
    const [userPost, setUserPost] = useState();
    const {height} = useWindowsDimension();
    const {isSuperAdmin} = useRoles();

    useEffect(() => {
      onFetch({pageSize: pageSizeAll, pageNumber: pagePageAll});
    }, [onFetch, pagePageAll, pageSizeAll]);
    useEffect(() => {
      if (user) {
        onFetchByUser({
          userId: user.id,
          pageSize: pageSizeUser,
          pageNumber: pagePageUser,
        });
      }
    }, [onFetchByUser, user, pageSizeUser, pagePageUser]);

    useEffect(() => {
      if (searchValue.length > 0) {
        const listFilter = posts?.data.filter(
          (item) =>
            item.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.username?.toLowerCase().includes(searchValue.toLowerCase()),
        );
        const listFilterByUser = postsByUser?.data.filter(
          (item) =>
            item.description
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.username?.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setAllPost({...posts, data: listFilter});
        setUserPost({...posts, data: listFilterByUser});
      } else {
        setAllPost(posts);
        setUserPost(postsByUser);
      }
    }, [searchValue, posts, postsByUser]);

    const handleOnPressLike = (value, post) =>
      value
        ? onRemoveLike(post?.id, {userId: user?.id})
        : onAddLike(post?.id, {userId: user?.id});

    const handleOnDelete = (post) => onRemove(post?.id);

    const handleOnPressBanned = (post) => onBannedUser(post.userId);

    const handleOnComment = (message, picture) =>
      onCreate({userId: user?.id, description: message, picture});

    const handleOnPressNotifyUser = (post) =>
      router.push(`/Notifications?userId=${post.userId}&postId=${post.id}`);

    return (
      permissions && (
        <Container maxW="full">
          {status.isFetching && <Loading />}
          <Stack direction={['column-reverse', 'row']}>
            <Stack flex={0.8} spacing={0}>
              <Stack bg="white">
                <Tabs onChange={setCurrentTab} isFitted variant="unstyled">
                  <TabList>
                    <Tab _selected={{color: 'white', bg: 'green.100'}}>
                      <Text fontSize="16px" fontWeight="600">
                        Todos los comentarios
                      </Text>
                    </Tab>
                    <Tab _selected={{color: 'white', bg: 'green.100'}}>
                      <Text fontSize="16px" fontWeight="600">
                        Mis comentarios
                      </Text>
                    </Tab>
                  </TabList>
                </Tabs>
                {isSuperAdmin && (
                  <Fragment>
                    <Stack p={4}>
                      <InputTweet
                        profilePhoto={pictureUrl}
                        onComment={handleOnComment}
                      />
                    </Stack>
                    <Box h={2} bg="gray.200" />
                  </Fragment>
                )}
              </Stack>
              <Box h={height - 200} overflow="scroll">
                {currentTab === 0
                  ? allPost?.data.map((p) => (
                      <Fragment key={p.id}>
                        <Box h="1px" bg="gray.200" />
                        <RowComment
                          post={p}
                          userId={user?.id}
                          onPressDelete={handleOnDelete}
                          onPressLike={handleOnPressLike}
                          onPressBanned={handleOnPressBanned}
                          onPressNotifyUser={handleOnPressNotifyUser}
                        />
                      </Fragment>
                    ))
                  : userPost?.data.map((p) => (
                      <Fragment key={p.id}>
                        <Box h="1px" bg="gray.200" />
                        <RowComment
                          post={p}
                          userId={user?.id}
                          onPressDelete={handleOnDelete}
                          onPressLike={handleOnPressLike}
                          onPressBanned={handleOnPressBanned}
                          onPressNotifyUser={handleOnPressNotifyUser}
                        />
                      </Fragment>
                    ))}
              </Box>
              {currentTab === 0 ? (
                <Pagination
                  {...allPost}
                  onChangePage={(page) => onChangePageAll(page)}
                  onSetPageSize={(pageS) => onChangeSizeAll(pageS)}
                />
              ) : (
                <Pagination
                  {...userPost}
                  onChangePage={(page) => onChangePageUser(page)}
                  onSetPageSize={(pageS) => onChangeSizeUser(pageS)}
                />
              )}
            </Stack>
            <Stack flex={0.2}>
              <Input
                bg="gray.500"
                borderRadius="full"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                leftElement={<LensGlass color="black" />}
                placeholder="Buscar en la comunidad"
                type="text"
              />
            </Stack>
          </Stack>
        </Container>
      )
    );
  },
);

Community.Layout = HomeLayout;
export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    pictureUrl: selectPictureUrl(state),
    posts: selectPosts(state),
    postsByUser: selectPostsByUser(state),
    status: selectPostStatus(state),
    user: selectUser(state),
    pagePageAll: selectPagePageAll(state),
    pagePageUser: selectPagePageUser(state),
    pageSizeAll: selectPageSizeAll(state),
    pageSizeUser: selectPageSizeUser(state),
  }),
  {
    onFetch: fetch,
    onFetchByUser: fetchByUser,
    onRemoveLike: removeLike,
    onAddLike: addLike,
    onRemove: remove,
    onCreate: create,
    onBannedUser: bannedUser,
    onChangePageAll: changePageAll,
    onChangeSizeAll: changeSizeAll,
    onChangePageUser: changePageUser,
    onChangeSizeUser: changeSizeUser,
  },
)(Community);
