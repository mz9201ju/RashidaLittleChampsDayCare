import { useEffect } from "react";

/**
 * 🏠 Services Page — Clean Fullscreen Centered Layout
 * - Always visible, even if global CSS conflicts
 * - Transparent overlay card
 * - Floating decorations work
 */
export default function Gallery() {
    const siteData = {
        siteName: "Gallery",
        service1: "",
        service2: "",
        service3: "",
        backgroundImage:
            "https://cdn.pixabay.com/photo/2017/02/12/14/45/kids-2062436_1280.jpg",
        footerText: "Page 3 • Welcome to our gallery 🌷",
        decorations: [
            "https://cdn-icons-png.flaticon.com/512/477/477406.png",   // ⭐ Cute star (rounded edges)
            "https://cdn-icons-png.flaticon.com/512/616/616408.png",   // 🌍 Smiling earth (friendly global feel)
            "https://cdn-icons-png.flaticon.com/512/616/616510.png",   // 🦋 Butterfly (spring vibe)
            "https://cdn-icons-png.flaticon.com/512/616/616408.png",   // ☀️ Sun/star variation
            "https://cdn-icons-png.flaticon.com/512/3076/3076049.png", // 🏡 Small house (home daycare reference)
        ]
        ,
    };

    const { siteName, service1, service2, service3, backgroundImage, decorations, footerText } = siteData;

    const randomizedDecorations = decorations.map((src, i) => ({
        src,
        alt: `decoration-${i}`,
        style: {
            position: "absolute",
            top: `${Math.random() * 80 + 5}%`,
            left: `${Math.random() * 80 + 5}%`,
            width: `${Math.random() * 50 + 40}px`,
            opacity: 0.6,
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
            animation: `float ${10 + i * 2}s ease-in-out infinite alternate`,
        },
    }));

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 10;
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            document.querySelectorAll(".decoration").forEach((el, i) => {
                const baseRotate = el.dataset.rotate || 0;
                el.style.transform = `translate(${x * (i + 1)}px, ${y * (i + 1)}px) rotate(${baseRotate}deg)`;
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-[#fffafc]">
            {/* 🔹 Background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    filter: "blur(6px) brightness(1.05)",
                    transform: "scale(1.03)",
                    opacity: 0.35,
                    zIndex: 0,
                }}
            />

            {/* ✨ Decorations */}
            {randomizedDecorations.map((d, i) => (
                <img
                    key={i}
                    src={d.src}
                    alt={d.alt}
                    style={d.style}
                    className="decoration select-none pointer-events-none z-10"
                    data-rotate={d.style.transform.match(/-?\\d+/)?.[0] ?? 0}
                />
            ))}

            {/* 💖 Content Card */}
            <main className="relative z-20 w-full max-w-5xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-10 sm:p-14 border border-white/40 text-center">
                <h1 className="font-chewy text-4xl sm:text-6xl text-gray-900 mb-6">
                    {siteName}
                </h1>

                <p
                    className="text-base sm:text-lg leading-relaxed font-medium text-gray-800"
                    dangerouslySetInnerHTML={{ __html: service1 }}
                />
            </main>

            {/* 📄 Footer */}
            <footer className="relative z-20 text-gray-700 text-sm italic mt-8 mb-6">
                {footerText}
            </footer>

            {/* 🎈 Float Animation */}
            <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
      `}</style>
        </div>
    );
}
