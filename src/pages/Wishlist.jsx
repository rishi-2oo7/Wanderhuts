import { useEffect } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";
import "./Wishlist.css";

export default function Wishlist() {
  const { listings: stateListings } = useApp();
  const favoriteListings = stateListings.filter((l) => l.isFavorite);

  useEffect(() => {
    document.title = "Wishlists – WanderHuts";
  }, []);

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1 className="wishlist-title">Wishlists</h1>
        <p className="wishlist-subtitle">Your saved places around the world</p>

        {favoriteListings.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">🤍</div>
            <h2>Create your first wishlist</h2>
            <p>As you search, click the heart icon to save your favourite places and experiences to a wishlist.</p>
            <Link to="/" className="wishlist-browse-btn">Start exploring</Link>
          </div>
        ) : (
          <>
            <p className="wishlist-count">{favoriteListings.length} saved place{favoriteListings.length !== 1 ? "s" : ""}</p>
            <div className="wishlist-grid">
              {favoriteListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
