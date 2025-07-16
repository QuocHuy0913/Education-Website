<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { allProducts } from '@/data/products.js'
import { useFavoriteStore } from '@/stores/favoritesStore'

const route = useRoute()
const router = useRouter()
const productId = Number(route.params.id)
const product = computed(() => allProducts.find(p => p.id === productId))

const favoriteStore = useFavoriteStore()
const isFavorited = computed(() => favoriteStore.favorites.some(fav => fav.id === productId))

const toggleFavorite = () => {
    if (!product.value) return
    isFavorited.value
        ? favoriteStore.removeFavorite(product.value.id)
        : favoriteStore.addFavorite(product.value)
}

const formatCurrency = price => price.toLocaleString('vi-VN') + 'đ'
const goBack = () => router.back()

const reviews = [
    {
        name: 'Nguyễn Văn A',
        date: '15/01/2024',
        rating: 5,
        comment: 'Khóa học tuyệt vời! Giảng viên truyền đạt dễ hiểu...',
    },
    {
        name: 'Trần Thị B',
        date: '10/01/2024',
        rating: 4,
        comment: 'Nội dung hay và dễ tiếp cận. Một số phần nâng cao...',
    },
]
</script>
<template>
    <div v-if="product"
         class="product-page">
        <button class="back-button"
                @click="goBack">⬅ Quay lại</button>
        <div class="top-section">
            <div class="image-container">
                <img :src="product.image"
                     :alt="product.name" />
            </div>
            <div class="info-container">
                <h1>{{ product.name }}</h1>
                <div class="rating">
                    <span v-for="n in 5"
                          :key="n"
                          class="material-symbols-outlined"
                          :class="{ filled: n <= 4 }">star</span>
                    <span style="margin-left: 8px;">(4.8 / 5)</span>
                </div>
                <div class="price">
                    <span class="new">{{ formatCurrency(product.price) }}</span>
                    <span class="old">{{ formatCurrency(product.oldPrice) }}</span>
                    <span class="discount"> -{{ Math.round(((product.oldPrice - product.price) / product.oldPrice) *
                        100) }}% </span>
                </div>
                <p class="description">{{ product.description }}</p>
                <ul class="features">
                    <li>✔ Học qua video, dự án thực tế</li>
                    <li>✔ Truy cập trọn đời</li>
                    <li>✔ Có chứng nhận hoàn thành</li>
                </ul>
                <div class="button-group">
                    <button class="buy-button">
                        <span class="material-symbols-outlined"
                              style="margin-right: 8px;">shopping_cart</span> Mua khóa học </button>
                    <button class="favorite-button"
                            :class="{ active: isFavorited }"
                            @click="toggleFavorite">
                        <span class="material-symbols-outlined"
                              :style="{ marginRight: '8px', color: isFavorited ? 'white' : 'red' }"> favorite </span> {{
                                isFavorited ? 'Đã yêu thích' : 'Thêm vào yêu thích' }} </button>
                </div>
            </div>
        </div>
        <div class="review-section">
            <div class="total">
                <h2>Đánh giá học viên</h2>
                <p class="overall-rating">
                    <span v-for="n in 5"
                          :key="n"
                          class="material-symbols-outlined"
                          :class="{ filled: n <= 4 }">star</span>
                    <span style="margin-left: 8px; font-weight: bold;">4.8 ({{ reviews.length }} đánh giá)</span>
                </p>
            </div>
            <div v-for="(review, index) in reviews"
                 :key="index"
                 class="review">
                <h4>{{ review.name }}</h4>
                <p class="review-date">{{ review.date }}</p>
                <div>
                    <span v-for="n in 5"
                          :key="n"
                          class="material-symbols-outlined"
                          :class="{ filled: n <= review.rating }">star</span>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
            </div>
        </div>
    </div>
    <div v-else
         class="page_404">
        <div class="four_zero_four_bg">
            <h1>404</h1>
        </div>
        <div class="contant_box_404">
            <h3>Oops! Đã xảy ra lỗi!</h3>
            <p>Sản phẩm mà bạn tìm kiếm không tồn tại</p>
            <RouterLink to="/"
                        class="back-home">Quay về trang chủ</RouterLink>
        </div>
    </div>
</template>
<style scoped>
.product-page {
    padding: 1rem 2rem;
    max-width: 1200px;
    margin: auto;
}

.back-button {
    margin-bottom: 1rem;
    padding: 8px 14px;
    border: 2px solid #007bff;
    color: #007bff;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.25s;
}

.back-button:hover {
    background-color: #007bff;
    color: #fff;
}

.top-section {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;
}

.image-container {
    flex: 1 1 350px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: #f4f4f4;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info-container {
    flex: 2;
}

h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.rating {
    color: #f39c12;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.material-symbols-outlined.filled {
    color: #fbc02d;
}

.material-symbols-outlined {
    color: #ccc;
}

.price {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.price .new {
    color: #7455e6;
    font-weight: bold;
}

.price .old {
    color: #888;
    text-decoration: line-through;
    margin-left: 10px;
}

.price .discount {
    color: #6a82fb;
    margin-left: 10px;
    font-weight: bold;
}

.description {
    margin: 1rem 0;
    color: #444;
    line-height: 1.6;
}

.features {
    padding: 0;
    list-style: none;
    margin-bottom: 1.5rem;
}

.features li {
    margin-bottom: 0.5rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.buy-button {
    background-color: #007bff;
    border: 2px solid #007bff;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
    transition: color 0.5s ease;
}

.buy-button:hover {
    background-color: white;
    color: #007bff;
}

.buy-button span {
    color: white;
    transition: color 0.3s;
}

.buy-button:hover span {
    color: #007bff;
}

.buy-button:hover {
    background-color: white;
    color: #007bff;
}

.favorite-button {
    border: 2px solid red;
    color: red;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 16px;
}

.favorite-button.active {
    background-color: red;
    color: white;
}

.review-section {
    margin-top: 3rem;
}

.total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.overall-rating {
    display: flex;
    align-items: center;
}

.review {
    background: #f9f9f9;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid #d2d2d2;
    margin-bottom: 1.5rem;
}

.review h4 {
    margin-bottom: 0.2rem;
}

.review-date {
    font-size: 0.85rem;
    color: #777;
    margin-bottom: 0.3rem;
}

.review-comment {
    font-size: 1rem;
    color: #444;
}

/* 404 */
.page_404 {
    padding: 40px 0;
    text-align: center;
}

.four_zero_four_bg {
    background: url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif') center no-repeat;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.four_zero_four_bg h1 {
    font-size: 70px;
}

.contant_box_404 {
    margin-top: -70px;
}

.back-home {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 16px;
    background-color: #002f96;
    color: white;
    border-radius: 5px;
    text-decoration: none;
}
</style>
