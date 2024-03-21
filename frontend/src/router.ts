import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Home from '@/views/Home.vue';

const PlantGallery = () => import('@/views/PlantGallery.vue');
const PlantSearchPage = defineAsyncComponent(() => import('@/views/PlantSearchPage.vue'));
const ManagePlant = defineAsyncComponent(() => import('@/views/ManagePlant.vue'));

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/search', name: 'plant-search', component: PlantSearchPage },
  { path: '/gallery', name: 'plant-gallery', component: PlantGallery },
  { path: '/manage', name: 'manage-plant', component: ManagePlant, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;