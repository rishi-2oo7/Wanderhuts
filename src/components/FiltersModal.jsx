import { useState, useEffect } from "react";
import { FiX, FiSliders } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import "./FiltersModal.css";

const allAmenities = [
  { label: "Pool", icon: "🏊" },
  { label: "WiFi", icon: "📶" },
  { label: "Kitchen", icon: "🍳" },
  { label: "AC", icon: "❄️" },
  { label: "Parking", icon: "🚗" },
  { label: "Hot Tub", icon: "🛁" },
  { label: "Fireplace", icon: "🔥" },
  { label: "Gym", icon: "💪" },
  { label: "Breakfast", icon: "☕" },
  { label: "BBQ", icon: "🍖" },
  { label: "Balcony", icon: "🌇" },
  { label: "Sauna", icon: "🧖" },
];

const propertyTypes = [
  { label: "House", icon: "🏠" },
  { label: "Apartment", icon: "🏢" },
  { label: "Cabin", icon: "🏕️" },
  { label: "Villa", icon: "🏡" },
  { label: "Tent", icon: "⛺" },
  { label: "Treehouse", icon: "🌳" },
  { label: "Boat", icon: "⛵" },
  { label: "Igloo", icon: "🧊" },
];

export default function FiltersModal({ onClose }) {
  const { priceRange, setPriceRange, setActiveCategory } = useApp();
  const [price, setPrice] = useState(priceRange);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const toggleAmenity = (label) => {
    setSelectedAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const handleClear = () => {
    setPrice([0, 1000]);
    setMinBeds(0);
    setMinBaths(0);
    setSelectedAmenities([]);
    setSelectedType(null);
    setPriceRange([0, 1000]);
  };

  const handleApply = () => {
    setPriceRange(price);
    onClose();
  };

  const activeFilterCount =
    (price[0] > 0 || price[1] < 1000 ? 1 : 0) +
    (minBeds > 0 ? 1 : 0) +
    (minBaths > 0 ? 1 : 0) +
    selectedAmenities.length +
    (selectedType ? 1 : 0);

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="filter-header">
          <button className="filter-close" onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>
          <h2 className="filter-title">Filters</h2>
          <span />
        </div>

        {/* Scrollable Content */}
        <div className="filter-body">

          {/* Type of Place */}
          <section className="filter-section">
            <h3>Type of place</h3>
            <div className="type-grid">
              {propertyTypes.map((t) => (
                <button
                  key={t.label}
                  className={`type-btn ${selectedType === t.label ? "type-btn--active" : ""}`}
                  onClick={() => setSelectedType(selectedType === t.label ? null : t.label)}
                >
                  <span className="type-icon">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="filter-divider" />

          {/* Price Range */}
          <section className="filter-section">
            <h3>Price range</h3>
            <p className="filter-sub">Nightly prices before fees and taxes</p>
            <div className="price-display">
              <div className="price-box">
                <label>Minimum</label>
                <div className="price-input-group">
                  <span>$</span>
                  <input
                    type="number"
                    value={price[0]}
                    min={0}
                    max={price[1] - 10}
                    onChange={(e) => setPrice([Number(e.target.value), price[1]])}
                  />
                </div>
              </div>
              <div className="price-dash">—</div>
              <div className="price-box">
                <label>Maximum</label>
                <div className="price-input-group">
                  <span>$</span>
                  <input
                    type="number"
                    value={price[1]}
                    min={price[0] + 10}
                    max={2000}
                    onChange={(e) => setPrice([price[0], Number(e.target.value)])}
                  />
                </div>
              </div>
            </div>

            {/* Dual Range Slider (visual only) */}
            <div className="price-bar-track">
              <div
                className="price-bar-fill"
                style={{
                  left: `${(price[0] / 2000) * 100}%`,
                  right: `${100 - (price[1] / 2000) * 100}%`,
                }}
              />
              <input
                type="range" className="price-range price-range--min"
                min={0} max={2000} value={price[0]}
                onChange={(e) => { if (Number(e.target.value) < price[1]) setPrice([Number(e.target.value), price[1]]); }}
              />
              <input
                type="range" className="price-range price-range--max"
                min={0} max={2000} value={price[1]}
                onChange={(e) => { if (Number(e.target.value) > price[0]) setPrice([price[0], Number(e.target.value)]); }}
              />
            </div>
          </section>

          <div className="filter-divider" />

          {/* Rooms & Beds */}
          <section className="filter-section">
            <h3>Rooms and beds</h3>
            {[
              { label: "Bedrooms", value: minBeds, setter: setMinBeds },
              { label: "Bathrooms", value: minBaths, setter: setMinBaths },
            ].map(({ label, value, setter }) => (
              <div key={label} className="stepper-row">
                <span className="stepper-label">{label}</span>
                <div className="stepper">
                  <button
                    className="stepper-btn"
                    onClick={() => setter(Math.max(0, value - 1))}
                    disabled={value === 0}
                    aria-label={`Decrease ${label}`}
                  >−</button>
                  <span className="stepper-val">{value === 0 ? "Any" : `${value}+`}</span>
                  <button
                    className="stepper-btn"
                    onClick={() => setter(Math.min(10, value + 1))}
                    aria-label={`Increase ${label}`}
                  >+</button>
                </div>
              </div>
            ))}
          </section>

          <div className="filter-divider" />

          {/* Amenities */}
          <section className="filter-section">
            <h3>Amenities</h3>
            <div className="amenity-filter-grid">
              {allAmenities.map(({ label, icon }) => (
                <button
                  key={label}
                  className={`amenity-filter-btn ${selectedAmenities.includes(label) ? "amenity-filter-btn--active" : ""}`}
                  onClick={() => toggleAmenity(label)}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                  {selectedAmenities.includes(label) && <span className="amenity-check">✓</span>}
                </button>
              ))}
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="filter-footer">
          <button className="filter-clear-btn" onClick={handleClear}>
            Clear {activeFilterCount > 0 ? `(${activeFilterCount})` : "all"}
          </button>
          <button className="filter-apply-btn" onClick={handleApply}>
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}

/* Export trigger button */
export function FilterButton() {
  const [open, setOpen] = useState(false);
  const { priceRange } = useApp();
  const hasFilters = priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <>
      <button
        className={`filter-trigger-btn ${hasFilters ? "filter-trigger-btn--active" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open filters"
      >
        <FiSliders size={15} />
        <span>Filters</span>
        {hasFilters && <span className="filter-dot" />}
      </button>
      {open && <FiltersModal onClose={() => setOpen(false)} />}
    </>
  );
}
