<template>
  <div class="sidebar-footer-nav">
    <div 
      v-for="item in footerItems" 
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
  name: 'FooterNavigation',
  data() {
    return {
      footerItems: [
        { id: 1, name: 'Cài đặt', icon: '⚙️', active: false, route: '/settings' },
        { id: 2, name: 'Thị trường', icon: '🛒', active: false, route: '/marketplace' },
        { id: 3, name: 'Thùng rác', icon: '🗑️', active: false, route: '/trash' }
      ]
    }
  },
  methods: {
    navigate(item) {
      this.footerItems.forEach(navItem => {
        navItem.active = navItem.id === item.id;
      });
      this.$router.push(item.route);
    }
  }
}
</script>

<style scoped>
.sidebar-footer-nav {
  margin-top: auto;
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