<template>
  <div class="sidebar">
    <SidebarHeader />
    <SidebarSearch />
    <MainNavigation />
    <PrivateSection />
    <SharedSection />
    <FooterNavigation />
    <InviteMember />
    <BottomToolbar />
  </div>
</template>

<script>
import SidebarHeader from './sidebar/SidebarHeader.vue';
import SidebarSearch from './sidebar/SidebarSearch.vue';
import MainNavigation from './sidebar/MainNavigation.vue';
import PrivateSection from './sidebar/PrivateSection.vue';
import SharedSection from './sidebar/SharedSection.vue';
import FooterNavigation from './sidebar/FooterNavigation.vue';
import InviteMember from './sidebar/InviteMember.vue';
import BottomToolbar from './sidebar/BottomToolbar.vue';

export default {
  name: 'SidebarNavigation',
  components: {
    SidebarHeader,
    SidebarSearch,
    MainNavigation,
    PrivateSection,
    SharedSection,
    FooterNavigation,
    InviteMember,
    BottomToolbar
  }
};
</script>

<style scoped>
/* CSS Variables for consistent theming */
:root {
  --sidebar-width: 280px;
  --sidebar-bg: #ffffff;
  --sidebar-border: #e5e7eb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  --hover-bg: #f3f4f6;
  --active-bg: #dbeafe;
  --active-border: #3b82f6;
  --search-bg: #f9fafb;
  --shadow-light: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 6px rgba(0, 0, 0, 0.05);
  --border-radius: 8px;
  --border-radius-lg: 12px;
}

.sidebar {
  width: var(--sidebar-width);
  background: linear-gradient(180deg, #ffffff 0%, #fefefe 100%);
  padding: 16px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.04);
  border-right: 1px solid var(--sidebar-border);
  position: relative;
  overflow: hidden;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.01) 0%, transparent 50%),
    radial-gradient(circle at 0% 50%, rgba(147, 197, 253, 0.01) 0%, transparent 50%);
  pointer-events: none;
}

.sidebar-header,
.sidebar-search,
.sidebar-navigation,
.sidebar-private,
.sidebar-shared,
.sidebar-footer-nav {
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.header-item,
.search-item,
.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: var(--border-radius);
  margin: 0 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.header-item::before,
.search-item::before,
.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.02) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.header-item:hover,
.search-item:hover,
.nav-item:not(.active):hover {
  background: linear-gradient(135deg, var(--hover-bg) 0%, #f8fafc 100%);
  transform: translateX(2px);
  box-shadow: var(--shadow-light);
}

.header-item:hover::before,
.search-item:hover::before,
.nav-item:hover::before {
  opacity: 1;
}

.nav-item.active {
  background: linear-gradient(135deg, var(--active-bg) 0%, #eff6ff 100%);
  border-left: 3px solid var(--active-border);
  font-weight: 600;
  color: var(--active-border);
  box-shadow: var(--shadow-medium);
}

.nav-item.active .icon {
  color: var(--active-border);
}

.icon {
  font-size: 18px;
  margin-right: 12px;
  color: var(--text-secondary);
  width: 22px;
  text-align: center;
  transition: all 0.2s ease;
}

.header-item .icon {
  font-size: 16px;
  width: 20px;
}

.header-item .text {
  flex-grow: 1;
  font-weight: 600;
  color: var(--text-primary);
}

.edit-icon,
.arrow-down-icon {
  font-size: 14px;
  margin-left: 8px;
  margin-right: 0;
  color: var(--text-muted);
  opacity: 0;
  transition: all 0.2s ease;
}

.header-item:hover .edit-icon,
.header-item:hover .arrow-down-icon {
  opacity: 1;
}

.sidebar-section-title {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 8px 20px;
  margin-top: 20px;
  margin-bottom: 8px;
  position: relative;
}

.sidebar-section-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, var(--sidebar-border) 0%, transparent 100%);
}

.sidebar-invite-member {
  margin-top: auto;
  padding: 16px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: var(--border-radius-lg);
  margin: 16px;
  border: 1px solid #bae6fd;
  box-shadow: var(--shadow-light);
  position: relative;
  overflow: hidden;
}

.sidebar-invite-member::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%);
}

.invite-content {
  display: flex;
  align-items: center;
}

.invite-content .icon {
  font-size: 20px;
  margin-right: 12px;
  color: #0ea5e9;
}

.invite-text {
  flex-grow: 1;
}

.invite-title {
  font-weight: 700;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.invite-subtitle {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.close-icon {
  font-size: 14px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
}

.bottom-toolbar {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid var(--sidebar-border);
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(8px);
  z-index: 10;
}

.toolbar-item {
  font-size: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 10px 12px;
  border-radius: var(--border-radius);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.toolbar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.1) 100%);
  border-radius: var(--border-radius);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toolbar-item:hover {
  background: linear-gradient(135deg, var(--hover-bg) 0%, #f1f5f9 100%);
  transform: translateY(-1px);
  box-shadow: var(--shadow-light);
}

.toolbar-item:hover::before {
  opacity: 1;
}

.toolbar-item.active-box {
  background: linear-gradient(135deg, var(--active-bg) 0%, #eff6ff 100%);
  color: var(--active-border);
  box-shadow: var(--shadow-medium);
}

.toolbar-item.active-box::before {
  opacity: 1;
}

/* Search input styling */
.search-item input {
  background: var(--search-bg);
  border: 1px solid var(--sidebar-border);
  border-radius: var(--border-radius);
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.2s ease;
  width: 100%;
}

.search-item input:focus {
  outline: none;
  border-color: var(--active-border);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-item input::placeholder {
  color: var(--text-muted);
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #d1d5db 0%, #9ca3af 100%);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #9ca3af 0%, #6b7280 100%);
}

/* Responsive design */
@media (max-width: 1024px) {
  .sidebar {
    width: 260px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 240px;
    padding: 12px 0;
  }
  
  .header-item,
  .search-item,
  .nav-item {
    padding: 10px 16px;
    margin: 0 12px;
  }
  
  .sidebar-invite-member {
    margin: 12px;
    padding: 12px;
  }
}

/* Animation keyframes */
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: fadeInSlide 0.3s ease-out;
}
</style>