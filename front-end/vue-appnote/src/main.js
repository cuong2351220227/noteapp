import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

// Create Pinia instance
const pinia = createPinia()

// Load and apply saved settings on app start
function loadAndApplySettings() {
  const savedSettings = localStorage.getItem('appSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    
    // Apply theme
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else if (settings.theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else if (settings.theme === 'system') {
      root.classList.remove('dark-theme', 'light-theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark-theme');
      } else {
        root.classList.add('light-theme');
      }
    }
    
    // Apply font
    if (settings.font) {
      root.setAttribute('data-font', settings.font);
    }
  } else {
    // Default to light theme if no settings
    document.documentElement.classList.add('light-theme');
  }
}

// Apply settings before creating the app
loadAndApplySettings();

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')
