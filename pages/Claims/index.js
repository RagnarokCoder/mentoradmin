import {useEffect, useState} from 'react';
import {
  Container,
  Tabs,
  TabList,
  Tab,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import {selectIsPermissions} from '../../state/selectors/users';
import {
  selectReportsResolved,
  selectReportsUnResolved,
  selectPageSizeResolved,
  selectPagePageResolved,
  selectPageSizeNoResolved,
  selectPagePageNoResolved,
} from '../../state/selectors/report';
import {selectPost, selectPostStatus} from '../../state/selectors/post';
import {
  fetchResolved,
  fetchNoResolved,
  edit,
  changePageNoResolved,
  changePageResolved,
  changeSizeNoResolved,
  changeSizeResolved,
} from '../../state/actions/report';
import {fetchById} from '../../state/actions/post';
import Pagination from '../../components/Pagination';
import ClaimsComponent from '../../components/Claims';
import ModalResolution from '../../components/Modals/ModalResolution';

const Claims = withAuthenticationRequired(
  ({
    permissions,
    post,
    postStatus,
    reportsResolved,
    reportsNoResolved,
    pageSizeResolved,
    pageResolved,
    pageSizeNoResolved,
    pageNoResolved,
    onFetchResolved,
    onFetchNoResolved,
    onEdit,
    onChangePageNoResolved,
    onChangePageResolved,
    onChangeSizeNoResolved,
    onChangeSizeResolved,
    onFetchByIdPost,
  }) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [currentTab, setCurrentTab] = useState(0);
    const [currentReport, setCurrentReport] = useState();
    useEffect(() => {
      onFetchResolved({
        pageSize: pageSizeResolved,
        pageNumber: pageResolved,
        status: 'Reviewed',
      });
    }, [onFetchResolved, pageResolved, pageSizeResolved]);
    useEffect(() => {
      onFetchNoResolved({
        pageSize: pageSizeNoResolved,
        pageNumber: pageNoResolved,
        status: 'Waiting',
      });
    }, [pageNoResolved, onFetchNoResolved, pageSizeNoResolved]);
    useEffect(() => {
      if (currentReport) {
        onFetchByIdPost(currentReport.postId);
      }
    }, [currentReport, onFetchByIdPost]);
    const handleOnPressResolved = (item) => {
      setCurrentReport(item);
      onOpen();
    };
    const handleOnPressResolvedModal = (text) => {
      onEdit(currentReport.id, {
        resolution: text,
        status: 'Reviewed',
      });
      onClose();
    };
    return (
      permissions && (
        <Container maxW="full">
          <ModalResolution
            isOpen={isOpen}
            onClose={onClose}
            isFetching={postStatus.isFetching}
            post={post}
            onPressResolved={handleOnPressResolvedModal}
          />
          <Tabs onChange={setCurrentTab} isFitted variant="unstyled">
            <TabList>
              <Tab _selected={{color: 'white', bg: 'green.100'}}>
                <Text fontSize="16px" fontWeight="600">
                  Sin revisar
                </Text>
              </Tab>
              <Tab _selected={{color: 'white', bg: 'green.100'}}>
                <Text fontSize="16px" fontWeight="600">
                  Revisados
                </Text>
              </Tab>
            </TabList>
          </Tabs>
          {currentTab === 0 ? (
            <ClaimsComponent
              items={reportsNoResolved}
              onPressResolve={handleOnPressResolved}
            />
          ) : (
            <ClaimsComponent items={reportsResolved} />
          )}
          {currentTab === 0 ? (
            <Pagination
              {...reportsNoResolved}
              onChangePage={(page) => onChangePageNoResolved(page)}
              onSetPageSize={(pageS) => onChangeSizeNoResolved(pageS)}
            />
          ) : (
            <Pagination
              {...reportsResolved}
              onChangePage={(page) => onChangePageResolved(page)}
              onSetPageSize={(pageS) => onChangeSizeResolved(pageS)}
            />
          )}
        </Container>
      )
    );
  },
);

Claims.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    reportsResolved: selectReportsResolved(state),
    reportsNoResolved: selectReportsUnResolved(state),
    pageSizeResolved: selectPageSizeResolved(state),
    pageResolved: selectPagePageResolved(state),
    pageSizeNoResolved: selectPageSizeNoResolved(state),
    pageNoResolved: selectPagePageNoResolved(state),
    post: selectPost(state),
    postStatus: selectPostStatus(state),
  }),
  {
    onFetchResolved: fetchResolved,
    onFetchNoResolved: fetchNoResolved,
    onEdit: edit,
    onChangePageNoResolved: changePageNoResolved,
    onChangePageResolved: changePageResolved,
    onChangeSizeNoResolved: changeSizeNoResolved,
    onChangeSizeResolved: changeSizeResolved,
    onFetchByIdPost: fetchById,
  },
)(Claims);
