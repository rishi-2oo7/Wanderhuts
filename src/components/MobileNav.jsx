import { NavLink } from "react-router-dom";
import { FiSearch, FiHeart, FiUser, FiGrid } from "react-icons/fi";
import { MdExplore } from "react-icons/md";
import "./MobileNav.css";

export default function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/" end className={({ isActive }) => `mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}>
        <FiSearch size={22} />
        <span>Explore</span>
      </NavLink>
      <NavLink to="/wishlist" className={({ isActive }) => `mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}>
        <FiHeart size={22} />
        <span>Wishlists</span>
      </NavLink>
      <NavLink to="/host" className={({ isActive }) => `mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}>
        <FiGrid size={22} />
        <span>Host</span>
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => `mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}>
        <FiUser size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
