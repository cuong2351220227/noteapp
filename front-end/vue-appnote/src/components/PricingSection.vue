<template>
  <section class="pricing">
    <div class="pricing-content">
      <!-- Background Effects -->
      <div class="bg-effects">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>

      <!-- Header Section -->
      <div class="pricing-header">
        <div class="header-badge">
          <span>Giải pháp AI toàn diện</span>
        </div>
        <h2 class="main-title">
          Giảm công cụ. Tăng hiệu suất.
        </h2>
        <p class="subtitle">
          Tập hợp mọi công cụ AI về cùng một nơi để tăng năng suất lên 3x
        </p>
      </div>
      
      <!-- Pricing Card -->
      <div class="price-container">
        <div class="price-card">
          <!-- Premium Badge -->
          <div class="premium-badge">
            <span class="badge-text">Tiết kiệm</span>
            <span class="badge-amount">4.080 US$</span>
          </div>
          
          <!-- Price Display -->
          <div class="price-display">
            <div class="price-wrapper">
              <span class="currency">$</span>
              <span class="price-amount">340</span>
              <span class="price-period">/tháng</span>
            </div>
            <div class="price-note">Thanh toán hàng năm</div>
          </div>

          <!-- Savings Highlight -->
          <div class="savings-highlight">
            <div class="savings-icon">💰</div>
            <div class="savings-content">
              <span class="savings-label">Tiết kiệm hằng năm</span>
              <span class="savings-amount">4.080 US$</span>
            </div>
          </div>
          
          <!-- Features List -->
          <div class="features-list">
            <div class="feature-item" v-for="(feature, index) in features" :key="index">
              <div class="feature-icon">{{ feature.icon }}</div>
              <div class="feature-content">
                <span class="feature-title">{{ feature.title }}</span>
                <span class="feature-desc">{{ feature.desc }}</span>
              </div>
            </div>
          </div>
          
          <!-- CTA Button -->
          <button class="cta-button" @click="handleStartNow">
            <span class="button-content">
              <span class="button-text">Bắt đầu ngay</span>
              <span class="button-icon">→</span>
            </span>
            <div class="button-glow"></div>
          </button>

          <!-- Trust Indicators -->
          <div class="trust-indicators">
            <span class="trust-item">✅ Hủy bất cứ lúc nào</span>
            <span class="trust-item">🛡️ Bảo mật 100%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PricingSection",
  data() {
    return {
      features: [
        {
          icon: "🤖",
          title: "Tất cả công cụ AI tích hợp",
          desc: "ChatGPT, Claude, Midjourney & hơn 50 công cụ khác"
        },
        {
          icon: "⚡",
          title: "Tăng hiệu suất lên 3x",
          desc: "Tự động hóa workflow và tối ưu quy trình làm việc"
        },
        {
          icon: "🚀",
          title: "Hỗ trợ 24/7",
          desc: "Đội ngũ chuyên gia sẵn sàng hỗ trợ mọi lúc"
        }
      ]
    }
  },
  methods: {
    handleStartNow() {
      // Handle CTA button click
      console.log('Starting subscription...');
    }
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --dark-bg: #0f0f23;
  --card-bg: rgba(255, 255, 255, 0.05);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --text-primary: #ffffff;
  --text-secondary: #e2e8f0;
  --text-muted: #cbd5e1;
  --border-glass: rgba(255, 255, 255, 0.2);
  --shadow-glow: 0 0 50px rgba(102, 126, 234, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pricing {
  min-height: 100vh;
  padding: 80px 20px;
  background: 
    radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50%),
    linear-gradient(135deg, var(--dark-bg) 0%, #1a1a3a 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pricing-content {
  max-width: 600px;
  width: 100%;
  position: relative;
  z-index: 10;
}

/* Background Effects */
.bg-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: var(--primary-gradient);
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: var(--secondary-gradient);
  bottom: 20%;
  left: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: var(--success-gradient);
  top: 60%;
  right: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-15px, 15px) scale(0.9);
  }
  75% {
    transform: translate(10px, -10px) scale(1.05);
  }
}

/* Header Styling */
.pricing-header {
  text-align: center;
  margin-bottom: 60px;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 24px;
  backdrop-filter: blur(20px);
}

.badge-icon {
  font-size: 16px;
}

.main-title {
  font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

/* Remove unused gradient-text class */

.subtitle {
  color: #0f0f23;
  font-size: 18px;
  
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Price Card */
.price-container {
  display: flex;
  justify-content: center;
}

.price-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(19, 16, 16, 0.3);
  border-radius: 24px;
  padding: 40px;
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-glow);
  position: relative;
  width: 100%;
  max-width: 480px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.price-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 80px rgba(102, 126, 234, 0.4);
}

/* Premium Badge */
.premium-badge {
  position: absolute;
  top: -1px;
  right: 30px;
  background: var(--primary-gradient);
  color: white;
  padding: 12px 24px;
  border-radius: 0 0 16px 16px;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.badge-text {
  color: #0f0f23;
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.badge-amount {
  color: #0f0f23;
  display: block;
  font-size: 14px;
  margin-top: 2px;
}

/* Price Display */
.price-display {
  text-align: center;
  margin: 40px 0 32px 0;
}

.price-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
}

.currency {
  font-size: 28px;
  color: #6194d7;
  font-weight: 600;
}

.price-amount {
  font-size: 72px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.price-period {
  font-size: 20px;
  color: #315078;
  font-weight: 500;
}

.price-note {
  font-size: 14px;
  color: #3e6696;
}

/* Savings Highlight */
.savings-highlight {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%);
  border: 1px solid rgba(79, 172, 254, 0.2);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.savings-icon {
  font-size: 24px;
}

.savings-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.savings-label {
  font-size: 14px;
  color: #e2e8f0;
}

.savings-amount {
  font-size: 18px;
  font-weight: 700;
  color: #4facfe;
}

/* Features List */
.features-list {
  margin-bottom: 32px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-icon {
  font-size: 24px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--glass-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.feature-desc {
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.4;
}

/* CTA Button */
.cta-button {
  width: 100%;
  background: var(--primary-gradient);
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-size: 18px;
  font-weight: 700;
  color: rgb(23, 4, 4);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 2;
}

.button-icon {
  transition: transform 0.3s ease;
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

.cta-button:hover .button-glow {
  left: 100%;
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.trust-item {
  font-size: 13px;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .pricing {
    padding: 60px 16px;
  }
  
  .price-card {
    padding: 32px 24px;
  }
  
  .price-amount {
    font-size: 56px;
  }
  
  .trust-indicators {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .pricing {
    padding: 40px 12px;
  }
  
  .price-card {
    padding: 24px 20px;
  }
  
  .premium-badge {
    right: 20px;
    padding: 8px 16px;
  }
  
  .feature-item {
    gap: 12px;
  }
  
  .savings-highlight {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-orb,
  .button-glow {
    animation: none;
  }
  
  .price-card:hover,
  .cta-button:hover {
    transform: none;
  }
}

.cta-button:focus {
  outline: 2px solid #4facfe;
  outline-offset: 2px;
}
</style>