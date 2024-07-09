import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Home from '@/views/Home.vue';

const PlantGallery = () => import('@/views/PlantGallery.vue');
const PlantSearchPage = defineAsyncComponent(() => import('@/views/PlantSearchPage.vue'));
const ManagePlant = () => import('@/views/ManagePlant.vue');
const PlantInfoPage = () => import('@/views/PlantInfoPage.vue');

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/search', name: 'plant-search', component: PlantSearchPage },
  { path: '/gallery', name: 'plant-gallery', component: PlantGallery },
  {
    path: '/plants/:id?/manage',
    name: 'ManagePlant',
    component: ManagePlant,
    props: (route) => ({ id: route.params.id, manualEntry: route.query.manualEntry }),
  },
  {
    path: '/plants/:id/info',
    name: 'PlantInfoPage',
    component: PlantInfoPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;