<template>
  <div>
    <loading-spinner ref="loading" />
    <Navbar />
    <div :class="{'app-container': shouldShowSidebar}">
      <SidebarNavigation v-if="shouldShowSidebar" />
      <main :class="{'main-content': shouldShowSidebar}">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SidebarNavigation from './components/SidebarNavigation.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    SidebarNavigation,
    LoadingSpinner
  },
  mounted() {
    // Router navigation guards
    this.$router.beforeEach((to, from, next) => {
      this.$refs.loading.show();
      next();
    });

    this.$router.afterEach(() => {
      // Thêm một chút delay để loading mượt hơn
      setTimeout(() => {
        this.$refs.loading.hide();
      }, 300);
    });
  },
  computed: {
    shouldShowSidebar() {
      // Danh sách các route cần hiển thị sidebar
      const sidebarRoutes = [
        'dashboard',    // /home
        'notionAI',    // /ai
        'inbox',       // /inbox
        'newPage',     // /new-page
        'classNotes',  // /class-notes
        'studyPlan',   // /study-plan
        'collaboration', // /collaboration
        'settings',    // /settings
        'marketplace', // /marketplace
        'trash'        // /trash
      ];
      return sidebarRoutes.includes(this.$route.name);
    }
  }
}
</script>

<style>
@import './assets/themes.css';

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  margin-top: 0;
  text-align: left;
  background-color: var(--bg-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

.app-container {
  display: flex;
  min-height: calc(100vh - 60px);
  background-color: var(--bg-primary);
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: var(--bg-primary);
}
</style>
