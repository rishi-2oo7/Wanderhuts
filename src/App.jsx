import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import Wishlist from "./pages/Wishlist";
import Host from "./pages/Host";
import ToastContainer from "./components/Toast";
import MobileNav from "./components/MobileNav";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/host" element={<Host />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <MobileNav />
      </BrowserRouter>
    </AppProvider>
  );
}

function Login() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "80px" }}>
      <div style={{ background: "white", border: "1.5px solid #e5e7eb", borderRadius: "24px", padding: "48px", width: "400px", boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
        <h2 style={{ margin: "0 0 6px", fontSize: "1.5rem", fontWeight: 800, color: "#111827" }}>Log in to WanderHuts</h2>
        <p style={{ margin: "0 0 28px", color: "#6b7280", fontSize: "0.875rem" }}>Welcome back! Please sign in to continue.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {["Continue with Google", "Continue with Apple", "Continue with Facebook"].map((label, i) => (
            <button key={i} style={{ padding: "14px", border: "1.5px solid #e5e7eb", borderRadius: "12px", background: "white", font: "600 0.9rem/1 inherit", cursor: "pointer", color: "#111827", transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#f9fafb"}
              onMouseLeave={e => e.target.style.background = "white"}>
              {label}
            </button>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
            <span style={{ color: "#9ca3af", fontSize: "0.8125rem" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>
          <input type="email" placeholder="Email address" style={{ padding: "14px 16px", border: "1.5px solid #e5e7eb", borderRadius: "12px", font: "0.9rem/1 inherit", outline: "none", color: "#111827" }} />
          <button style={{ padding: "16px", background: "linear-gradient(135deg,#FF385C,#E00B41)", color: "white", border: "none", borderRadius: "12px", font: "700 0.95rem/1 inherit", cursor: "pointer" }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
