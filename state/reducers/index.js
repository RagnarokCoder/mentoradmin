import {combineReducers} from 'redux';
import competition from './competition';
import team from './team';
import sport from './sport';
import users from './users';
import subscriptions from './subscriptions';
import language from './language';
import country from './country';
import notifications from './notifications';
import picks from './picks';
import post from './post';
import discount from './discount';
import admin from './admin';
import report from './report';
import userSubscriptionReport from './userSubscriptionReport';

export default combineReducers({
  competition,
  team,
  sport,
  users,
  subscriptions,
  language,
  country,
  notifications,
  picks,
  post,
  discount,
  admin,
  report,
  userSubscriptionReport,
});
