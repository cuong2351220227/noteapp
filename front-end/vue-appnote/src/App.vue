<template>
  <div>
    <Navbar />
    <div :class="{'app-container': shouldShowSidebar}">
      <SidebarNavigation v-if="shouldShowSidebar" />
      <main :class="{'main-content': shouldShowSidebar}">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SidebarNavigation from './components/SidebarNavigation.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    SidebarNavigation
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
  text-align: left;
}

.app-container {
  display: flex;
  min-height: calc(100vh - 60px);
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>