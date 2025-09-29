<template>
  <div class="marketplace-view">
    <h1>Thị trường</h1>
    <div class="marketplace-container">
      <div class="marketplace-filters">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Tìm kiếm mẫu, plugin..."
            @input="filterItems"
          >
        </div>
        <div class="category-filters">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-btn', { active: selectedCategory === category.id }]"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="marketplace-items">
        <div 
          v-for="item in filteredItems" 
          :key="item.id" 
          class="marketplace-item"
        >
          <div class="item-preview" :style="{ backgroundColor: item.previewColor }">
            {{ item.icon }}
          </div>
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <div class="item-meta">
              <span class="item-author">{{ item.author }}</span>
              <span class="item-rating">⭐ {{ item.rating }}/5</span>
            </div>
          </div>
          <button @click="installItem(item)" class="install-button">
            {{ item.installed ? 'Đã cài đặt' : 'Cài đặt' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketplaceView',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      categories: [
        { id: 'all', name: 'Tất cả' },
        { id: 'templates', name: 'Mẫu' },
        { id: 'plugins', name: 'Plugin' },
        { id: 'themes', name: 'Giao diện' }
      ],
      items: [
        {
          id: 1,
          name: 'Mẫu học tập',
          description: 'Mẫu tổ chức ghi chú học tập hiệu quả',
          author: 'Education Team',
          rating: 4.8,
          category: 'templates',
          installed: false,
          icon: '📚',
          previewColor: '#e6f3ff'
        },
        {
          id: 2,
          name: 'Dark Mode Pro',
          description: 'Giao diện tối chuyên nghiệp',
          author: 'Theme Studio',
          rating: 4.9,
          category: 'themes',
          installed: true,
          icon: '🌙',
          previewColor: '#2d3748'
        },
        {
          id: 3,
          name: 'Auto Backup',
          description: 'Tự động sao lưu ghi chú của bạn',
          author: 'Security Plus',
          rating: 4.7,
          category: 'plugins',
          installed: false,
          icon: '🔄',
          previewColor: '#f0fff4'
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    filterItems() {
      // Filtering is handled by computed property
    },
    installItem(item) {
      if (!item.installed) {
        item.installed = true;
        // Add installation logic here
        console.log(`Installing ${item.name}...`);
      }
    }
  }
}
</script>

<style scoped>
.marketplace-view {
  padding: 20px;
}

.marketplace-container {
  margin-top: 20px;
}

.marketplace-filters {
  margin-bottom: 30px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  width: 100%;
  max-width: 600px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  background-color: #f3f4f6;
}

.category-btn.active {
  background-color: #2563eb;
  color: white;
  border-color: #2563eb;
}

.marketplace-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.marketplace-item {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.marketplace-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-preview {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.item-info {
  padding: 20px;
}

.item-info h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
}

.item-info p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 14px;
}

.install-button {
  width: 100%;
  padding: 12px;
  border: none;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.install-button:hover {
  background-color: #1d4ed8;
}

.marketplace-item:has(.install-button:disabled) .install-button {
  background-color: #94a3b8;
  cursor: default;
}
</style>