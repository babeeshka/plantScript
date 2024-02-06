import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/Home.vue';
import Search from '@/components/Search.vue';
import ManagePlant from '@/components/ManagePlant.vue';
import PlantDetail from '@/views/PlantDetail.vue'; // Assuming this is the correct path

// Define the routes for your application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
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

// Create the router instance and export it
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
