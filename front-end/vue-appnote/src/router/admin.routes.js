import { createRouter, createWebHistory } from 'vue-router';
import { adminGuard } from './guards/adminGuard';
import AdminDashboard from '@/views/AdminDashboard.vue';

const routes = [
  // ... các route hiện tại của bạn ...
  
  // Admin routes
  {
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: adminGuard,
    children: [
      {
        path: '',
        name: 'admin-overview',
        component: () => import('@/views/admin/Overview.vue')
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/views/admin/Users.vue')
      },
      {
        path: 'statistics',
        name: 'admin-statistics',
        component: () => import('@/views/admin/Statistics.vue')
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/views/admin/Settings.vue')
      }
    ]
  }
];