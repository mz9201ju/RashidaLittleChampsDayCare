import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PlayfulBackground from "./PlayfulBackground";
import "../styles/pageflip.css";

// ✅ Import all your pages
import Home from "../pages/Home";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

/**
 * 📖 BookLayout — Transparent Storybook
 * - Background stays visible
 * - Transparent pages
 * - Arrows on both sides
 * - Fully mobile-friendly
 */
export default function BookLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState("right");

    // ➡️ Next page
    const goNext = () => {
        if (isFlipping) return;
        setDirection("right");
        setIsFlipping(true);
        setTimeout(() => {
            switch (location.pathname) {
                case "/":
                    navigate("/services");
                    break;
                case "/services":
                    navigate("/gallery");
                    break;
                case "/gallery":
                    navigate("/about");
                    break;
                case "/about":
                    navigate("/contact");
                    break;
                default:
                    navigate("/");
            }
            setIsFlipping(false);
        }, 700);
    };

    // ⬅️ Previous page
    const goBack = () => {
        if (isFlipping) return;
        setDirection("left");
        setIsFlipping(true);
        setTimeout(() => {
            switch (location.pathname) {
                case "/services":
                    navigate("/");
                    break;
                case "/gallery":
                    navigate("/services");
                    break;
                case "/about":
                    navigate("/gallery");
                    break;
                case "/contact":
                    navigate("/about");
                    break;
                default:
                    navigate("/");
            }
            setIsFlipping(false);
        }, 700);
    };

    return (
        <div className="storybook-wrapper">
            {/* 🌈 Animated background */}
            <PlayfulBackground />

            {/* 📖 Flip animation */}
            <div className={`book-page ${isFlipping ? `flip-${direction}` : ""}`}>
                <div className="page-content">
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                    </Routes>
                </div>
            </div>


            {/* 🧭 Navigation Arrows */}
            <button className="nav-btn left animate-glow" onClick={goBack}>
                ←
            </button>
            <button className="nav-btn right animate-glow" onClick={goNext}>
                →
            </button>
        </div>
    );
}
