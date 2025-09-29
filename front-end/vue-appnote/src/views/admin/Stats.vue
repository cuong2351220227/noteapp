<template>
  <div class="admin-stats">
    <div class="chart-grid">
      <div class="chart-card">
        <h3>User Growth</h3>
        <div class="chart-container">
          <!-- Line chart for user growth will be rendered here -->
        </div>
      </div>

      <div class="chart-card">
        <h3>Note Creation Activity</h3>
        <div class="chart-container">
          <!-- Bar chart for note creation will be rendered here -->
        </div>
      </div>

      <div class="chart-card">
        <h3>Storage Usage</h3>
        <div class="chart-container">
          <!-- Pie chart for storage distribution will be rendered here -->
        </div>
      </div>

      <div class="chart-card">
        <h3>User Activity</h3>
        <div class="chart-container">
          <!-- Area chart for user activity will be rendered here -->
        </div>
      </div>
    </div>

    <div class="stats-filters">
      <div class="filter-group">
        <label>Time Range</label>
        <select v-model="timeRange">
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Group By</label>
        <select v-model="groupBy">
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminStats',
  data() {
    return {
      timeRange: 'week',
      groupBy: 'day',
      chartData: null
    }
  },
  methods: {
    async fetchChartData() {
      try {
        // TODO: Replace with actual API call
        const response = await this.$http.get('/api/admin/stats/charts', {
          params: {
            timeRange: this.timeRange,
            groupBy: this.groupBy
          }
        });
        this.chartData = response.data;
        this.renderCharts();
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    },
    renderCharts() {
      // TODO: Implement chart rendering using a charting library
      // Consider using Chart.js, ApexCharts, or similar
    }
  },
  watch: {
    timeRange() {
      this.fetchChartData();
    },
    groupBy() {
      this.fetchChartData();
    }
  },
  mounted() {
    this.fetchChartData();
  }
}
</script>

<style scoped>
.admin-stats {
  padding: 20px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.chart-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-card h3 {
  margin: 0;
  margin-bottom: 15px;
  color: #2c3e50;
}

.chart-container {
  height: 300px;
  /* Add styles for chart container */
}

.stats-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 150px;
}
</style>