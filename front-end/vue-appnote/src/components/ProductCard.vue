<template>
  <div class="card">
    <div class="card-content">
      <div class="card-header">
        <div class="card-icon">
          <div class="icon-gradient"></div>
        </div>
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-description">{{ desc }}</p>
      </div>
      <div class="card-footer">
        <button class="card-button">
          <span>{{ button }}</span>
          <svg class="button-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.card {
  margin: 20px;
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 0;
  overflow: visible;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  height: auto;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(99, 102, 241, 0.05) 0%,
    rgba(139, 92, 246, 0.05) 50%,
    rgba(6, 182, 212, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(99, 102, 241, 0.2);
}

.card:hover::before {
  opacity: 1;
}

.card-content {
  padding: 32px 24px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
}

.card-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex-grow: 1;
}

.card-footer {
  margin-top: 20px;
  width: 100%;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.icon-gradient {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.card:hover .icon-gradient {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.card-description {
  font-size: 0.875rem;
  font-weight: 400;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.card-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  width: 100%;
  z-index: 10;
  text-decoration: none;
  outline: none;
}

.card-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-button:hover::before {
  opacity: 1;
}

.card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-button span,
.button-icon {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.card-button:hover .button-icon {
  transform: translateX(4px);
}

.button-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
  flex-shrink: 0;
}

/* Ensure button is always visible */
.card-button {
  opacity: 1 !important;
  visibility: visible !important;
  display: flex !important;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .card {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .card:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }

  .card-icon {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }

  .card-title {
    color: #f1f5f9;
  }

  .card-description {
    color: #cbd5e1;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card-button,
  .icon-gradient,
  .button-icon {
    transition: none !important;
  }

  .card:hover {
    transform: none !important;
  }

  .card-button:hover {
    transform: none !important;
  }

  .card:hover .icon-gradient {
    transform: none !important;
  }

  .card-button:hover .button-icon {
    transform: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .card {
    background: #ffffff;
    border: 2px solid #000000;
  }

  .card-title {
    color: #000000;
  }

  .card-description {
    color: #333333;
  }

  .card-button {
    background: #000000;
    border: 2px solid #000000;
  }

  .card-button:hover {
    background: #333333;
  }
}
</style>
