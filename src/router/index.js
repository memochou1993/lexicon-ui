import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'teams.index',
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/teams',
    name: 'teams.index',
    component: () => import(/* webpackChunkName: "teams.index" */ '@/views/Team/Index'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/teams/:teamId',
    name: 'teams.show',
    component: () => import(/* webpackChunkName: "teams.show" */ '@/views/Team/Show'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects',
    name: 'projects.index',
    component: () => import(/* webpackChunkName: "projects.index" */ '@/views/Project/Index'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projects/:projectId',
    name: 'projects.show',
    component: () => import(/* webpackChunkName: "projects.show" */ '@/views/Project/Show'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'auth.login',
    component: () => import(/* webpackChunkName: "auth.login" */ '@/views/Auth/Login'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/logout',
    name: 'auth.logout',
    component: () => import(/* webpackChunkName: "auth.logout" */ '@/views/Auth/Logout'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    name: '',
    redirect: {
      name: 'home',
    },
  },
];

const router = new VueRouter({
  routes,
});

const token = process.env.VUE_APP_API_DEMO_TOKEN || null;

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requiresAuth) && !token) {
    return next({
      name: 'auth.login',
    });
  }

  if (to.matched.some((r) => !r.meta.requiresAuth) && token) {
    return next({
      name: 'home',
    });
  }

  return next();
});

export default router;
