import {useEffect} from 'react';
import {Container, Stack} from '@chakra-ui/react';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import {selectIsPermissions} from '../../state/selectors/users';
import {
  fetch,
  setDefaultState,
} from '../../state/actions/userSubscriptionReport';
import {
  selectUserSubscriptionReportStatus,
  selectUserSubscriptionReportFile,
} from '../../state/selectors/userSubscriptionReport';
import {HomeLayout} from '../../layouts';
import {saveAs} from 'file-saver';

const Report = ({
  permissions,
  status,
  file,
  onFetchSubscriptionReport,
  onDefaultState,
}) => {
  useEffect(() => {
    if (file) {
      saveAs(file, 'reporte.xlsx');
      onDefaultState();
    }
  }, [file, onDefaultState]);
  return (
    permissions && (
      <Container maxW="full">
        {status.isFetching && <Loading />}
        <Stack align="flex-start">
          <Button onClick={onFetchSubscriptionReport}>
            Generar reporte de suscripciones compradas
          </Button>
        </Stack>
      </Container>
    )
  );
};

Report.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
    status: selectUserSubscriptionReportStatus(state),
    file: selectUserSubscriptionReportFile(state),
  }),
  {
    onFetchSubscriptionReport: fetch,
    onDefaultState: setDefaultState,
  },
)(Report);
