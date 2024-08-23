"use client";

import { useEffect, useRef } from "react";
import { useFavoritesStore } from "./use-favorite-store";

interface InitFavProps {
  favorites: Record<string, Set<string>>;
}
export default function InitFav({ favorites }: InitFavProps) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useFavoritesStore.setState({
        favorites,
      });
      initState.current = true;
    }
  }, [favorites]);

  return null;
}
