import { createRouter, createWebHistory } from 'vue-router';
import AllPlants from './views/allPlants.vue';
import Home from '@/components/Home.vue';
import Search from '@/components/Search.vue';
import ManagePlant from '@/components/ManagePlant.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/all-plants',
    name: 'AllPlants',
    component: AllPlants
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/manage-plant',
    name: 'ManagePlant',
    component: ManagePlant
  }
  // add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
