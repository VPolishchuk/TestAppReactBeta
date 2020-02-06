// features
import SingInForm from './features/auth';
import HomeComponent from './features/home'
/////////////////////////////////////////////////////////////////////////////////////////////

export default [
  {
    exact: true,
    name: 'SingInForm',
    component: SingInForm,
    path: '/sing-in',
  },
  {
    exact: true,
    name: 'app',
    path: '/',
    component: HomeComponent,
  },
];
