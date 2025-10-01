import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  // Main Navigation Routes
  {
    path: '/home',
    name: 'dashboard',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/ai',
    name: 'notionAI',
    component: () => import('../views/NotionAIView.vue')
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: () => import('../views/InboxView.vue')
  },
  // Private Section Routes
  {
    path: '/new-page',
    name: 'newPage',
    component: () => import('../views/NewPageView.vue')
  },
  {
    path: '/class-notes',
    name: 'classNotes',
    component: () => import('../views/ClassNotesView.vue')
  },
  {
    path: '/study-plan',
    name: 'studyPlan',
    component: () => import('../views/StudyPlanView.vue')
  },
  // Shared Section Routes
  {
    path: '/collaboration',
    name: 'collaboration',
    component: () => import('../views/CollaborationView.vue')
  },
  // Footer Navigation Routes
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  },
  {
    path: '/marketplace',
    name: 'marketplace',
    component: () => import('../views/MarketplaceView.vue')
  },
  {
    path: '/trash',
    name: 'trash',
    component: () => import('../views/TrashView.vue')
  },
  // Admin Routes
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminDashboardNew.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router