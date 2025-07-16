// services/suggestionService.js
import { allProducts } from '@/data/products'
import { useFavoriteStore } from '@/stores/favoritesStore'

export async function getSuggestedProducts() {
    const { favorites } = useFavoriteStore()

    const favoriteIds = favorites.map(f => f.id)

    const suggestions = allProducts.filter(p => !favoriteIds.includes(p.id)).slice(0, 4)

    return new Promise((resolve) => {
        setTimeout(() => resolve(suggestions), 500)
    })
}
