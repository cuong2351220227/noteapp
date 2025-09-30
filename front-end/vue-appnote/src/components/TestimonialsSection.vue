<template>
  <section class="testimonials">
    <div class="testimonials-content">
      <div class="testimonials-header">
        <h2>Được tin dùng bởi các đội ngũ hiệu suất cao.</h2>
        <p class="testimonials-subtitle">Hàng nghìn công ty hàng đầu thế giới tin tưởng sử dụng</p>
      </div>
      
      <div class="grid">
        <div class="testimonial" v-for="(item, i) in testimonials" :key="i">
          <div class="testimonial-card">
            <div class="testimonial-header">
              <div class="company-logo">
                <div class="logo-placeholder">{{ getCompanyInitials(item.company) }}</div>
              </div>
              <div class="company-info">
                <h3 class="company-name">{{ item.company }}</h3>
                <div class="rating">
                  <span v-for="n in 5" :key="n" class="star">★</span>
                </div>
              </div>
            </div>
            
            <div class="testimonial-content">
              <div class="quote-icon">"</div>
              <p class="quote-text">{{ item.quote }}</p>
            </div>
            
            <div class="testimonial-footer">
              <div class="user-info">
                <div class="user-avatar">
                  <img :src="item.image || getPlaceholderImage()" :alt="`${item.company} testimonial`" />
                </div>
                <div class="user-details">
                  <span class="user-name">{{ item.name || 'Team Lead' }}</span>
                  <span class="user-role">{{ item.role || 'Product Manager' }}</span>
                </div>
              </div>
              <div class="verified-badge">
                <span class="verified-icon">✓</span>
                <span class="verified-text">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
  data() {
    return {
      testimonials: [
        { 
          company: "OpenAI", 
          quote: "Notion chính là nơi đó. Sự kết hợp hoàn hảo giữa tính linh hoạt và sức mạnh AI giúp đội ngũ chúng tôi làm việc hiệu quả hơn bao giờ hết.",
          image: "/src/assets/openai.jpg",
          name: "Sarah Chen",
          role: "Head of Product"
        },
        { 
          company: "Toyota", 
          quote: "Quy trình làm việc tinh gọn hơn. Notion đã giúp chúng tôi giảm 40% thời gian quản lý dự án và tăng cường sự phối hợp giữa các bộ phận.",
          image: "/src/assets/toyota.jpg",
          name: "Kenji Tanaka",
          role: "Operations Director"
        },
        { 
          company: "Vercel", 
          quote: "Notion hiểu bạn có thể giải quyết nhiều vấn đề. Từ documentation đến project planning, mọi thứ đều trong tầm tay.",
          image: "/src/assets/Vercel-logo.jpg",
          name: "Alex Rodriguez",
          role: "Engineering Lead"
        },
        { 
          company: "Figma", 
          quote: "Một trung tâm công việc và AI tuyệt vời. Notion đã trở thành công cụ không thể thiếu trong workflow thiết kế của chúng tôi.",
          image: "/src/assets/Figma-Logo-PNG-Photo.png",
          name: "Emma Wilson",
          role: "Design Director"
        }
      ]
    }
  },
  methods: {
    getCompanyInitials(company) {
      return company.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    },
    getPlaceholderImage() {
      return "https://via.placeholder.com/60x60?text=👤";
    }
  }
}
</script>

<style scoped>
/* CSS Variables */
:root {
  --testimonials-bg: #ffffff;
  --card-bg: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --border-color: #e5e7eb;
  --accent-blue: #3b82f6;
  --accent-green: #10b981;
  --accent-yellow: #f59e0b;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  --card-shadow-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --border-radius: 16px;
  --border-radius-lg: 20px;
}

.testimonials {
  padding: 120px 40px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 30%, #ffffff 70%, #f8fafc 100%);
  position: relative;
  overflow: hidden;
}

/* Decorative background */
.testimonials::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.02) 0%, transparent 50%),
    radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.testimonials-content {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.testimonials-header {
  text-align: center;
  margin-bottom: 80px;
}

.testimonials h2 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.testimonials-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  font-weight: 500;
  margin: 0;
}

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 32px;
  justify-content: center;
}

/* Testimonial Cards */
.testimonial {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.testimonial:nth-child(1) { animation-delay: 0.1s; }
.testimonial:nth-child(2) { animation-delay: 0.2s; }
.testimonial:nth-child(3) { animation-delay: 0.3s; }
.testimonial:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.testimonial-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 32px;
  box-shadow: var(--card-shadow);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(0, 5, 13, 0.02) 0%, 
    rgba(0, 0, 0, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
  border-color: var(--accent-blue);
}

.testimonial-card:hover::before {
  opacity: 1;
}

/* Testimonial Header */
.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.company-logo {
  margin-right: 16px;
}

.logo-placeholder {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent-blue) 0%, #1d4ed8 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 16px;
  letter-spacing: 1px;
}

.company-info {
  flex: 1;
}

.company-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.rating {
  display: flex;
  gap: 2px;
}

.star {
  color: var(--accent-yellow);
  font-size: 16px;
}

/* Testimonial Content */
.testimonial-content {
  flex: 1;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.quote-icon {
  font-size: 48px;
  color: var(--accent-blue);
  opacity: 0.3;
  font-family: Georgia, serif;
  line-height: 1;
  margin-bottom: 16px;
}

.quote-text {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
  text-align: left;
}

/* Testimonial Footer */
.testimonial-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
  position: relative;
  z-index: 2;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  border: 2px solid var(--border-color);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.user-role {
  font-size: 12px;
  color: var(--text-secondary);
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 20px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.verified-icon {
  color: var(--accent-green);
  font-size: 12px;
  font-weight: bold;
}

.verified-text {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .testimonials {
    padding: 80px 20px;
  }
  
  .testimonials-header {
    margin-bottom: 60px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .testimonial-card {
    padding: 24px;
  }
  
  .quote-icon {
    font-size: 36px;
  }
  
  .testimonial-footer {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .testimonials {
    padding: 60px 16px;
  }
  
  .testimonial-card {
    padding: 20px;
  }
  
  .company-name {
    font-size: 18px;
  }
  
  .quote-text {
    font-size: 15px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .testimonial,
  .testimonial-card:hover {
    animation: none;
    transform: none;
  }
}

/* Focus styles */
.testimonial-card:focus {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
</style>