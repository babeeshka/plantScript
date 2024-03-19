import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Home from '@/views/Home.vue';

const PlantGallery = () => import('@/views/PlantGallery.vue');
const PlantDetail = defineAsyncComponent(() => import('@/components/PlantDetail.vue'));
const PlantSearchPage = defineAsyncComponent(() => import('@/views/PlantSearchPage.vue'));

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/plant/:id', name: 'plant-detail', component: PlantDetail, props: true },
  { path: '/search', name: 'plant-search', component: PlantSearchPage },
  { path: '/gallery', name: 'plant-gallery', component: PlantGallery },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;