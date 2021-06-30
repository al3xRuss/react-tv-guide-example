import { combineReducers } from "redux";
import guide from "./guide.reducer";
import permissionsReducer from "./permissions";
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

export default combineReducers({
  guide,
  permissionsReducer,
  authentication,
  registration,
  users,
  alert
});
