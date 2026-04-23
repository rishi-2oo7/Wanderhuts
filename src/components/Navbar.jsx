import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiGlobe, FiMenu, FiUser, FiHeart, FiX } from "react-icons/fi";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { searchQuery, setSearchQuery, modalOpen, setModalOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSearch, setActiveSearch] = useState(null);
  const [localSearch, setLocalSearch] = useState({ location: "", dates: "", guests: 1 });
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSearchExpanded(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <svg viewBox="0 0 32 32" className="logo-icon" aria-hidden="true">
            <path d="M16 1C8.28 1 2 7.28 2 15c0 4.64 2.26 8.75 5.74 11.32L16 31l8.26-4.68C27.74 23.75 30 19.64 30 15 30 7.28 23.72 1 16 1z" fill="#FF385C"/>
            <path d="M16 8c-2.76 0-5 2.24-5 5 0 3.54 5 10 5 10s5-6.46 5-10c0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="white"/>
          </svg>
          <span className="logo-text">WanderHuts</span>
        </Link>

        {/* Search Bar */}
        {!searchExpanded ? (
          <div className="navbar__search-pill" onClick={() => setSearchExpanded(true)}>
            <span className="search-pill__location">
              {localSearch.location || "Anywhere"}
            </span>
            <span className="search-pill__divider" />
            <span className="search-pill__dates">Any week</span>
            <span className="search-pill__divider" />
            <span className="search-pill__guests">Add guests</span>
            <button className="search-pill__btn" aria-label="Search">
              <FiSearch />
            </button>
          </div>
        ) : (
          <div className="navbar__search-expanded">
            <button className="search-close" onClick={() => setSearchExpanded(false)}>
              <FiX />
            </button>
            <form className="search-form" onSubmit={handleSearch}>
              <div
                className={`search-field ${activeSearch === "location" ? "active" : ""}`}
                onClick={() => setActiveSearch("location")}
              >
                <label>Where</label>
                <input
                  type="text"
                  placeholder="Search destinations"
                  value={localSearch.location}
                  onChange={(e) => setLocalSearch((p) => ({ ...p, location: e.target.value }))}
                  autoFocus
                />
              </div>
              <div className="search-divider" />
              <div
                className={`search-field ${activeSearch === "dates" ? "active" : ""}`}
                onClick={() => setActiveSearch("dates")}
              >
                <label>When</label>
                <input
                  type="text"
                  placeholder="Add dates"
                  value={localSearch.dates}
                  onChange={(e) => setLocalSearch((p) => ({ ...p, dates: e.target.value }))}
                />
              </div>
              <div className="search-divider" />
              <div
                className={`search-field ${activeSearch === "guests" ? "active" : ""}`}
                onClick={() => setActiveSearch("guests")}
              >
                <label>Who</label>
                <input
                  type="number"
                  placeholder="Add guests"
                  min={1}
                  max={16}
                  value={localSearch.guests}
                  onChange={(e) => setLocalSearch((p) => ({ ...p, guests: e.target.value }))}
                />
              </div>
              <button className="search-submit" type="submit" aria-label="Search">
                <FiSearch />
                <span>Search</span>
              </button>
            </form>
          </div>
        )}

        {/* Right Nav */}
        <div className="navbar__right">
          <Link to="/host" className="navbar__host-link">Become a Host</Link>
          <button className="navbar__globe" aria-label="Language">
            <FiGlobe size={18} />
          </button>
          <div className="navbar__menu-wrapper" ref={menuRef}>
            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <FiMenu size={18} />
              <div className="navbar__avatar">
                <FiUser size={16} />
              </div>
            </button>
            {menuOpen && (
              <div className="navbar__dropdown">
                <Link to="/login" className="dropdown-item dropdown-item--bold" onClick={() => setMenuOpen(false)}>Sign up</Link>
                <Link to="/login" className="dropdown-item" onClick={() => setMenuOpen(false)}>Log in</Link>
                <div className="dropdown-divider" />
                <Link to="/wishlist" className="dropdown-item" onClick={() => setMenuOpen(false)}>Wishlists</Link>
                <Link to="/host" className="dropdown-item" onClick={() => setMenuOpen(false)}>Host your home</Link>
                <Link to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>Help</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
