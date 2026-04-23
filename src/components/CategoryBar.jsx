import { useRef } from "react";
import { categories } from "../data/listings";
import { useApp } from "../context/AppContext";
import { FilterButton } from "./FiltersModal";
import "./CategoryBar.css";

export default function CategoryBar() {
  const { activeCategory, setActiveCategory } = useApp();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="catbar">
      <button className="catbar__arrow catbar__arrow--left" onClick={() => scroll(-1)} aria-label="scroll left">‹</button>
      <div className="catbar__track" ref={scrollRef}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`catbar__item ${activeCategory === cat.id ? "catbar__item--active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="catbar__icon">{cat.icon}</span>
            <span className="catbar__label">{cat.label}</span>
          </button>
        ))}
      </div>
      <button className="catbar__arrow catbar__arrow--right" onClick={() => scroll(1)} aria-label="scroll right">›</button>
      <div className="catbar__filter-wrap">
        <FilterButton />
      </div>
    </div>
  );
}
