// src/components/BookPage.jsx
import React from "react";
import "./bookFlip.css";

export default function BookPage({ children, isFlipped, direction = "right" }) {
    return (
        <div
            className={`book-page ${direction} ${isFlipped ? "flipped" : ""}`}
        >
            <div className="page-content">{children}</div>
        </div>
    );
}
