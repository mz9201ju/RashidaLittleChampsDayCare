import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
 * 📖 BookLayout — Fullscreen 3D Page Flip
 * - Each page fills the screen (not half)
 * - Flips from the center using 3D transform
 * - Fully mobile-responsive
 */
export default function BookLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState("right");

    const goNext = () => {
        if (isFlipping) return;
        if (location.pathname === "/contact") return; // ⛔ stop at the end

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
                    break; // 🚫 no looping
            }
            setIsFlipping(false);
        }, 900);
    };

    const goBack = () => {
        if (isFlipping) return;
        if (location.pathname === "/") return; // ⛔ Do nothing on home

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
                    break; // 🚫 No default navigation
            }
            setIsFlipping(false);
        }, 900);
    };

    return (
        <div className="storybook-container">
            <PlayfulBackground />

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
