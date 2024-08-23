import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FavoritesState {
  favorites: Record<string, Set<string>>;
  addToFavorite: (userId: string, productId: string) => void;
  removeFavorite: (userId: string, productId: string) => void;
  isFavorite: (userId: string, productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},

      addToFavorite: (userId: string, productId: string) => {
        set((state) => {
          const userFavorites = state.favorites[userId] || new Set();
          userFavorites.add(productId);
          return {
            favorites: { ...state.favorites, [userId]: userFavorites },
          };
        });
      },

      removeFavorite: (userId: string, productId: string) => {
        set((state) => {
          const userFavorites = state.favorites[userId] || new Set();
          userFavorites.delete(productId);
          return {
            favorites: { ...state.favorites, [userId]: userFavorites },
          };
        });
      },

      isFavorite: (userId: string, productId: string) => {
        return get().favorites[userId]?.has(productId) || false;
      },
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
