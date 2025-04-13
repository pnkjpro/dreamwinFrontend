<template>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'open': isSidebarOpen, 'closed': !isSidebarOpen && !isMobile }">
      <div class="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <div class="sidebar-menu">
        <ul>
          <li v-for="(item, index) in menuItems" :key="index">
            <router-link
              :to="item.path"
              class="nav-link"
              :class="{ active: route.path === item.path }"
              @click="toggleSidebarIfMobile"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div class="overlay" :class="{ active: isSidebarOpen && isMobile }" @click="toggleSidebar"></div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="header">
        <button class="toggle-btn" @click="toggleSidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1>Main Dashboard</h1>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isSidebarOpen = ref(true);
const isMobile = ref(false);

const menuItems = ref([
  { name: 'Fund Approval', path: '/admin/funds/approval' },
  { name: 'Quiz Creation', path: '/admin/quiz/create' },
  { name: 'Category Create', path: '/admin/category/create' },
  { name: 'Update Banner', path: '/admin/banner/update' },
  { name: 'Update HowVideo', path: '/admin/howVideo/update' },
  { name: 'Leaderboard', path: '/admin/leaderboard/list' },
]);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleSidebarIfMobile = () => {
  if (isMobile.value) isSidebarOpen.value = false;
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  isSidebarOpen.value = !isMobile.value;
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: all 0.3s ease;
  overflow-y: auto;
}

.sidebar.closed {
  margin-left: -250px;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  font-size: 1.5rem;
}

.sidebar-menu {
  padding: 20px 0;
}

.sidebar-menu ul {
  list-style: none;
}

.sidebar-menu li {
  margin-bottom: 5px;
}

.sidebar-menu a {
  display: block;
  padding: 10px 20px;
  color: #ecf0f1;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sidebar-menu a:hover {
  background-color: #34495e;
  padding-left: 25px;
}

.sidebar-menu a.active {
  background-color: #3498db;
  border-left: 4px solid #2980b9;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  transition: all 0.3s ease;
}

.header {
  background-color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 30px;
}

.toggle-btn span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 3px;
}

.content {
  padding: 20px;
}

.section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

/* Overlay */
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.overlay.active {
  display: block;
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 999;
    margin-left: -250px;
  }

  .sidebar.open {
    margin-left: 0;
  }
}
</style>
