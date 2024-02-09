import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import ManagePlant from '@/components/ManagePlant.vue';
import PlantDetail from '@/views/PlantDetail.vue'; 

// define the routes for your application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchComponent,
  },
  {
    path: '/manage',
    name: 'ManagePlant',
    component: ManagePlant,
  },
  {
    path: '/plants/:id', // :id is a dynamic segment
    name: 'PlantDetail',
    component: PlantDetail,
  }
];

// create the router instance and export it
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
