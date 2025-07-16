<template>
    <div class="container">
        <h1 style="margin-bottom: 24px; ">Danh sách khóa học</h1>
        <div class="filter-section">
            <input v-model="searchQuery"
                   type="text"
                   placeholder="Tìm kiếm khóa học..." />
            <select v-model="priceFilter">
                <option value="">Tất cả</option>
                <option value="lt500">Dưới 500.000đ</option>
                <option value="500-1000">500.000đ – 1.000.000đ</option>
                <option value="gt1000"> Trên 1.000.000 </option>
            </select>
        </div>
        <div class="grid">
            <ProductCard v-for="product in pagedProducts"
                         :key="product.id"
                         :product="product" />
        </div>
        <div class="load-more"
             v-if="pagedProducts.length < allProducts.length">
            <button @click="loadMore">Xem thêm</button>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { allProducts } from '@/data/products.js';

const route = useRoute();
const searchQuery = ref(route.query.search || '');
const priceFilter = ref('');
const currentPage = ref(1);
const pageSize = 6;

// Cập nhật khi query trên URL thay đổi
watch(() => route.query.search, (newSearch) => {
    searchQuery.value = newSearch || '';
    currentPage.value = 1;
});

const filteredProducts = computed(() => {
    return allProducts.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase());

        const price = product.price;
        let priceMatch = true;

        if (priceFilter.value === 'lt500') {
            priceMatch = price < 500000;
        } else if (priceFilter.value === '500-1000') {
            priceMatch = price >= 500000 && price <= 1000000;
        } else if (priceFilter.value === 'gt1000') {
            priceMatch = price > 1000000;
        }

        return nameMatch && priceMatch;
    });
});

const pagedProducts = computed(() => {
    return filteredProducts.value.slice(0, currentPage.value * pageSize);
});

const loadMore = () => {
    if (currentPage.value * pageSize < filteredProducts.value.length) {
        currentPage.value += 1;
    }
};
</script>
<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    justify-content: start;
}

.load-more {
    margin-top: 2rem;
    text-align: center;
}

.load-more button {
    padding: 10px 20px;
    background-color: #002f96;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
}

.load-more button:hover {
    background-color: #001e6b;
}

.filter-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.filter-section input,
.filter-section select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
}
</style>