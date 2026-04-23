import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import "./ListingCard.css";

export default function ListingCard({ listing }) {
  const { toggleFavorite } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listing.id);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 600);
  };

  const handleImgNav = (e, dir) => {
    e.preventDefault();
    e.stopPropagation();
    const total = listing.images.length;
    setImgIdx((prev) => (prev + dir + total) % total);
  };

  return (
    <Link to={`/listing/${listing.id}`} className="listing-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="listing-card__img-wrap">
        {listing.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={listing.title}
            className={`listing-card__img ${i === imgIdx ? "listing-card__img--active" : ""}`}
            loading="lazy"
          />
        ))}

        {/* Image navigation */}
        {isHovered && listing.images.length > 1 && (
          <>
            <button className="img-nav img-nav--left" onClick={(e) => handleImgNav(e, -1)} aria-label="Previous image">‹</button>
            <button className="img-nav img-nav--right" onClick={(e) => handleImgNav(e, 1)} aria-label="Next image">›</button>
          </>
        )}

        {/* Dots */}
        {listing.images.length > 1 && (
          <div className="img-dots">
            {listing.images.map((_, i) => (
              <span key={i} className={`img-dot ${i === imgIdx ? "img-dot--active" : ""}`} />
            ))}
          </div>
        )}

        {/* Favorite */}
        <button
          className={`listing-card__fav ${heartAnim ? "listing-card__fav--pop" : ""}`}
          onClick={handleFav}
          aria-label={listing.isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          {listing.isFavorite ? (
            <FaHeart className="heart-filled" />
          ) : (
            <FiHeart className="heart-outline" />
          )}
        </button>

        {listing.host.superhost && (
          <div className="listing-card__badge">Superhost</div>
        )}
      </div>

      <div className="listing-card__info">
        <div className="listing-card__header">
          <h3 className="listing-card__title">{listing.location}</h3>
          <div className="listing-card__rating">
            <FiStar className="star-icon" />
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="listing-card__subtitle">{listing.title}</p>
        <p className="listing-card__meta">{listing.beds} beds · {listing.baths} baths · {listing.guests} guests</p>
        <p className="listing-card__price">
          <strong>${listing.price}</strong>
          <span className="price-night"> / night</span>
        </p>
      </div>
    </Link>
  );
}
