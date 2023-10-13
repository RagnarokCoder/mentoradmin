import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {selectUser} from '../state/selectors/users';
import {roles} from '../utils/constants';

const useRoles = () => {
  const user = useSelector(selectUser);
  const isAdmin = useMemo(
    () => user?.role === roles.admin || user?.role === roles.superadmin,
    [user],
  );
  const isSuperAdmin = useMemo(() => user?.role === roles.superadmin, [user]);
  return {isAdmin, isSuperAdmin};
};

export default useRoles;
