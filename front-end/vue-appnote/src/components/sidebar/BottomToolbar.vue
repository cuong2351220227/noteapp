<template>
  <div class="bottom-toolbar">
    <span 
      v-for="item in toolbarItems" 
      :key="item.id"
      :class="['toolbar-item', { 'active-box': item.active }]"
      @click="selectTool(item)"
    >
      {{ item.icon }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'BottomToolbar',
  data() {
    return {
      toolbarItems: [
        { id: 1, icon: 'N', active: false },
        { id: 2, icon: '🗓️', active: false },
        { id: 3, icon: '✈️', active: false },
        { id: 4, icon: '📦', active: true },
        { id: 5, icon: '❓', active: false }
      ]
    }
  },
  methods: {
    selectTool(item) {
      this.toolbarItems.forEach(toolItem => {
        toolItem.active = toolItem.id === item.id;
      });
      // Add your toolbar action here
      console.log(`Selected tool: ${item.icon}`);
    }
  }
}
</script>

<style scoped>
.bottom-toolbar {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  background-color: #fff;
  position: sticky;
  bottom: 0;
}

.toolbar-item {
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 3px;
}

.toolbar-item:hover {
  background-color: #eee;
}

.toolbar-item.active-box {
  background-color: #d3d3d3;
  color: #333;
}
</style>