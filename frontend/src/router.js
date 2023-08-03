import { createRouter, createWebHistory } from 'vue-router';
import AllPlants from './views/allPlants.vue';

const routes = [
  {
    path: '/all-plants',
    name: 'allPlants',
    component: AllPlants
  },
  // You can add more routes here as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
