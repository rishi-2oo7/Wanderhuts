import { createContext, useContext, useState, useEffect } from "react";
import { listings as initialListings } from "../data/listings";
import { showToast } from "../components/Toast";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [listings, setListings] = useState(initialListings);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ location: "", dates: "", guests: 1 });
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "map"

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Reload skeletons when category changes
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, [activeCategory]);

  const toggleFavorite = (id) => {
    let wasFav = false;
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === id) { wasFav = l.isFavorite; return { ...l, isFavorite: !l.isFavorite }; }
        return l;
      })
    );
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
    showToast(
      wasFav ? "Removed from wishlist" : "Saved to wishlist",
      "info",
      wasFav ? "🤍" : "❤️"
    );
  };

  const filteredListings = listings.filter((l) => {
    const matchCategory = activeCategory === "all" || l.category === activeCategory;
    const matchPrice = l.price >= priceRange[0] && l.price <= priceRange[1];
    const matchSearch =
      !searchQuery.location ||
      l.location.toLowerCase().includes(searchQuery.location.toLowerCase()) ||
      l.country.toLowerCase().includes(searchQuery.location.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <AppContext.Provider
      value={{
        listings,
        filteredListings,
        favorites,
        toggleFavorite,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        priceRange,
        setPriceRange,
        modalOpen,
        setModalOpen,
        isLoading,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
