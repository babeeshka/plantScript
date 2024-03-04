import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import PlantDetail from './views/PlantDetail.vue';
import PlantSearchPage from './views/PlantSearchPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/plant/:id', name: 'plant-detail', component: PlantDetail, props: true },
  { path: '/search', name: 'plant-search', component: PlantSearchPage },
  // other routes as necessary
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
