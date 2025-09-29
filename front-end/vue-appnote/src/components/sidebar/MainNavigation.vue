<template>
  <div class="sidebar-navigation">
    <div 
      v-for="item in navigationItems" 
      :key="item.id"
      :class="['nav-item', { active: item.active }]"
      @click="navigate(item)"
    >
      <span class="icon">{{ item.icon }}</span>
      <span class="text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainNavigation',
  data() {
    return {
      navigationItems: [
        { id: 1, name: 'Trang chủ', icon: '🏠', active: true, route: '/home' },
        { id: 2, name: 'Notion AI', icon: '🧰', active: false, route: '/ai' },
        { id: 3, name: 'Hộp thư đến', icon: '✉️', active: false, route: '/inbox' }
      ]
    }
  },
  methods: {
    navigate(item) {
      this.navigationItems.forEach(navItem => {
        navItem.active = navItem.id === item.id;
      });
      this.$router.push(item.route);
    }
  }
}
</script>

<style scoped>
.sidebar-navigation {
  margin-bottom: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  margin: 0 10px;
  transition: background-color 0.2s;
}

.nav-item:not(.active):hover {
  background-color: #e0e0e0;
}

.nav-item.active {
  background-color: #d3d3d3;
  font-weight: bold;
}

.icon {
  font-size: 18px;
  margin-right: 10px;
  color: #666;
  width: 20px;
  text-align: center;
}
</style>