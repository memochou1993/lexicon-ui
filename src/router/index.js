import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/teams',
    name: 'teams.index',
    component: () => import('@/views/team/Index.vue'),
    meta: {
      // requiresVisitor: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
