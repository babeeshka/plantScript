import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router';

describe('router/index.ts', () => {
  it('has a home route that uses Home view', () => {
    const router = createRouter({ history: createWebHistory(), routes });
    const homeRoute = router.getRoutes().find(route => route.name === 'home');
    expect(homeRoute).toBeTruthy();
    if (homeRoute) {
      expect(homeRoute.path).toBe('/');
      expect(homeRoute.components?.default?.name).toBe('Home');
    }

  });
});
