import React from "react";

/**
 * 🏠 Contact Us Page — Clean Fullscreen Centered Layout
 * - Footer visually pinned to bottom of viewport
 * - Works even inside 3D book/page flip containers
 */
export default function AboutUs() {
    const siteData = {
        siteName: "About Us",
        description: `IN MAINTENANCE`,
        footerText: "Page 4 • About Us 🌷",
    };

    const { siteName, description, footerText } = siteData;

    return (
        <div
            className="relative w-full overflow-x-hidden bg-[#fffafc]"
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 0,
            }}
        >
            {/* 💖 Content Card */}
            <main className="relative z-10 w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-10 sm:p-14 border border-white/40 text-center">
                <h1 className="font-chewy text-4xl sm:text-6xl home-page-h1 text-gray-900 mb-6">
                    {siteName}
                </h1>

                <p
                    className="relative text-center max-w-3xl mx-auto text-gray-700/95 leading-relaxed sm:leading-loose text-lg sm:text-xl font-medium tracking-wide px-6 sm:px-10 mt-6 sm:mt-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/30 py-6 sm:py-8 animate-fadeIn"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </main>

            {/* 📄 Footer — Forced to stay at bottom */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    padding: "1rem 0",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(6px)",
                    borderTop: "1px solid rgba(255,255,255,0.4)",
                    fontStyle: "italic",
                    color: "#444",
                    zIndex: 9999,
                }}
            >
                {footerText}
            </div>
        </div>
    );
}
