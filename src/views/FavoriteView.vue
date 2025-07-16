<script setup>
import { ref, computed } from 'vue'
import { useFavoriteStore } from '@/stores/favoritesStore'
import ProductCard from '@/components/ProductCard.vue'
import { getSuggestedProducts } from '@/services/suggestionService'

const store = useFavoriteStore()

const searchQuery = ref('')
const viewMode = ref('grid')

const suggestions = ref([])
const loadingSuggestions = ref(false)
const showSuggestions = ref(false)

const fetchSuggestions = async () => {
    loadingSuggestions.value = true
    suggestions.value = []
    suggestions.value = await getSuggestedProducts()
    loadingSuggestions.value = false
    showSuggestions.value = true
}


const filteredFavorites = computed(() =>
    store.favorites.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

const clearAll = () => store.clearFavorites()
</script>
<template>
    <div class="favorites-page">
        <h1><span class="material-symbols-outlined"> favorite </span> Danh sách yêu thích của tôi</h1>
        <div class="toolbar">
            <input v-model="searchQuery"
                   placeholder="Search..." />
            <div class="view-mode">
                <button :class="{ active: viewMode === 'grid' }"
                        @click="viewMode = 'grid'"><span class="material-symbols-outlined"> grid_view </span></button>
                <button :class="{ active: viewMode === 'list' }"
                        @click="viewMode = 'list'"><span class="material-symbols-outlined"> list </span></button>
            </div>
        </div>
        <div class="results">
            <h3>{{ filteredFavorites.length }} khóa học</h3>
            <button class="clear"
                    @click="clearAll"><span class="material-symbols-outlined"> delete </span>
                <h4>Clear all</h4>
            </button>
        </div>
        <div :class="['items', viewMode]">
            <ProductCard v-for="item in filteredFavorites"
                         :key="item.id"
                         :product="item"
                         :view-mode="viewMode" />
        </div>
        <div class="suggestion-box">
            <button class="suggest-btn"
                    @click="fetchSuggestions">
                <span class="material-symbols-outlined">lightbulb</span> Gợi ý sản phẩm phù hợp </button>
            <div style="margin: 1rem;"
                 v-if="loadingSuggestions">Đang phân tích hành vi người dùng...</div>
            <div v-if="showSuggestions && suggestions.length">
                <h3>✨ Gợi ý dành cho bạn</h3>
                <div class="items grid">
                    <ProductCard v-for="item in suggestions"
                                 :key="item.id"
                                 :product="item"
                                 :view-mode="'grid'" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.favorites-page {
    padding: 2rem;
    max-width: 1200px;
    margin: auto;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: bold;
}

h3 {
    margin: 1rem;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.toolbar input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
}

.view-mode button {
    padding: 0.4rem 0.6rem;
    margin-left: 0.4rem;
    border: none;
    background: #eee;
    border-radius: 6px;
    cursor: pointer;
}

.view-mode button.active {
    background: #000;
    color: #fff;
}

.results {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.clear {
    background: none;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.items.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.items.list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.suggestion-box {
    margin-top: 2rem;
    border-top: 1px solid #ddd;
    padding-top: 1.5rem;
}

.suggest-btn {
    background-color: #ffeb3b;
    color: #333;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    padding: 0.6rem 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.suggest-btn:hover {
    background-color: #fdd835;
}
</style>
