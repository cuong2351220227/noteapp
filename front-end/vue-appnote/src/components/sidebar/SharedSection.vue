<template>
  <div>
    <div class="sidebar-section-title">Đã chia sẻ</div>
    <div class="sidebar-shared">
      <div 
        v-for="item in sharedItems" 
        :key="item.id"
        :class="['nav-item', { active: item.active }]"
        @click="navigate(item)"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharedSection',
  data() {
    return {
      sharedItems: [
        { id: 1, name: 'Bắt đầu cộng tác', icon: '➕', active: false, route: '/collaboration' }
      ]
    }
  },
  methods: {
    navigate(item) {
      this.sharedItems.forEach(navItem => {
        navItem.active = navItem.id === item.id;
      });
      this.$router.push(item.route);
    }
  }
}
</script>

<style scoped>
.sidebar-section-title {
  font-size: 12px;
  color: #888;
  padding: 5px 15px;
  margin-top: 15px;
  margin-bottom: 5px;
}

.sidebar-shared {
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