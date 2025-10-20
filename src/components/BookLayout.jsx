import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PlayfulBackground from "./PlayfulBackground";
import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import PageTransition from "../components/PageTransition";

import "../styles/pageflip.css";

export default function BookLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState("right");

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
        }, 1000);
    };

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
        }, 1000);
    };

    return (
        <div className="storybook-wrapper">
            <PlayfulBackground />

            {/* LEFT PAGE (static) */}
            <div className="half-page left-page">
                <AnimatePresence mode="wait">
                    <Routes location={location}>
                        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                        <Route path="/services" element={<PageTransition><Home /></PageTransition>} />
                        <Route path="/gallery" element={<PageTransition><Services /></PageTransition>} />
                        <Route path="/about" element={<PageTransition><Gallery /></PageTransition>} />
                        <Route path="/contact" element={<PageTransition><AboutUs /></PageTransition>} />
                    </Routes>
                </AnimatePresence>
            </div>

            {/* RIGHT PAGE (flipping) */}
            <div className={`half-page right-page ${isFlipping ? `flip-${direction}` : ""}`}>
                <div className="page-content">
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
                <div className="page-back" />
            </div>

            {/* NAVIGATION BUTTONS */}
            <button className="nav-btn left" onClick={goBack}>←</button>
            <button className="nav-btn right" onClick={goNext}>→</button>
        </div>
    );
}
