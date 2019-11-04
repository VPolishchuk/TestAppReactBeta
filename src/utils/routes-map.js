// global
import * as GC from '../global/constants';
// helpers
import * as G from '../global/helpers';
///////////////////////////////////////////////////////////////////////////////////////////////////

const routesMap = {
  homePage: GC.ROUTE_PATH_HOME,

  profilePage: (id) => G.replaceKeysToParams(id, GC.ROUTE_PATH_PROFILE),

  signInPage: GC.ROUTE_PATH_SING_IN,
  signUpPage: GC.ROUTE_PATH_SING_UP,
  newPassword: GC.ROUTE_PATH_PASSWORD_RECOVERY,
  recoveryPassword: GC.ROUTE_PATH_RECOVERY_PASSWORD,
};

export default routesMap;
