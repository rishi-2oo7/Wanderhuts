import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiStar, FiHeart, FiShare2, FiWifi, FiChevronLeft, FiChevronRight, FiCheck, FiUser, FiAward } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { listings } from "../data/listings";
import { useApp } from "../context/AppContext";
import "./ListingDetail.css";

const amenityIcons = {
  Pool: "🏊", WiFi: "📶", Kitchen: "🍳", AC: "❄️", "Ocean View": "🌊",
  Parking: "🚗", Fireplace: "🔥", "Hot Tub": "🛁", "Ski-in/out": "⛷️",
  Rooftop: "🌆", Gym: "💪", Concierge: "🛎️", "City View": "🏙️",
  "Jungle View": "🌿", Breakfast: "☕", Wildlife: "🦜", Balcony: "🌇",
  Historic: "🏛️", "Metro Access": "🚇", Stargazing: "🔭", "Camel Ride": "🐪",
  "Desert Tour": "🏜️", "Lake Access": "💧", Kayaks: "🚣", BBQ: "🍖",
  "Infinity Pool": "♾️", "Sea View": "🌅", Terrace: "🌿", "Canal View": "⚓",
  Bikes: "🚲", "Pet-friendly": "🐾", Onsen: "♨️", Garden: "🌸",
  "Tea Ceremony": "🍵", Kimono: "👘", "Game Drive": "🦁", "Full Board": "🍽️",
  Sundowner: "🌅", "Safari Guide": "🔭", "Aurora View": "🌌", Sauna: "🧖",
  Snowmobile: "🛷", Heated: "🔥",
};

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite } = useApp();
  const [listing, setListing] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const found = listings.find((l) => l.id === parseInt(id));
    setListing(found);
    if (found) document.title = `${found.title} – WanderHuts`;
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const diff = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
      setNights(diff > 0 ? diff : 0);
    }
  }, [checkIn, checkOut]);

  if (!listing) return (
    <div className="detail-loading">
      <div className="loading-spinner" />
      <p>Loading listing...</p>
    </div>
  );

  const handleReserve = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) return alert("Please select your dates");
    setBooked(true);
  };

  const subtotal = listing.price * nights;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  return (
    <div className="detail">
      {/* Gallery Modal */}
      {showGallery && (
        <div className="gallery-modal" onClick={() => setShowGallery(false)}>
          <button className="gallery-close" onClick={() => setShowGallery(false)}>✕</button>
          <div className="gallery-track" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-nav gallery-nav--left" onClick={() => setCurrentImg((p) => (p - 1 + listing.images.length) % listing.images.length)}>
              <FiChevronLeft size={28} />
            </button>
            <img src={listing.images[currentImg]} alt={listing.title} className="gallery-img" />
            <button className="gallery-nav gallery-nav--right" onClick={() => setCurrentImg((p) => (p + 1) % listing.images.length)}>
              <FiChevronRight size={28} />
            </button>
          </div>
          <div className="gallery-dots">
            {listing.images.map((_, i) => <span key={i} className={`gallery-dot ${i === currentImg ? "active" : ""}`} />)}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="detail__back">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back
        </button>
      </div>

      <div className="detail__container">
        {/* Title Row */}
        <div className="detail__title-row">
          <div>
            <h1 className="detail__title">{listing.title}</h1>
            <div className="detail__meta">
              <FiStar className="meta-star" />
              <span>{listing.rating}</span>
              <span className="meta-dot">·</span>
              <span className="meta-reviews">{listing.reviews} reviews</span>
              {listing.host.superhost && (
                <>
                  <span className="meta-dot">·</span>
                  <span className="meta-superhost">🏆 Superhost</span>
                </>
              )}
              <span className="meta-dot">·</span>
              <span className="meta-location">{listing.location}</span>
            </div>
          </div>
          <div className="detail__actions">
            <button className="action-btn" aria-label="Share">
              <FiShare2 /> Share
            </button>
            <button className="action-btn" onClick={() => toggleFavorite(listing.id)} aria-label="Save">
              {listing.isFavorite ? <FaHeart style={{color:"#FF385C"}} /> : <FiHeart />}
              {listing.isFavorite ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="detail__photo-grid" onClick={() => setShowGallery(true)}>
          <div className="photo-main">
            <img src={listing.images[0]} alt={listing.title} />
          </div>
          <div className="photo-side">
            {listing.images.slice(1, 3).map((src, i) => (
              <div key={i} className="photo-side-item">
                <img src={src} alt={`${listing.title} ${i + 2}`} />
              </div>
            ))}
          </div>
          <button className="photo-show-all">⊞ Show all photos</button>
        </div>

        {/* Main Content */}
        <div className="detail__body">
          {/* Left */}
          <div className="detail__main">
            {/* Host Info */}
            <div className="detail__host-row">
              <div>
                <h2 className="host-title">{listing.beds} beds · {listing.baths} baths · {listing.guests} guests max</h2>
                <p className="host-sub">Hosted by {listing.host.name}</p>
              </div>
              <img src={listing.host.avatar} alt={listing.host.name} className="host-avatar" />
            </div>

            <div className="detail__divider" />

            {/* Highlights */}
            <div className="detail__highlights">
              {listing.host.superhost && (
                <div className="highlight">
                  <FiAward className="highlight-icon" />
                  <div>
                    <strong>{listing.host.name} is a Superhost</strong>
                    <p>Superhosts are experienced, highly rated hosts committed to providing great stays.</p>
                  </div>
                </div>
              )}
              <div className="highlight">
                <FiUser className="highlight-icon" />
                <div>
                  <strong>Great location</strong>
                  <p>95% of recent guests gave the location 5 stars.</p>
                </div>
              </div>
              <div className="highlight">
                <FiCheck className="highlight-icon" />
                <div>
                  <strong>Free cancellation</strong>
                  <p>Cancel before check-in for a partial refund.</p>
                </div>
              </div>
            </div>

            <div className="detail__divider" />

            {/* Description */}
            <div className="detail__description">
              <h3>About this place</h3>
              <p>{listing.description}</p>
            </div>

            <div className="detail__divider" />

            {/* Amenities */}
            <div className="detail__amenities">
              <h3>What this place offers</h3>
              <div className="amenities-grid">
                {listing.amenities.map((a) => (
                  <div key={a} className="amenity-item">
                    <span className="amenity-icon">{amenityIcons[a] || "✓"}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail__divider" />

            {/* Reviews */}
            <div className="detail__reviews">
              <h3>
                <FiStar style={{color:"#FF385C"}} /> {listing.rating} · {listing.reviews} reviews
              </h3>
              <div className="reviews-grid">
                {["Cleanliness", "Communication", "Check-in", "Accuracy", "Location", "Value"].map((cat) => (
                  <div key={cat} className="review-category">
                    <div className="review-cat-header">
                      <span>{cat}</span>
                      <span className="review-cat-score">{(listing.rating - Math.random() * 0.1).toFixed(1)}</span>
                    </div>
                    <div className="review-bar">
                      <div className="review-bar-fill" style={{ width: `${(listing.rating / 5) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="detail__sidebar">
            <div className="booking-card">
              {booked ? (
                <div className="booking-success">
                  <div className="success-icon">🎉</div>
                  <h3>Booking Confirmed!</h3>
                  <p>Your stay at <strong>{listing.title}</strong> has been confirmed.</p>
                  <p className="success-dates">{checkIn} → {checkOut}</p>
                  <p className="success-guests">{guests} guest{guests > 1 ? "s" : ""} · {nights} night{nights !== 1 ? "s" : ""}</p>
                  <p className="success-total">Total: <strong>${total}</strong></p>
                  <button className="btn-reserve" onClick={() => setBooked(false)}>Book Another Stay</button>
                </div>
              ) : (
                <>
                  <div className="booking-price">
                    <span className="booking-price-amount">${listing.price}</span>
                    <span className="booking-price-night"> / night</span>
                  </div>
                  <div className="booking-rating">
                    <FiStar style={{color:"#FF385C"}} />
                    <span>{listing.rating}</span>
                    <span className="booking-reviews">({listing.reviews} reviews)</span>
                  </div>

                  <form className="booking-form" onSubmit={handleReserve}>
                    <div className="booking-dates">
                      <div className="booking-date-field">
                        <label>CHECK-IN</label>
                        <input type="date" value={checkIn} min={new Date().toISOString().split("T")[0]} onChange={(e) => setCheckIn(e.target.value)} required />
                      </div>
                      <div className="booking-date-divider" />
                      <div className="booking-date-field">
                        <label>CHECK-OUT</label>
                        <input type="date" value={checkOut} min={checkIn || new Date().toISOString().split("T")[0]} onChange={(e) => setCheckOut(e.target.value)} required />
                      </div>
                    </div>
                    <div className="booking-guests">
                      <label>GUESTS</label>
                      <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                        {Array.from({ length: listing.guests }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                        ))}
                      </select>
                    </div>
                    <button className="btn-reserve" type="submit">Reserve</button>
                  </form>

                  <p className="booking-note">You won't be charged yet</p>

                  {nights > 0 && (
                    <div className="booking-breakdown">
                      <div className="breakdown-row">
                        <span>${listing.price} × {nights} night{nights !== 1 ? "s" : ""}</span>
                        <span>${subtotal}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>WanderHuts service fee</span>
                        <span>${serviceFee}</span>
                      </div>
                      <div className="breakdown-divider" />
                      <div className="breakdown-row breakdown-total">
                        <strong>Total</strong>
                        <strong>${total}</strong>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
