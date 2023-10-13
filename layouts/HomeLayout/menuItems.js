import Cup from '../../assets/Icons/Cup';
import Chart from '../../assets/Icons/Chart';
import StarBox from '../../assets/Icons/StarBox';
import Community from '../../assets/Icons/Community';
import Notification from '../../assets/Icons/Notification';
import Profile from '../../assets/Icons/Profile';
import Star from '../../assets/Icons/Star';
import Logout from '../../assets/Icons/Logout';
import Discount from '../../assets/Icons/Discount';
import {roles} from '../../utils/constants';

export const menuItems = {
  body: [
    {
      text: 'Suscripciones',
      path: '/Subscriptions',
      icon: StarBox,
      roles: [roles.admin, roles.analist, roles.superadmin],
      children: [
        {
          path: '/Subscriptions/SubscriptionManager',
          roles: [roles.admin, roles.superadmin],
        },
        {
          path: '/Subscriptions/GiveSubscription',
          roles: [roles.admin, roles.superadmin],
        },
      ],
    },
    {
      text: 'Control de apuestas',
      path: '/Bettingcontrol',
      icon: Chart,
      roles: [roles.admin, roles.analist, roles.superadmin],
      children: [
        {
          path: '/Bettingcontrol/BettingControlManager',
          roles: [roles.admin, roles.analist, roles.superadmin],
        },
      ],
    },
    {
      text: 'Picks',
      path: '/Picks',
      icon: Profile,
      roles: [roles.admin, roles.analist, roles.superadmin],
      children: [
        {
          path: '/Picks/PickManager',
          roles: [roles.admin, roles.analist, roles.superadmin],
        },
      ],
    },
    {
      text: 'Equipos',
      path: '/Teams',
      icon: Cup,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Competencias',
      path: '/Competitions',
      icon: Cup,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Comunidad',
      path: '/Community',
      icon: Community,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Notificaciones',
      path: '/Notifications',
      icon: Notification,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Descuentos',
      path: '/Discount',
      icon: Discount,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Reclamos',
      path: '/Claims',
      icon: Chart,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Analistas',
      path: '/Analysts',
      icon: Chart,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Usuarios',
      path: '/Users',
      icon: Profile,
      roles: [roles.admin, roles.superadmin],
    },
    {
      text: 'Administradores',
      path: '/Administrators',
      icon: Star,
      roles: [roles.superadmin],
    },
    {
      text: 'Reporte',
      path: '/Report',
      icon: Chart,
      roles: [roles.superadmin, roles.admin],
    },
  ],
  logout: {text: 'Logout', icon: Logout},
};
