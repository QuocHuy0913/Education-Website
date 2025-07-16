<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
    product: {
        id: number | string;
        name: string;
        description: string;
        image: string;
        price: number;
        oldPrice?: number;
    };
    viewMode?: 'grid' | 'list';
}>();

const router = useRouter();

const formatCurrency = (price: number) => price.toLocaleString('vi-VN') + 'đ';

const goToDetail = () => {
    router.push(`/product/${props.product.id}`);
};
</script>
<template>
    <div :class="['card', viewMode]"
         role="button"
         tabindex="0"
         @click="goToDetail"
         @keypress.enter="goToDetail">
        <img :src="product.image"
             :alt="`Hình ảnh của ${product.name}`"
             class="product-image" />
        <div class="card-content">
            <h3 style="font-weight: bold;">{{ product.name }}</h3>
            <p class="desc">{{ product.description }}</p>
            <div class="card-footer">
                <p class="price">
                    <span class="new">{{ formatCurrency(product.price) }}</span>
                    <span class="old"
                          v-if="product.oldPrice"> {{ formatCurrency(product.oldPrice) }} </span>
                </p>
                <button type="button"
                        class="detail-button"
                        @click.stop="goToDetail">Xem chi tiết</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.175);
    overflow: hidden;
    background: white;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    position: relative;
    max-width: 360px;
    border-top: 1px solid #e8e8e8;
    height: 100%;
    min-height: 320px;
    cursor: pointer;
}

.card-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    position: relative;
    height: 100%;
}

.card:hover {
    transform: translateY(-8px);
}

.product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    aspect-ratio: 4 / 3;
    background-color: #f0f0f0;
}

.card-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.desc {
    font-size: 14px;
    color: #555;
    margin: 1rem 0;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.price .new {
    font-weight: bold;
    color: #d91e18;
}

.price .old {
    margin-left: 10px;
    color: #999;
    text-decoration: line-through;
}

.detail-button {
    background: #002f96;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0;
    transform: translateX(-30px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover .detail-button {
    opacity: 1;
    transform: translateX(0);
}

.detail-button:hover {
    transform: scale(1.05);
}

.card.list {
    flex-direction: row;
    max-width: none;
    height: 100%;
    min-height: 140px;
    padding: 0;
}

.card.list .product-image {
    width: 200px;
    height: 100%;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
    background-color: #f0f0f0;
}

.card.list .card-content {
    padding: 1rem;
    flex: 1;
}

.card.list .desc {
    margin: 0.5rem 0;
}

@media (max-width: 768px) {
    .card {
        max-width: 100%;
        min-height: auto;
    }

    .card.list {
        flex-direction: column;
        align-items: center;
    }

    .card.list .product-image {
        width: 100%;
        height: 180px;
        border-radius: 8px 8px 0 0;
    }

    .card.list .card-content {
        padding: 1rem;
        width: 100%;
    }

    .card-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .detail-button {
        opacity: 1 !important;
        /* Luôn hiện trên mobile */
        transform: none !important;
        width: 100%;
        text-align: center;
    }
}
</style>
