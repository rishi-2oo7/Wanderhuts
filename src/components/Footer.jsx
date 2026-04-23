import "./Footer.css";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">AirCover</a></li>
              <li><a href="#">Anti-discrimination</a></li>
              <li><a href="#">Disability support</a></li>
              <li><a href="#">Cancellation options</a></li>
              <li><a href="#">Report neighbourhood concern</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Hosting</h4>
            <ul>
              <li><Link to="/host">WanderHuts your home</Link></li>
              <li><a href="#">AirCover for Hosts</a></li>
              <li><a href="#">Hosting resources</a></li>
              <li><a href="#">Community forum</a></li>
              <li><a href="#">Hosting responsibly</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>WanderHuts</h4>
            <ul>
              <li><a href="#">Newsroom</a></li>
              <li><a href="#">Learn about new features</a></li>
              <li><a href="#">Letter from our founders</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
              <li><a href="#">Gift cards</a></li>
            </ul>
          </div>
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <svg viewBox="0 0 32 32" width="40" height="40">
                <path d="M16 1C8.28 1 2 7.28 2 15c0 4.64 2.26 8.75 5.74 11.32L16 31l8.26-4.68C27.74 23.75 30 19.64 30 15 30 7.28 23.72 1 16 1z" fill="#FF385C"/>
                <path d="M16 8c-2.76 0-5 2.24-5 5 0 3.54 5 10 5 10s5-6.46 5-10c0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="white"/>
              </svg>
              <span>WanderHuts</span>
            </div>
            <p>Discover unique stays around the world. Find your perfect hut, cabin, or castle.</p>
            <div className="footer__socials">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2025 WanderHuts, Inc. · Privacy · Terms · Sitemap · Company details</span>
          <div className="footer__bottom-right">
            <span>🌐 English (US)</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
