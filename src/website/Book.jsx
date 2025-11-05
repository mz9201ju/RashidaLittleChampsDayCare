import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import ToyLayer from "./ToyLayer";

const Book = () => {
    const bookRef = useRef();
    const [flipKey, setFlipKey] = useState(0); // 🔁 used to trigger toy re-randomization

    const [size, setSize] = useState({
        width: Math.min(window.innerWidth * 0.75, 1000),
        height: Math.min(window.innerHeight * 0.8, 800),
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: Math.min(window.innerWidth * 0.75, 1000),
                height: Math.min(window.innerHeight * 0.8, 800),
            });
            bookRef.current?.pageFlip().update();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextPage = () => bookRef.current?.pageFlip().flipNext();
    const prevPage = () => bookRef.current?.pageFlip().flipPrev();

    // 🔄 Trigger toys to move when page flips
    const handleFlip = () => {
        setFlipKey((prev) => prev + 1); // re-render ToyLayer with new random positions
    };

    return (
        <div className="daycare-scene">
            {/* 🎠 Toys re-render on every flip */}
            <ToyLayer key={flipKey} />

            <div className="moving-clouds"></div>

            <div
                className="book-wrapper"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    e.currentTarget.style.transform = `translate(-50%, -50%) rotateY(${x * 6
                        }deg) rotateX(${y * -4}deg)`;
                }}
                onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translate(-50%, -50%)")
                }
            >
                <HTMLFlipBook
                    ref={bookRef}
                    width={size.width}
                    height={size.height}
                    size="fixed"
                    minWidth={320}
                    maxWidth={1000}
                    minHeight={240}
                    maxHeight={800}
                    drawShadow={true}
                    flippingTime={1000}
                    showCover={true}
                    startZIndex={10}
                    mobileScrollSupport={false}
                    useMouseEvents={true}
                    className="daycare-book"
                    onFlip={handleFlip} // 🪄 this is the magic line
                >
                    {/* 🌈 FRONT COVER */}
                    <div className="book-page cover-front sparkle">
                        <h3>🌈 Rashida’s Little Champs</h3>
                        <p>Where every child shines bright ✨</p>
                        <p className="tap-hint">Tap to open the story!</p>
                    </div>

                    {/* PAGE 1 — Welcome */}
                    <div className="book-page">
                        <h2>Welcome 🧸</h2>
                        <p>
                            At <strong>Rashida’s Little Champs</strong>, we believe every child
                            deserves a nurturing, creative, and joyful start in life.
                        </p>
                        <p>We’re more than daycare — we’re family 💖</p>
                    </div>

                    {/* PAGE 2 — Our Mission */}
                    <div className="book-page">
                        <h2>Our Mission 🌟</h2>
                        <p>
                            To inspire curiosity, kindness, and confidence through play,
                            discovery, and love. Our educators guide each child’s journey with
                            care and patience.
                        </p>
                    </div>

                    {/* PAGE 3 — Daily Activities */}
                    <div className="book-page">
                        <h2>Daily Fun 🎨</h2>
                        <ul>
                            <li>🌞 Morning circle time & songs</li>
                            <li>🎨 Arts, crafts, and sensory play</li>
                            <li>📚 Storytime adventures</li>
                            <li>🍎 Healthy snacks & lunch</li>
                            <li>🧩 Outdoor games and teamwork</li>
                        </ul>
                    </div>

                    {/* PAGE 4 — Learning */}
                    <div className="book-page">
                        <h2>Learning Through Play 🧠</h2>
                        <p>
                            We blend fun with learning — letters, colors, counting, and
                            storytelling come alive through hands-on activities.
                        </p>
                    </div>

                    {/* PAGE 5 — Parents */}
                    <div className="book-page">
                        <h2>Parents 🤝</h2>
                        <p>
                            We work closely with parents to ensure every child’s growth and
                            happiness. Communication is open and daily reports are shared.
                        </p>
                    </div>

                    {/* PAGE 6 — Contact */}
                    <div className="book-page">
                        <h2>Visit Us 🕒</h2>
                        <p>
                            <strong>Hours:</strong> Monday – Friday, 7:30 AM – 6:00 PM <br />
                            <strong>Location:</strong> 123 Sunshine Avenue, Seattle, WA <br />
                            <strong>Contact:</strong> (425) 555-1844 <br />
                            <strong>Email:</strong> info@rashidaslittlechamps.com
                        </p>
                    </div>

                    {/* 🌈 BACK COVER */}
                    <div className="book-page cover-back sparkle">
                        <h2>Thank You 💕</h2>
                        <p>We can’t wait to welcome your little champ!</p>
                    </div>
                </HTMLFlipBook>

                <button className="nav-arrow left" onClick={prevPage}>
                    ‹
                </button>
                <button className="nav-arrow right" onClick={nextPage}>
                    ›
                </button>
            </div>
        </div>
    );
};

export default Book;
