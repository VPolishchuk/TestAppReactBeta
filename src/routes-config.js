import * as C from './global/constants'
// features
import SingInForm from './features/auth';
import HomeComponent from './features/home';
import ListComponent from './features/item-list/index';
import DetailPageComponent from './features/item-list/component/detail-page';
/////////////////////////////////////////////////////////////////////////////////////////////

export default [
  {
    exact: true,
    name: 'SingInForm',
    component: SingInForm,
    path: C.ROUTE_PATH_SING_IN,
  },
  {
    name: 'app',
    path: '/',
    component: HomeComponent,
    routes: [
      {
        exact: true,
        component: ListComponent,
        path: C.ROUTE_PATH_LIST,
      },
      {
        exact: true,
        component: DetailPageComponent,
        path: C.ROUTE_PATH_DETAILS,
      },
    ]
  },
];
