import { useState } from "react";
import { Link } from "react-router-dom";
import { FiStar, FiX } from "react-icons/fi";
import "./MapView.css";

// Deterministic pseudo-random positions based on listing ID
function getPosition(listing) {
  const seed = listing.id * 7919;
  const x = 4 + ((seed * 31) % 88);
  const y = 6 + ((seed * 17) % 82);
  return { x, y };
}

export default function MapView({ listings }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <div className="map-view">
      {/* Fake map background */}
      <div className="map-bg">
        <img
          src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/0,20,1.5,0/1200x700@2x?access_token=pk.placeholder"
          alt=""
          className="map-bg-img map-bg-img--placeholder"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        {/* Softer custom map-like SVG bg */}
        <svg className="map-svg-bg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <rect width="1200" height="700" fill="#e8f0e8"/>
          {/* Land masses */}
          <ellipse cx="200" cy="200" rx="180" ry="120" fill="#d4e4c4" opacity="0.7"/>
          <ellipse cx="600" cy="150" rx="250" ry="100" fill="#d4e4c4" opacity="0.6"/>
          <ellipse cx="900" cy="300" rx="200" ry="150" fill="#d4e4c4" opacity="0.65"/>
          <ellipse cx="400" cy="500" rx="220" ry="130" fill="#d4e4c4" opacity="0.55"/>
          <ellipse cx="800" cy="550" rx="180" ry="110" fill="#d4e4c4" opacity="0.6"/>
          {/* Water */}
          <ellipse cx="600" cy="350" rx="120" ry="80" fill="#b8d4e8" opacity="0.5"/>
          <ellipse cx="150" cy="500" rx="80" ry="50" fill="#b8d4e8" opacity="0.45"/>
          {/* Roads */}
          <line x1="0" y1="350" x2="1200" y2="350" stroke="white" strokeWidth="2.5" opacity="0.6"/>
          <line x1="600" y1="0" x2="600" y2="700" stroke="white" strokeWidth="2.5" opacity="0.6"/>
          <line x1="0" y1="175" x2="1200" y2="525" stroke="white" strokeWidth="1.5" opacity="0.35"/>
          <line x1="0" y1="525" x2="1200" y2="175" stroke="white" strokeWidth="1.5" opacity="0.35"/>
          <line x1="300" y1="0" x2="300" y2="700" stroke="white" strokeWidth="1" opacity="0.25"/>
          <line x1="900" y1="0" x2="900" y2="700" stroke="white" strokeWidth="1" opacity="0.25"/>
          <line x1="0" y1="233" x2="1200" y2="233" stroke="white" strokeWidth="1" opacity="0.25"/>
          <line x1="0" y1="466" x2="1200" y2="466" stroke="white" strokeWidth="1" opacity="0.25"/>
        </svg>

        {/* Pins */}
        {listings.map((listing) => {
          const { x, y } = getPosition(listing);
          const isSelected = selected?.id === listing.id;
          const isHov = hovered === listing.id;
          return (
            <div
              key={listing.id}
              className={`map-pin ${isSelected ? "map-pin--selected" : ""} ${isHov ? "map-pin--hovered" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setHovered(listing.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(isSelected ? null : listing)}
            >
              <span className="map-pin-price">${listing.price}</span>
            </div>
          );
        })}

        {/* Selected popup */}
        {selected && (() => {
          const { x, y } = getPosition(selected);
          const popLeft = x > 65 ? "auto" : "0";
          const popRight = x > 65 ? "0" : "auto";
          return (
            <div
              className="map-popup"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: x > 65 ? "translate(-100%, calc(-100% - 16px))" : "translate(0%, calc(-100% - 16px))",
              }}
            >
              <button className="popup-close" onClick={() => setSelected(null)}><FiX size={14}/></button>
              <Link to={`/listing/${selected.id}`} className="popup-link">
                <img src={selected.images[0]} alt={selected.title} className="popup-img"/>
                <div className="popup-info">
                  <p className="popup-title">{selected.location}</p>
                  <p className="popup-sub">{selected.title}</p>
                  <div className="popup-meta">
                    <FiStar size={11} style={{color:"#FF385C"}}/>
                    <span>{selected.rating}</span>
                    <span className="popup-price">${selected.price}/night</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div className="map-legend">
        <span>📍 {listings.length} places in view</span>
      </div>
    </div>
  );
}
