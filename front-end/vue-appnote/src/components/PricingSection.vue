<template>
  <section class="pricing">
    <div class="pricing-content">
      <div class="pricing-header">
        <h2>Giảm công cụ. Tăng hiệu suất.</h2>
        <p class="pricing-subtitle">Tập hợp mọi công cụ về cùng một nơi.</p>
      </div>
      
      <div class="price-container">
        <div class="price-box">
          <div class="price-badge">
            <span class="badge-text">Tiết kiệm</span>
            <span class="badge-amount">4.080 US$</span>
          </div>
          
          <div class="price-main">
            <div class="price-amount">
              <span class="currency">$</span>
              <span class="amount">340</span>
              <span class="period">/ tháng</span>
            </div>
            
            <div class="price-savings">
              <span class="savings-text">Tiết kiệm hằng năm:</span>
              <span class="savings-amount">4.080 US$</span>
            </div>
          </div>
          
          <div class="price-features">
            <div class="feature-item">
              <span class="feature-icon">✨</span>
              <span>Tất cả công cụ AI tích hợp</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <span>Tăng hiệu suất lên 3x</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💡</span>
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
          
          <button class="cta-button">
            Bắt đầu ngay
            <span class="button-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { 
  name: "PricingSection"
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --pricing-bg: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --accent-blue: #3b82f6;
  --accent-green: #10b981;
  --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.1);
  --border-radius: 20px;
  --border-radius-lg: 24px;
}

.pricing {
  padding: 120px 40px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Decorative background */
.pricing::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 50% 100%, rgba(147, 197, 253, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.pricing::after {
  content: '';
  position: absolute;
  top: 15%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: floatGentle 10s ease-in-out infinite;
}

@keyframes floatGentle {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  50% { 
    transform: translate(-30px, -20px) scale(1.1);
  }
}

.pricing-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
}

/* Header Styling */
.pricing-header {
  margin-bottom: 60px;
}

.pricing h2 {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.pricing-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
}

/* Price Container */
.price-container {
  position: relative;
  display: flex;
  justify-content: center;
}

.price-box {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius-lg);
  padding: 48px 40px;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  max-width: 500px;
  width: 100%;
}

.price-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.02) 0%, 
    rgba(16, 185, 129, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.price-box:hover {
  transform: translateY(-10px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--accent-blue);
}

.price-box:hover::before {
  opacity: 1;
}

/* Price Badge */
.price-badge {
  position: absolute;
  top: -1px;
  right: 24px;
  background: var(--accent-gradient);
  color: white;
  padding: 8px 20px;
  border-radius: 0 0 12px 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge-text {
  display: block;
}

.badge-amount {
  display: block;
  font-size: 14px;
  opacity: 0.9;
}

/* Price Main */
.price-main {
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
}

.price-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
}

.currency {
  font-size: 24px;
  color: var(--text-secondary);
  font-weight: 600;
  margin-right: 4px;
}

.amount {
  font-size: 64px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  background: var(--accent-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.period {
  font-size: 18px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-left: 8px;
}

.price-savings {
  padding: 12px 20px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.savings-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.savings-amount {
  font-size: 18px;
  color: var(--accent-green);
  font-weight: 700;
}

/* Price Features */
.price-features {
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
}

.feature-item {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  padding: 12px 0;
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-icon {
  font-size: 20px;
  margin-right: 12px;
  animation: bounce 2s infinite;
}

.feature-item:nth-child(2) .feature-icon {
  animation-delay: 0.2s;
}

.feature-item:nth-child(3) .feature-icon {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-4px);
  }
  60% {
    transform: translateY(-2px);
  }
}

/* CTA Button */
.cta-button {
  background: var(--accent-gradient);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.cta-button::before {
  content: '';
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
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.cta-button:hover::before {
  left: 100%;
}

.button-arrow {
  transition: transform 0.3s ease;
}

.cta-button:hover .button-arrow {
  transform: translateX(4px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .pricing {
    padding: 80px 20px;
  }
  
  .pricing-header {
    margin-bottom: 40px;
  }
  
  .price-box {
    padding: 32px 24px;
    margin: 0 16px;
  }
  
  .amount {
    font-size: 48px;
  }
  
  .price-badge {
    right: 16px;
  }
  
  .feature-item {
    font-size: 15px;
  }
  
  .cta-button {
    padding: 14px 28px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .pricing {
    padding: 60px 16px;
  }
  
  .price-box {
    padding: 24px 20px;
    margin: 0 8px;
  }
  
  .amount {
    font-size: 40px;
  }
  
  .pricing-subtitle {
    font-size: 18px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .pricing::after,
  .feature-icon,
  .cta-button::before {
    animation: none;
  }
  
  .price-box:hover,
  .cta-button:hover {
    transform: none;
  }
}

/* Focus styles */
.cta-button:focus {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
</style>