import IndexPage from './pages/index';

// Dev components
// import ComponentsPage from './pages/components/components.page'

const DEV_ROUTES: Array<Object> = [
  // {
  //   name: 'Components',
  //   path: '/components',
  //   component: ComponentsPage,
  // },
  // {
  //   name: 'ComponentsWithId',
  //   path: '/components/:componentName',
  //   component: ComponentsPage,
  // }
];

const ROUTES: Array<Object> = [
  {
    name: 'Index',
    path: '/',
    component: IndexPage,
    useAsDefault: true
  },
].concat(ENV === 'development' ? DEV_ROUTES : new Array());

export { ROUTES };
