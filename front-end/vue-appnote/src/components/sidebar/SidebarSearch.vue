<template>
  <div class="sidebar-search">
    <div class="search-item">
      <span class="icon">🔍</span>
      <span class="text">Tìm kiếm</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarSearch',
  methods: {
    openSearch() {
      // Add search functionality here
      console.log('Opening search...');
    }
  }
}
</script>

<style scoped>
.sidebar-search {
  margin-bottom: 10px;
}

.search-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 3px;
  margin: 0 10px;
  transition: background-color 0.2s;
}

.search-item:hover {
  background-color: #e0e0e0;
}

.icon {
  font-size: 18px;
  margin-right: 10px;
  color: #666;
  width: 20px;
  text-align: center;
}
</style>