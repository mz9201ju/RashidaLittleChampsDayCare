import { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PlayfulBackground from "./PlayfulBackground";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PageTransition from "../components/PageTransition";

import "../styles/pageflip.css";

/**
 * 📖 BookLayout — Fullscreen 3D Page Flip + Responsive Burger Menu
 */
export default function BookLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState("right");
    const [menuOpen, setMenuOpen] = useState(false);

    const goNext = () => {
        if (isFlipping || location.pathname === "/contact") return;
        setDirection("right");
        setIsFlipping(true);
        setTimeout(() => {
            switch (location.pathname) {
                case "/": navigate("/services"); break;
                case "/services": navigate("/gallery"); break;
                case "/gallery": navigate("/about"); break;
                case "/about": navigate("/contact"); break;
                default: break;
            }
            setIsFlipping(false);
        }, 900);
    };

    const goBack = () => {
        if (isFlipping || location.pathname === "/") return;
        setDirection("left");
        setIsFlipping(true);
        setTimeout(() => {
            switch (location.pathname) {
                case "/services": navigate("/"); break;
                case "/gallery": navigate("/services"); break;
                case "/about": navigate("/gallery"); break;
                case "/contact": navigate("/about"); break;
                default: break;
            }
            setIsFlipping(false);
        }, 900);
    };

    return (
        <div className="storybook-container">
            <PlayfulBackground />

            {/* 🌟 Mobile Burger Menu */}
            <div className="burger-wrapper">
                <button
                    className={`burger-btn ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {menuOpen && (
                    <div className="burger-menu">
                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
                        <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
                        <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </div>
                )}
            </div>

            {/* Page Flip Area */}
            <div className={`page ${isFlipping ? `flip-${direction}` : ""}`}>
                <div className="page-front">
                    <AnimatePresence mode="wait">
                        <Routes location={location}>
                            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
                            <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
                            <Route path="/contact" element={<PageTransition><ContactUs /></PageTransition>} />
                        </Routes>
                    </AnimatePresence>
                </div>
            </div>

            <button className="nav-btn left" onClick={goBack}>←</button>
            <button className="nav-btn right" onClick={goNext}>→</button>
        </div>
    );
}
