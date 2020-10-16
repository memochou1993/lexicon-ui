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
    component: () => import(/* webpackChunkName: "teams.index" */ '@/views/Team/Index.vue'),
    meta: {
      // requiresVisitor: true,
    },
  },
  {
    path: '/teams/:teamId',
    name: 'teams.show',
    component: () => import(/* webpackChunkName: "teams.show" */ '@/views/Team/Show.vue'),
    meta: {
      // requiresVisitor: true,
    },
  },
  {
    path: '/projects/:projectId',
    name: 'projects.show',
    component: () => import(/* webpackChunkName: "projects.show" */ '@/views/Project/Show.vue'),
    meta: {
      // requiresVisitor: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
