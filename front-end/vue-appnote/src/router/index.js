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
    component: () => import('../views/AdminDashboardNew.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Kiểm tra authentication
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }
  
  // Kiểm tra admin role
  if (to.meta.requiresAdmin) {
    const userStr = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (!token || !userStr) {
      next('/login')
      return
    }
    
    try {
      const user = JSON.parse(userStr)
      if (!user || user.role !== 'admin') {
        console.log('User is not admin:', user)
        next('/home')
        return
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      next('/login')
      return
    }
  }
  
  next()
})

export default router