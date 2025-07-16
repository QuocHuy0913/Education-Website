import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
    const favorites = ref([])

    function addFavorite(item) {
        if (!favorites.value.find(f => f.id === item.id)) {
            const enrichedItem = {
                ...item,
                type: item.type || 'course',
                progress: item.progress || 0,
                addedAt: Date.now()
            }
            favorites.value.push(enrichedItem)
            console.log(favorites.value)
        }
    }

    function removeFavorite(id) {
        favorites.value = favorites.value.filter(item => item.id !== id)
    }

    function clearFavorites() {
        favorites.value = []
    }

    return { favorites, addFavorite, removeFavorite, clearFavorites }
})
