<template>
  <section class="hero">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-mesh">
        <div class="mesh-gradient mesh-1"></div>
        <div class="mesh-gradient mesh-2"></div>
        <div class="mesh-gradient mesh-3"></div>
        <div class="mesh-gradient mesh-4"></div>
      </div>
      
      <!-- Floating Particles -->
      <div class="particles">
        <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
      </div>
      
      <!-- Grid Pattern -->
      <div class="grid-pattern"></div>
      
      <!-- Light Beams -->
      <div class="light-beams">
        <div class="beam beam-1"></div>
        <div class="beam beam-2"></div>
        <div class="beam beam-3"></div>
      </div>
    </div>

    <!-- Hero Content -->
    <div class="hero-content">
      <!-- Announcement Badge -->
      <div class="announcement-badge">
        <div class="badge-glow"></div>
        <div class="badge-content">
          <div class="badge-icon">✨</div>
          <span>Giới thiệu tính năng AI mới</span>
          <div class="badge-arrow">→</div>
        </div>
      </div>

      <!-- Main Title -->
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line" data-aos="fade-up" data-aos-delay="100">
            <span class="title-word">Làm việc</span>
            <span class="title-word">nhanh hơn</span>
          </span>
          <span class="title-line" data-aos="fade-up" data-aos-delay="200">
            <span class="title-word">với</span>
            <span class="title-word">đội nhóm AI</span>
          </span>
        </h1>
        
        <p class="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
          Trải nghiệm sức mạnh của trí tuệ nhân tạo trong công việc hàng ngày.
          <br class="hidden sm:block">
          Tăng năng suất, tối ưu quy trình và đạt được nhiều hơn với ít nỗ lực hơn.
        </p>

        <!-- Action Buttons -->
        <div class="hero-actions" data-aos="fade-up" data-aos-delay="400">
          <button class="btn-primary">
            <span class="btn-content">
              <span class="btn-icon">🚀</span>
              <span>Bắt đầu miễn phí</span>
            </span>
            <div class="btn-glow"></div>
          </button>
          
          <button class="btn-secondary">
            <span class="btn-content">
              <span class="btn-icon">▶</span>
              <span>Xem demo</span>
            </span>
            <div class="btn-ripple"></div>
          </button>
        </div>

        <!-- Stats -->
        <div class="hero-stats" data-aos="fade-up" data-aos-delay="500">
          <div class="stat-item">
            <div class="stat-number">2M+</div>
            <div class="stat-label">Người dùng</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">Thời gian hoạt động</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Tích hợp</div>
          </div>
        </div>
      </div>

      <!-- Video Hero -->
      <div class="hero-video" data-aos="zoom-in" data-aos-delay="600">
        <div class="video-container">
          <div class="video-frame">
            <video controls autoplay muted loop>
              <source src="@/assets/homepage-hero-animation.mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
            <div class="video-overlay">
              <div class="play-button">
                <div class="play-icon">▶</div>
              </div>
            </div>
          </div>
          
          <!-- Video Decorations -->
          <div class="video-decorations">
            <div class="decoration decoration-1"></div>
            <div class="decoration decoration-2"></div>
            <div class="decoration decoration-3"></div>
          </div>
          
          <!-- Floating UI Elements -->
          <div class="floating-ui">
            <div class="ui-element ui-1">
              <div class="ui-icon">💬</div>
              <div class="ui-text">AI Assistant</div>
            </div>
            <div class="ui-element ui-2">
              <div class="ui-icon">📊</div>
              <div class="ui-text">Analytics</div>
            </div>
            <div class="ui-element ui-3">
              <div class="ui-icon">⚡</div>
              <div class="ui-text">Automation</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Cards -->
      <div class="cards-section" data-aos="fade-up" data-aos-delay="700">
        <div class="cards-header">
          <h2 class="cards-title">Khám phá sản phẩm</h2>
          <p class="cards-subtitle">Giải pháp AI toàn diện cho mọi nhu cầu làm việc</p>
        </div>
        
        <div class="cards">
          <ProductCard
            title="Bắt đầu với Notion"
            desc="Không gian làm việc AI với các tác nhân tích hợp sẵn."
            button="Tải xuống cho Windows"
            :index="0"
          />
          <ProductCard
            title="Notion Mail"
            desc="Hộp thư AI thông minh hiểu được ý định của bạn."
            button="Tải xuống"
            :index="1"
          />
          <ProductCard
            title="Lịch Notion"
            desc="Quản lý thời gian, lịch trình và nhiệm vụ tại một nơi."
            button="Tải xuống"
            :index="2"
          />
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-line"></div>
      <div class="scroll-text">Cuộn xuống</div>
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "HeroSection",
  components: { ProductCard },
  methods: {
    getParticleStyle(index) {
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 10;
      const size = 2 + Math.random() * 4;
      const left = Math.random() * 100;
      const animationName = Math.random() > 0.5 ? 'particleFloat' : 'particleDrift';
      
      return {
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationName: animationName
      };
    }
  },
  mounted() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
      });
    }
  }
};
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

/* CSS Variables */
:root {
  /* Colors */
  --hero-bg: #ffffff;
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
  --gradient-mesh: conic-gradient(from 0deg at 50% 50%, #6366f1, #8b5cf6, #06b6d4, #3b82f6, #6366f1);
  --gradient-text: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  
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

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  background: var(--hero-bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
}

/* Animated Background */
.hero-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* Gradient Mesh */
.gradient-mesh {
  position: absolute;
  inset: -50%;
  opacity: 0.15;
}

.mesh-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: meshMove 20s ease-in-out infinite;
}

.mesh-1 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  top: -20%;
  left: -10%;
  animation-delay: 0s;
}

.mesh-2 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  top: 20%;
  right: -10%;
  animation-delay: 7s;
}

.mesh-3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  bottom: -10%;
  left: 20%;
  animation-delay: 14s;
}

.mesh-4 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 3s;
}

@keyframes meshMove {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(30px, -30px) scale(1.1) rotate(120deg); }
  66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
}

/* Particles */
.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

@keyframes particleDrift {
  0% {
    transform: translateX(-100px) translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateX(100px) translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Grid Pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 30s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

/* Light Beams */
.light-beams {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.beam {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    rgba(99, 102, 241, 0.3) 50%, 
    transparent 100%);
  animation: beamMove 8s ease-in-out infinite;
}

.beam-1 {
  left: 20%;
  animation-delay: 0s;
}

.beam-2 {
  left: 60%;
  animation-delay: 2.7s;
}

.beam-3 {
  left: 80%;
  animation-delay: 5.3s;
}

@keyframes beamMove {
  0%, 100% {
    transform: translateX(-100px) scaleY(0.5);
    opacity: 0;
  }
  50% {
    transform: translateX(100px) scaleY(1);
    opacity: 1;
  }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  width: 100%;
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2xl);
}

/* Announcement Badge */
.announcement-badge {
  margin: 20px;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all var(--transition-medium);
  overflow: hidden;
}

.announcement-badge:hover {
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

.announcement-badge:hover .badge-glow {
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

.badge-arrow {
  transition: transform var(--transition-medium);
}

.announcement-badge:hover .badge-arrow {
  transform: translateX(4px);
}

/* Hero Text */
.hero-text {
  max-width: 900px;
  width: 100%;
}

.hero-title {
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.title-line {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  flex-wrap: wrap;
  width: 100%;
}

.title-word {
  display: inline-block;
  position: relative;
  white-space: nowrap;
  flex-shrink: 0;
}

.gradient-text {
  background: var(--gradient-text);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
}

.highlight {
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--gradient-primary);
  border-radius: 3px;
  animation: underlineGrow 1s ease-out 1.5s forwards;
  transform: scaleX(0);
}

@keyframes underlineGrow {
  to { transform: scaleX(1); }
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 var(--space-xl);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Action Buttons */
.hero-actions {
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border: none;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-medium);
  overflow: hidden;
  min-width: 180px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-soft);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-strong);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-primary);
  border: 1px solid rgba(99, 102, 241, 0.2);
  backdrop-filter: blur(20px);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: var(--shadow-medium);
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

.btn-primary:hover .btn-icon {
  transform: scale(1.2);
}

.btn-secondary:hover .btn-icon {
  transform: translateX(2px);
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn-primary:hover .btn-glow {
  transform: translateX(100%);
}

.btn-ripple {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  transform: scale(0);
  transition: transform var(--transition-medium);
}

.btn-secondary:hover .btn-ripple {
  transform: scale(1);
}

/* Stats */
.hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  background: var(--gradient-text);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(99, 102, 241, 0.2);
}

/* Video Hero */
.hero-video {
  width: 100%;
  max-width: 1000px;
  position: relative;
}

.video-container {
  position: relative;
  perspective: 1000px;
}

.video-frame {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-strong);
  background: var(--gradient-secondary);
  transition: all var(--transition-slow);
  transform-style: preserve-3d;
}

.video-frame:hover {
  transform: rotateY(5deg) rotateX(5deg) translateY(-20px);
  box-shadow: 0 40px 120px rgba(99, 102, 241, 0.2);
}

.video-frame video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-xl);
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(99, 102, 241, 0.1) 0%,
    rgba(139, 92, 246, 0.1) 50%,
    rgba(6, 182, 212, 0.1) 100%);
  opacity: 0;
  transition: opacity var(--transition-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
}

.video-frame:hover .video-overlay {
  opacity: 1;
}

.play-button {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-medium);
  transform: scale(0.8);
  transition: all var(--transition-medium);
  backdrop-filter: blur(20px);
}

.video-overlay:hover .play-button {
  transform: scale(1);
}

.play-icon {
  font-size: 24px;
  color: var(--primary-600);
  margin-left: 4px;
}

/* Video Decorations */
.video-decorations {
  position: absolute;
  inset: -40px;
  pointer-events: none;
}

.decoration {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--gradient-primary);
  opacity: 0.1;
  animation: decorationFloat 6s ease-in-out infinite;
}

.decoration-1 {
  top: 0;
  right: 0;
  animation-delay: 0s;
}

.decoration-2 {
  bottom: 0;
  left: 0;
  animation-delay: 2s;
}

.decoration-3 {
  top: 50%;
  right: -20px;
  animation-delay: 4s;
}

@keyframes decorationFloat {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.3;
  }
}

/* Floating UI Elements */
.floating-ui {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.ui-element {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-soft);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  animation: uiFloat 4s ease-in-out infinite;
}

.ui-1 {
  top: 20%;
  left: -60px;
  animation-delay: 0s;
}

.ui-2 {
  top: 60%;
  right: -80px;
  animation-delay: 1.3s;
}

.ui-3 {
  bottom: 30%;
  left: -70px;
  animation-delay: 2.7s;
}

@keyframes uiFloat {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(0.9);
    opacity: 0;
  }
  50% {
    transform: translateY(-10px) translateX(10px) scale(1);
    opacity: 1;
  }
}

.ui-icon {
  font-size: 16px;
}

/* Cards Section */
.cards-section {
  margin: 20px;
  width: 100%;
  max-width: 1200px;
}

.cards-header {
  margin: 20px;
  margin-bottom: var(--space-xl);
}

.cards-title {
  font-family: var(--font-title);
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-sm);
  background: var(--gradient-text);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cards-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-lg);
  width: 100%;
  position: relative;
}

/* ProductCard Styling */
.cards :deep(.product-card) {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-medium);
  position: relative;
  overflow: visible;
}

.cards :deep(.product-card:hover) {
  transform: translateY(-8px);
  box-shadow: var(--shadow-strong);
  border-color: rgba(99, 102, 241, 0.2);
}

.cards :deep(.product-card .card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.cards :deep(.product-card .card-title) {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
}

.cards :deep(.product-card .card-description) {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
  flex: 1;
}

.cards :deep(.product-card .card-button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background: var(--gradient-primary);
  color: white;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all var(--transition-medium);
  margin-top: auto;
  min-height: 44px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cards :deep(.product-card .card-button:hover) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%);
}

.cards :deep(.product-card .card-button:active) {
  transform: translateY(0);
}

/* Alternative fallback styling if ProductCard doesn't use specific classes */
.cards > * {
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: var(--space-lg);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-medium);
  gap: var(--space-md);
}

.cards > *:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-strong);
  border-color: rgba(99, 102, 241, 0.2);
}

/* Ensure buttons are always visible */
.cards > * > *:last-child,
.cards :deep(.card-button),
.cards :deep(button),
.cards :deep(.btn),
.cards :deep(a[role="button"]) {
  margin-top: auto !important;
  flex-shrink: 0 !important;
  min-height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px 20px !important;
  background: var(--gradient-primary) !important;
  color: white !important;
  text-decoration: none !important;
  border: none !important;
  border-radius: var(--radius-sm) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all var(--transition-medium) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.cards > * > *:last-child:hover,
.cards :deep(.card-button:hover),
.cards :deep(button:hover),
.cards :deep(.btn:hover),
.cards :deep(a[role="button"]:hover) {
  transform: translateY(-2px) !important;
  box-shadow: var(--shadow-medium) !important;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #0891b2 100%) !important;
}

.cards::before {
  content: '';
  position: absolute;
  inset: -var(--space-md);
  background: linear-gradient(135deg,
    rgba(99, 102, 241, 0.02) 0%,
    rgba(139, 92, 246, 0.02) 50%,
    rgba(6, 182, 212, 0.02) 100%);
  border-radius: var(--radius-xl);
  opacity: 0;
  transition: all var(--transition-slow);
  pointer-events: none;
  z-index: -1;
}

.cards:hover::before {
  opacity: 1;
  transform: scale(1.02);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  color: var(--text-muted);
  font-size: 14px;
  animation: scrollPulse 2s ease-in-out infinite;
}

.scroll-line {
  width: 2px;
  height: 30px;
  background: var(--gradient-primary);
  border-radius: 1px;
  position: relative;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: inherit;
  animation: scrollMove 2s ease-in-out infinite;
}

@keyframes scrollMove {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(20px);
    opacity: 0.3;
  }
}

.scroll-text {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.scroll-arrow {
  font-size: 16px;
  animation: arrowBounce 2s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    padding: var(--space-xl) var(--space-md);
    gap: var(--space-xl);
  }

  .mesh-1 { width: 600px; height: 600px; }
  .mesh-2 { width: 500px; height: 500px; }
  .mesh-3 { width: 400px; height: 400px; }
  .mesh-4 { width: 300px; height: 300px; }

  .cards {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--space-md);
  }

  .cards :deep(.product-card),
  .cards > * {
    min-height: 260px;
    padding: var(--space-md);
  }

  .cards :deep(.card-button),
  .cards > * > *:last-child {
    padding: 10px 16px !important;
    font-size: 13px !important;
    min-height: 40px !important;
  }

  .hero-stats {
    gap: var(--space-md);
    padding: var(--space-md);
  }

  .stat-number {
    font-size: 20px;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: var(--space-lg) var(--space-sm);
    gap: var(--space-lg);
  }

  .hero-title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    line-height: 1.1;
  }

  .title-line {
    gap: clamp(0.25rem, 1vw, 0.75rem);
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
  }

  .btn-primary, .btn-secondary {
    min-width: 200px;
  }

  .hero-stats {
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-sm);
  }

  .stat-divider {
    width: 40px;
    height: 1px;
  }

  .cards {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }

  .cards :deep(.product-card),
  .cards > * {
    min-height: 240px;
    padding: var(--space-sm);
  }

  .cards :deep(.card-title) {
    font-size: 18px;
  }

  .cards :deep(.card-description) {
    font-size: 13px;
  }

  .cards :deep(.card-button),
  .cards > * > *:last-child {
    padding: 10px 16px !important;
    font-size: 12px !important;
    min-height: 36px !important;
  }

  .ui-element {
    display: none;
  }

  .video-decorations {
    display: none;
  }

  .mesh-1, .mesh-2, .mesh-3, .mesh-4 {
    width: 300px;
    height: 300px;
    filter: blur(80px);
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: var(--space-md) var(--space-xs);
  }

  .hero-title {
    font-size: clamp(1.75rem, 8vw, 2.75rem);
    letter-spacing: -0.01em;
  }

  .hero-subtitle {
    font-size: 16px;
    line-height: 1.5;
  }

  .announcement-badge {
    padding: 8px 16px;
    font-size: 12px;
  }

  .btn-primary, .btn-secondary {
    padding: 12px 24px;
    font-size: 14px;
    min-width: 160px;
  }

  .video-frame {
    border-radius: var(--radius-md);
  }

  .video-frame video {
    border-radius: var(--radius-md);
  }

  .video-overlay {
    border-radius: var(--radius-md);
  }

  .play-button {
    width: 60px;
    height: 60px;
  }

  .play-icon {
    font-size: 18px;
  }

  .cards-title {
    font-size: clamp(1.5rem, 5vw, 1.875rem);
  }

  .cards-subtitle {
    font-size: 14px;
  }

  .mesh-1, .mesh-2, .mesh-3, .mesh-4 {
    width: 200px;
    height: 200px;
    filter: blur(60px);
  }
}

/* Accessibility & Performance */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .video-frame:hover {
    transform: none !important;
  }

  .btn-primary:hover,
  .btn-secondary:hover {
    transform: none !important;
  }

  .announcement-badge:hover {
    transform: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #333333;
    --hero-bg: #ffffff;
    --gradient-text: #000000;
  }

  .hero {
    background: var(--hero-bg);
  }

  .video-frame {
    border: 2px solid #000000;
  }

  .mesh-gradient,
  .particle,
  .decoration {
    display: none;
  }

  .gradient-text {
    background: #000000 !important;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .btn-primary {
    background: #000000 !important;
    color: #ffffff !important;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --hero-bg: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    
    --gradient-secondary: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }

  .hero {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 70%, #0f172a 100%);
  }

  .announcement-badge,
  .hero-stats,
  .btn-secondary {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .ui-element {
    background: rgba(15, 23, 42, 0.9);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .play-button {
    background: rgba(15, 23, 42, 0.9);
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

  .mesh-4 {
    background: radial-gradient(circle, #2563eb 0%, transparent 70%);
  }
}

/* Performance optimizations */
.mesh-gradient,
.particle,
.video-frame,
.decoration,
.ui-element {
  will-change: transform;
  backface-visibility: hidden;
}

.gradient-text {
  will-change: auto;
}

/* Loading states */
.video-frame video[data-loading="true"] {
  opacity: 0.7;
  filter: blur(2px);
  transition: all var(--transition-medium);
}

.video-frame video[data-loaded="true"] {
  opacity: 1;
  filter: blur(0);
}

/* Focus styles for accessibility */
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.announcement-badge:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .hero-background,
  .particles,
  .light-beams,
  .video-decorations,
  .floating-ui,
  .scroll-indicator {
    display: none;
  }

  .hero {
    background: white;
    color: black;
  }

  .gradient-text {
    background: black !important;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>