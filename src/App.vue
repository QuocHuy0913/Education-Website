<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const showDropdown = ref(false)
const dropdownRef = ref(null)
const searchQuery = ref('') // NEW

const handleLoginClick = () => {
  isLoggedIn.value = true
}

const logout = () => {
  isLoggedIn.value = false
  showDropdown.value = false
  router.push('/')
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
});
</script>
<template>
  <div class="full-width">
    <header class="header">
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            rel="stylesheet" />
      <div class="left-section">
        <img src="@/assets/logo.svg"
             alt="Logo"
             class="logo" />
        <h1 class="brand">EduLearn</h1>
        <nav class="nav-links">
          <RouterLink to="/">Trang chủ</RouterLink>
          <RouterLink to="/products">Khóa học</RouterLink>
          <RouterLink to="/about">Về chúng tôi</RouterLink>
          <RouterLink to="/terms">Điều khoản</RouterLink>
          <RouterLink to="/contact">Liên hệ</RouterLink>
        </nav>
      </div>
      <div class="right-section">
        <div class="search-box">
          <span class="material-symbols-outlined"> search </span>
          <input v-model="searchQuery"
                 type="text"
                 placeholder="Search courses..."
                 @keyup.enter="handleSearch" />
        </div>
        <button v-if="!isLoggedIn"
                class="login-btn"
                @click="handleLoginClick">Login</button>
        <!-- ref="dropdownRef" gắn vào phần tử bao ngoài menu -->
        <div v-else
             class="user-icon-wrapper"
             ref="dropdownRef"
             @click="showDropdown = !showDropdown">
          <span class="material-symbols-outlined user-icon">person</span>
          <div v-show="showDropdown"
               class="dropdown-menu">
            <RouterLink to="/account">Thông tin tài khoản</RouterLink>
            <RouterLink to="/cart">Giỏ hàng</RouterLink>
            <RouterLink to="/favorite">Trang yêu thích</RouterLink>
            <a href="#"
               @click.prevent="logout">Đăng xuất</a>
          </div>
        </div>
      </div>
    </header>
  </div>
  <RouterView />
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, #6a82fb, #7455e6);
  color: white;
  height: 80px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  width: 45px;
  height: 45px;
  background-color: white;
  border-radius: 10px;
  margin-right: 10px;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 30px;
}

.nav-links a {
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 16px;
}

.nav-links a.router-link-exact-active {
  color: rgb(0, 47, 150);
}

.nav-links a:hover {
  color: rgb(0, 47, 150);
  transform: scale(1.2);
  transition: 0.3s ease;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  background-color: white;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  width: 350px;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}

.login-btn {
  padding: 0.5rem 1rem;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
}

.login-btn:hover {
  background-color: white;
  color: #6a82fb;
  transition: 0.2s ease-in;
}

.user-icon-wrapper {
  position: relative;
  cursor: pointer;
}

.user-icon {
  font-size: 30px;
  color: white;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background: white;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 200px;
  z-index: 1000;
  padding: 0.5rem 0;
}

.dropdown-menu a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
  color: #6a82fb;
}
</style>
