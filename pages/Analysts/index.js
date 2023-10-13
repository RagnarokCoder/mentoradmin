import {Container} from '@chakra-ui/react';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {connect} from 'react-redux';
import {HomeLayout} from '../../layouts';
import {selectIsPermissions} from '../../state/selectors/users';
import ManagerUser from '../../components/ManagerUser';

const Analysts = withAuthenticationRequired(
  ({permissions}) =>
    permissions && (
      <Container maxW="full">
        <ManagerUser role="analist" />
      </Container>
    ),
);

Analysts.Layout = HomeLayout;

export default connect(
  (state) => ({
    permissions: selectIsPermissions(state),
  }),
  null,
)(Analysts);
