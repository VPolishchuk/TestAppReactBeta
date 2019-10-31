// features
import App from './components/App';
import SingInForm from './features/auth';
import ItemListComponent from './features/item-list'
// global
import * as GC from './global/constants';
/////////////////////////////////////////////////////////////////////////////////////////////

export default [
  {
    name: 'SingInForm',
    component: SingInForm,
    path: GC.ROUTE_PATH_SING_IN,
  },
  {
    exact: true,
    name: 'app',
    path: GC.ROUTE_PATH_HOME,
    component: ItemListComponent,
  },
];
