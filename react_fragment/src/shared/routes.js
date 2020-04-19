import Home from '../client/components/Home';
import Posts from '../client/components/Posts';
import Todos from '../client/components/Todos';
import NotFound from '../client/components/NotFound';

import loadData from './helpers/loadData.js';

const Routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/posts',
    component: Posts,
    loadData: () => loadData('posts')
  },
  {
    path: '/todos',
    component: Todos,
    loadData: () => loadData('todos')
  },
  {
    component: NotFound
  }
];

export default Routes;