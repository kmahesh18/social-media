import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Timeline from '../views/Timeline.vue';
import Users from '../views/Users.vue';
import Explore from '../views/Explore.vue';

const routes = [
  {
    path: '/',
    redirect: '/timeline',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check both token and user state for true authentication
  const isAuthenticated = store.state.isAuthenticated;
  const hasToken = localStorage.getItem('access_token');
  
  if (to.meta.requiresAuth && (!isAuthenticated && !hasToken)) {
    // If route requires auth but user isn't authenticated
    next('/login');
  } else if ((to.name === 'Login' || to.name === 'Signup') && (isAuthenticated || hasToken)) {
    // If trying to access login/signup while already authenticated
    next('/timeline');
  } else {
    next();
  }
});

export default router;
