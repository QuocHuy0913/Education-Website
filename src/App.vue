<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const showDropdown = ref(false)
const showMobileMenu = ref(false)
const dropdownRef = ref(null)
const searchQuery = ref('')
const isDesktop = ref(window.innerWidth > 768)

const navItems = [
  { to: '/', text: 'Trang chủ' },
  { to: '/products', text: 'Khóa học' },
  { to: '/about', text: 'Về chúng tôi' },
  { to: '/terms', text: 'Điều khoản' },
  { to: '/contact', text: 'Liên hệ' }
]

const handleLoginClick = () => isLoggedIn.value = true

const logout = () => {
  isLoggedIn.value = false
  showDropdown.value = false
  router.push('/')
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    showDropdown.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value } })
    searchQuery.value = ''
  }
}

const toggleMobileMenu = () => showMobileMenu.value = !showMobileMenu.value

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth > 768
  if (isDesktop.value) showMobileMenu.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateScreenSize)
  updateScreenSize()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateScreenSize)
})
</script>
<template>
  <header class="header">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet" />
    <div class="header-container">
      <RouterLink to="/"
                  class="left">
        <img src="@/assets/logo.svg"
             alt="Logo"
             class="logo" />
        <span class="brand">EduLearn</span>
      </RouterLink>
      <nav v-if="isDesktop"
           class="center nav-links">
        <RouterLink v-for="item in navItems"
                    :key="item.to"
                    :to="item.to">{{ item.text }}</RouterLink>
      </nav>
      <div class="right">
        <div v-show="isDesktop"
             class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input v-model="searchQuery"
                 placeholder="Tìm kiếm khóa học..."
                 @keyup.enter="handleSearch" />
        </div>
        <button v-if="!isLoggedIn"
                class="login-btn"
                @click="handleLoginClick">Đăng nhập</button>
        <template v-else>
          <span class="material-symbols-outlined user-icon"
                @click="showDropdown = !showDropdown"
                ref="dropdownRef">person</span>
        </template>
        <span v-if="!isDesktop"
              class="material-symbols-outlined hamburger"
              @click="toggleMobileMenu">menu</span>
      </div>
    </div>
    <transition name="mobile-slide">
      <div v-if="showMobileMenu && !isDesktop"
           class="mobile-nav-wrapper">
        <nav class="nav-links">
          <RouterLink v-for="item in navItems"
                      :key="item.to"
                      :to="item.to">{{ item.text }}</RouterLink>
        </nav>
        <div class="search-box">
          <span class="material-symbols-outlined">search</span>
          <input v-model="searchQuery"
                 placeholder="Tìm kiếm khóa học..."
                 @keyup.enter="handleSearch" />
        </div>
      </div>
    </transition>
    <div v-if="isLoggedIn && showDropdown"
         class="dropdown-menu">
      <RouterLink to="/account">Thông tin tài khoản</RouterLink>
      <RouterLink to="/cart">Giỏ hàng</RouterLink>
      <RouterLink to="/favorite">Trang yêu thích</RouterLink>
      <a href="#"
         @click.prevent="logout">Đăng xuất</a>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
.header {
  background: linear-gradient(90deg, #6a82fb, #7455e6);
  color: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.left,
.center,
.right {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: white;
}

.center {
  flex: 1;
  justify-content: center;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: white;
}

.brand {
  font-size: 1.3rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.2rem;
}

.nav-links a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  transition: 0.2s ease;
}

.nav-links a.router-link-exact-active,
.nav-links a:hover {
  color: #3f2b85;
}

.search-box {
  background-color: white;
  border-radius: 25px;
  padding: 0.3rem 0.8rem;
  display: flex;
  align-items: center;
  max-width: 250px;
}

.search-box input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
}

.login-btn {
  color: white;
  background-color: #6a82fb;
  border: 2px solid white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s ease;
}

.login-btn:hover {
  color: #6a82fb;
  background-color: white;
  border-color: #6a82fb;
}

.user-icon,
.hamburger {
  font-size: 26px;
  cursor: pointer;
  color: white;
}

/* MOBILE */
.mobile-nav-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  background: linear-gradient(90deg, #6a82fb, #7455e6);
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
  }

  .search-box {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }
}

/* DROPDOWN */
.dropdown-menu {
  position: absolute;
  right: 1.5rem;
  top: 100%;
  margin-top: 0.5rem;
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
  color: #333;
  font-weight: 500;
  text-decoration: none;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
  color: #6a82fb;
}

/* TRANSITION */
.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.mobile-slide-enter-to,
.mobile-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}
</style>
