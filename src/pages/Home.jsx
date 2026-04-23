import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import CategoryBar from "../components/CategoryBar";
import MapView from "../components/MapView";
import SkeletonCard from "../components/SkeletonCard";
import { FiMap, FiList } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import "./Home.css";

export default function Home() {
  const { filteredListings, isLoading, viewMode, setViewMode } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = "WanderHuts – Find unique places to stay";
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">
      <CategoryBar />

      {/* Hero Banner */}
      <div className={`home__hero ${visible ? "home__hero--visible" : ""}`}>
        <div className="hero__overlay" />
        <video className="hero__video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-resort-4377-large.mp4" type="video/mp4"/>
        </video>
        <div className="hero__content">
          <h1 className="hero__title">
            Find your<br />
            <span className="hero__accent">perfect escape</span>
          </h1>
          <p className="hero__subtitle">Discover handpicked huts, villas, and unique stays across 190+ countries</p>
          <div className="hero__stats">
            <div className="hero__stat">
              <strong>4M+</strong>
              <span>Listings</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>190+</strong>
              <span>Countries</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>500M+</strong>
              <span>Guest Trips</span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className="home__content">
        <div className="home__section-header">
          <div>
            <h2 className="home__section-title">
              {filteredListings.length > 0
                ? `${filteredListings.length} places to stay`
                : "No results found"}
            </h2>
            <p className="home__section-sub">
              {filteredListings.length > 0
                ? "Tap a listing to see full details"
                : "Try adjusting your search filters"}
            </p>
          </div>
          {filteredListings.length > 0 && (
            <button className="view-toggle" onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}>
              {viewMode === "grid" ? (
                <>Show map <FiMap size={18} style={{marginLeft: 6}}/></>
              ) : (
                <>Show list <FiList size={18} style={{marginLeft: 6}}/></>
              )}
            </button>
          )}
        </div>

        {filteredListings.length > 0 ? (
          isLoading ? (
            <div className="home__grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`skel-${i}`} className="home__grid-item">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : viewMode === "map" ? (
            <div className="home__map-wrap">
              <MapView listings={filteredListings} />
            </div>
          ) : (
            <div className="home__grid">
              {filteredListings.map((listing, i) => (
                <div
                  key={listing.id}
                  className="home__grid-item"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="home__empty">
            <div className="empty-icon">🔍</div>
            <h3>No places found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Floating Toggle on Mobile */}
      <div className="mobile-view-toggle">
        {filteredListings.length > 0 && (
          <button className="mobile-toggle-btn" onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}>
            {viewMode === "grid" ? (
              <>Map <FiMap size={18} /></>
            ) : (
              <>List <FiList size={18} /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
