<template>
  <section class="features">
    <!-- Animated Background -->
    <div class="features-background">
      <div class="gradient-mesh">
        <div class="mesh-gradient mesh-1"></div>
        <div class="mesh-gradient mesh-2"></div>
        <div class="mesh-gradient mesh-3"></div>
      </div>
      
      <!-- Floating Elements -->
      <div class="floating-elements">
        <div class="float-element element-1"></div>
        <div class="float-element element-2"></div>
        <div class="float-element element-3"></div>
        <div class="float-element element-4"></div>
      </div>
      
      <!-- Grid Pattern -->
      <div class="grid-pattern"></div>
      
      <!-- Light Effects -->
      <div class="light-effects">
        <div class="light-beam beam-1"></div>
        <div class="light-beam beam-2"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="features-content">
      <!-- Section Header -->
      <div class="section-header" data-aos="fade-up">
        <div class="header-badge">
          <div class="badge-glow"></div>
          <div class="badge-content">
            <div class="badge-icon">⚡</div>
            <span>Tính năng nổi bật</span>
          </div>
        </div>
        
        <h2 class="section-title">
          <span class="title-main">Tạm biệt những việc vặt không tên</span>
          
        </h2>
        
        <p class="section-subtitle">
          Để AI xử lý những công việc lặp đi lặp lại, bạn tập trung vào những điều thực sự quan trọng
        </p>
      </div>

      <!-- Features Grid -->
      <div class="features-grid" data-aos="fade-up" data-aos-delay="200">
        <div 
          class="feature-card" 
          v-for="(item, index) in features" 
          :key="index"
          :data-aos-delay="300 + (index * 100)"
          data-aos="zoom-in"
        >
          <div class="card-background"></div>
          <div class="card-content">
            <div class="feature-icon">
              <div class="icon-background"></div>
              <div class="icon-wrapper">
                <span class="icon">{{ getFeatureIcon(index) }}</span>
              </div>
              <div class="icon-glow"></div>
            </div>
            
            <div class="feature-text">
              <h3 class="feature-title">{{ getFeatureTitle(index) }}</h3>
              <p class="feature-description">{{ item }}</p>
            </div>
            
            <div class="feature-arrow">
              <div class="arrow-icon">→</div>
            </div>
          </div>
          
          <!-- Card Decorations -->
          <div class="card-decorations">
            <div class="decoration deco-1"></div>
            <div class="decoration deco-2"></div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="features-cta" data-aos="fade-up" data-aos-delay="800">
        <div class="cta-content">
          <h3 class="cta-title">Sẵn sàng tăng tốc công việc?</h3>
          <p class="cta-subtitle">Khám phá thêm tính năng và bắt đầu ngay hôm nay</p>
          <button class="cta-button">
            <span class="btn-content">
              <span>Khám phá thêm</span>
            </span>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FeaturesSection",
  data() {
    return {
      features: [
        "Tìm kiếm câu trả lời từ ứng dụng của tôi một cách thông minh và nhanh chóng",
        "Biến các buổi họp thành đề xuất hành động cụ thể",
        "Sắp xếp và tối ưu hóa không gian làm việc của tôi",
        "Đào tạo nhập môn cho nhân sự mới một cách hiệu quả",
        "Tạo một trang web chuyên nghiệp và tối ưu",
        "Theo dõi và quản lý các nhà hàng yêu thích",
        "Cập nhật kế hoạch dự án hằng tuần tự động",
        "Cập nhật kế hoạch dự án hằng tuần tự động"
      ]
    }
  },
  methods: {
    getFeatureIcon(index) {
      const icons = ['🔍', '💡', '🏢', '🎓', '🌐', '🍽️', '📋','📋'];
      return icons[index] || '✨';
    },
    getFeatureTitle(index) {
      const titles = [
        'Tìm kiếm thông minh',
        'Họp hiệu quả',
        'Tổ chức workspace',
        'Đào tạo AI',
        'Thiết kế web',
        'Quản lý sở thích',
        'Theo dõi dự án',
        'Theo dõi dự án'
      ];
      return titles[index] || 'Tính năng AI';
    }
  },
  mounted() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
}
</script>

<style scoped>
/* Import Google Fonts to match Hero Section */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* CSS Variables - Matching Hero Section */
:root {
  /* Colors */
  --features-bg: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  
  /* Brand Colors */
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --secondary-500: #8b5cf6;
  --accent-500: #06b6d4;
  --accent-400: #22d3ee;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  --gradient-secondary: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  --gradient-text: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-bg: linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 70%, #ffffff 100%);
  
  /* Shadows */
  --shadow-soft: 0 2px 20px rgba(99, 102, 241, 0.08);
  --shadow-medium: 0 8px 40px rgba(99, 102, 241, 0.12);
  --shadow-strong: 0 20px 80px rgba(99, 102, 241, 0.16);
  --shadow-glow: 0 0 40px rgba(99, 102, 241, 0.3);
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  
  /* Typography */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-title: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', Consolas, Monaco, 'Courier New', monospace;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  
  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Main Section */
.features {
  position: relative;
  padding: var(--space-3xl) var(--space-lg);
  background: var(--gradient-bg);
  overflow: hidden;
  font-family: var(--font-primary);
}

/* Background Elements */
.features-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* Gradient Mesh */
.gradient-mesh {
  position: absolute;
  inset: -30%;
  opacity: 0.1;
}

.mesh-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: meshFloat 15s ease-in-out infinite;
}

.mesh-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.mesh-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: 20%;
  left: 15%;
  animation-delay: 5s;
}

.mesh-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  top: 60%;
  left: 60%;
  animation-delay: 10s;
}

@keyframes meshFloat {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(40px, -40px) scale(1.1) rotate(120deg); }
  66% { transform: translate(-30px, 30px) scale(0.9) rotate(240deg); }
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  inset: 0;
}

.float-element {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.05;
  animation: floatMove 12s ease-in-out infinite;
}

.element-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  top: 70%;
  right: 20%;
  animation-delay: 3s;
}

.element-3 {
  bottom: 30%;
  left: 70%;
  animation-delay: 6s;
}

.element-4 {
  top: 40%;
  right: 80%;
  animation-delay: 9s;
}

@keyframes floatMove {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.05;
  }
  50% {
    transform: translateY(-30px) translateX(20px) scale(1.2);
    opacity: 0.15;
  }
}

/* Grid Pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridSlide 25s linear infinite;
}

@keyframes gridSlide {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

/* Light Effects */
.light-effects {
  position: absolute;
  inset: 0;
}

.light-beam {
  position: absolute;
  width: 1px;
  height: 60%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(99, 102, 241, 0.2) 50%, 
    transparent 100%);
  animation: beamGlow 6s ease-in-out infinite;
}

.beam-1 {
  left: 30%;
  top: 20%;
  animation-delay: 0s;
}

.beam-2 {
  right: 40%;
  top: 10%;
  animation-delay: 3s;
}

@keyframes beamGlow {
  0%, 100% {
    opacity: 0;
    transform: scaleY(0.3);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Content */
.features-content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  margin: 20px;
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.header-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50px;
  margin-bottom: var(--space-lg);
  transition: all var(--transition-medium);
  cursor: pointer;
}

.header-badge:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  border-color: rgba(99, 102, 241, 0.4);
}

.badge-glow {
  position: absolute;
  inset: -1px;
  background: var(--gradient-primary);
  border-radius: inherit;
  z-index: -1;
  opacity: 0;
  transition: opacity var(--transition-medium);
}

.header-badge:hover .badge-glow {
  opacity: 0.1;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.badge-icon {
  font-size: 16px;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

.section-title {
  font-family: var(--font-title);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.title-main {
  display: block;
}

.title-highlight {
  background: var(--gradient-text);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.title-highlight::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
  animation: underlineGrow 1s ease-out 0.8s forwards;
  transform: scaleX(0);
}

@keyframes underlineGrow {
  to { transform: scaleX(1); }
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-3xl);
}

/* Feature Card */
.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: all var(--transition-slow);
  cursor: pointer;
  overflow: hidden;
  min-height: 200px;
}

.feature-card:hover {
  transform: translateY(-12px) rotateX(2deg);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: var(--shadow-strong);
}

.card-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(99, 102, 241, 0.02) 0%,
    rgba(139, 92, 246, 0.02) 50%,
    rgba(6, 182, 212, 0.02) 100%);
  opacity: 0;
  transition: opacity var(--transition-medium);
}

.feature-card:hover .card-background {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* Feature Icon */
.feature-icon {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-md);
}

.icon-background {
  position: absolute;
  inset: 0;
  background: var(--gradient-secondary);
  border-radius: 50%;
  transition: all var(--transition-medium);
}

.feature-card:hover .icon-background {
  background: var(--gradient-primary);
  transform: scale(1.1);
}

.icon-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 2;
}

.icon {
  font-size: 32px;
  transition: all var(--transition-medium);
}

.feature-card:hover .icon {
  transform: scale(1.2);
  filter: brightness(0) invert(1);
}

.icon-glow {
  position: absolute;
  inset: -10px;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0;
  filter: blur(20px);
  transition: opacity var(--transition-medium);
}

.feature-card:hover .icon-glow {
  opacity: 0.3;
}

/* Feature Text */
.feature-text {
  text-align: center;
  flex: 1;
}

.feature-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-sm);
  transition: color var(--transition-medium);
}

.feature-card:hover .feature-title {
  color: var(--primary-600);
}

.feature-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Feature Arrow */
.feature-arrow {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  font-size: 16px;
  color: var(--primary-600);
  transition: all var(--transition-medium);
  opacity: 0;
  transform: translateY(10px);
}

.feature-card:hover .arrow-icon {
  opacity: 1;
  transform: translateY(0) translateX(4px);
  background: var(--primary-600);
  color: white;
}

/* Card Decorations */
.card-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gradient-primary);
  opacity: 0;
  transition: all var(--transition-slow);
}

.deco-1 {
  top: 20px;
  right: 20px;
  animation: decorationFloat1 3s ease-in-out infinite;
}

.deco-2 {
  bottom: 20px;
  left: 20px;
  animation: decorationFloat2 3s ease-in-out infinite 1.5s;
}

.feature-card:hover .decoration {
  opacity: 0.2;
}

@keyframes decorationFloat1 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.2); }
}

@keyframes decorationFloat2 {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(10px) scale(1.2); }
}

/* Bottom CTA */
.features-cta {
  text-align: center;
  padding: var(--space-xl);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.features-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  opacity: 0.02;
  transition: opacity var(--transition-medium);
}

.features-cta:hover::before {
  opacity: 0.05;
}

.cta-content {
  margin: 20px;
  position: relative;
  z-index: 2;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-sm);
}

.cta-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0 0 var(--space-lg);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-medium);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-strong);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  position: relative;
  z-index: 2;
}

.btn-icon {
  font-size: 18px;
  transition: transform var(--transition-medium);
}

.cta-button:hover .btn-icon {
  transform: scale(1.2);
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.cta-button:hover .btn-glow {
  transform: translateX(100%);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .features {
    padding: var(--space-2xl) var(--space-md);
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: var(--space-md);
  }

  .section-header {
    margin-bottom: var(--space-2xl);
  }
}

@media (max-width: 768px) {
  .features {
    padding: var(--space-xl) var(--space-sm);
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .feature-card {
    padding: var(--space-md);
    min-height: 180px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
  }

  .icon {
    font-size: 24px;
  }

  .section-title {
    flex-direction: column;
    text-align: center;
  }

  .features-cta {
    padding: var(--space-lg);
  }
}

@media (max-width: 480px) {
  .features {
    padding: var(--space-lg) var(--space-xs);
  }

  .feature-card {
    padding: var(--space-sm);
    min-height: 160px;
  }

  .feature-icon {
    width: 50px;
    height: 50px;
  }

  .icon {
    font-size: 20px;
  }

  .feature-title {
    font-size: 18px;
  }

  .feature-description {
    font-size: 13px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 14px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --features-bg: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    --gradient-bg: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 70%, #0f172a 100%);
    --gradient-secondary: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }

  .features {
    background: var(--gradient-bg);
  }

  .feature-card,
  .header-badge,
  .features-cta {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .mesh-1 {
    background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
  }

  .mesh-2 {
    background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
  }

  .mesh-3 {
    background: radial-gradient(circle, #0891b2 0%, transparent 70%);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .feature-card:hover {
    transform: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #333333;
    --features-bg: #ffffff;
    --gradient-text: #000000;
  }

  .features {
    background: var(--features-bg);
  }

  .feature-card {
    border: 2px solid #000000;
  }

  .mesh-gradient,
  .float-element,
  .decoration {
    display: none;
  }

  .title-highlight {
    background: #000000 !important;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .cta-button {
    background: #000000 !important;
    color: #ffffff !important;
  }
}

/* Focus styles for accessibility */
.feature-card:focus,
.cta-button:focus,
.header-badge:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Loading states */
.feature-card[data-loading="true"] {
  opacity: 0.6;
  pointer-events: none;
}

.feature-card[data-loading="true"] .feature-icon {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Performance optimizations */
.mesh-gradient,
.float-element,
.feature-card,
.decoration {
  will-change: transform;
  backface-visibility: hidden;
}

.gradient-text,
.title-highlight {
  will-change: auto;
}

/* Print styles */
@media print {
  .features-background,
  .floating-elements,
  .light-effects,
  .card-decorations {
    display: none;
  }

  .features {
    background: white;
    color: black;
  }

  .title-highlight {
    background: black !important;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .feature-card {
    break-inside: avoid;
    border: 1px solid #ccc;
  }
}

/* Hover effects for touch devices */
@media (hover: none) {
  .feature-card:hover {
    transform: none;
  }

  .feature-card:active {
    transform: scale(0.98);
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(99, 102, 241, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-700);
}
</style>