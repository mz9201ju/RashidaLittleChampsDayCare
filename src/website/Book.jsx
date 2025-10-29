import HTMLFlipBook from "react-pageflip";
import { useState, useEffect, useRef } from "react";

export default function Book() {
    const [bookSize, setBookSize] = useState({ width: 600, height: 800 });
    const [isClosed, setIsClosed] = useState(false);
    const bookRef = useRef(null);
    const flipInstance = useRef(null);
    const totalPagesRef = useRef(0);

    useEffect(() => {
        const loadCSS = async () => {
            if (window.innerWidth <= 768) {
                await import("./book-mobile.css");
            } else {
                await import("./book-desktop.css");
            }
        };
        loadCSS();
    }, []);


    // 📏 Responsive sizing
    useEffect(() => {
        const updateSize = () => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            let width = Math.min(vw * 0.9, 600);
            let height = width * 1.33;
            if (height > vh * 0.85) {
                height = vh * 0.85;
                width = height / 1.33;
            }
            setBookSize({ width, height });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // 🧩 Detect 3D support and set fallback class
    useEffect(() => {
        const supports3D = CSS.supports("transform-style", "preserve-3d");
        document.body.classList.toggle("no-3d", !supports3D);
        console.log(supports3D ? "✅ 3D flip supported" : "⚠️ 3D disabled, using 2D fold");
    }, []);


    // ✅ Fired once flipbook fully initialized
    const handleInit = (instance) => {
        flipInstance.current = instance;
        try {
            totalPagesRef.current = instance.getPageCount() - 1; // ✅ actual last index
        } catch {
            totalPagesRef.current = 4; // fallback if API fails
        }
        console.log("Flipbook ready ✅ pages:", totalPagesRef.current + 1);
    };

    // 🧠 Flip event — stable even in prod
    const handleFlip = (e) => {
        const flipBook = flipInstance.current;
        if (!flipBook) return;

        const currentPage = e.data;
        const totalPages = totalPagesRef.current;

        console.log("Flip:", currentPage, "/", totalPages);

        // ✅ reached end
        if (currentPage >= totalPages && !isClosed) {
            setTimeout(() => setIsClosed(true), 300);
        }
        // ✅ flip back
        else if (isClosed && currentPage < totalPages) {
            setIsClosed(false);
        }
    };

    const handleClick = () => {
        if (isClosed) setIsClosed(false);
    };

    return (
        <div className="book-wrapper" onClick={handleClick}>
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>

            <HTMLFlipBook
                ref={bookRef}
                width={bookSize.width}
                height={bookSize.height}
                showCover={false}   // ⚡ make all pages soft, not hard
                className={`storybook ${isClosed ? "book-closed" : ""}`}
                style={{ borderRadius: "25px" }}
                maxShadowOpacity={0.2}
                usePortrait={true}  // 🧠 helps mobile / responsive
                flippingTime={1000} // smooth transition
                onFlip={handleFlip}
                onInit={handleInit}
                disableFlipByClick={isClosed}
            >
                {/* COVER */}
                <div className="page cover flex justify-center items-center text-center text-white relative">
                    <div className="cover-inner">
                        <h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-lg">
                            🌈 Little Champions
                        </h1>
                        <p className="text-xl sm:text-2xl mt-3 italic font-light">
                            Daycare Storybook
                        </p>
                        <p className="text-md sm:text-lg mt-5 font-medium">by Omer Zahid</p>
                    </div>
                </div>

                {/* PAGE 1 */}
                <div className="page bg-pink-50 text-gray-800 flex flex-col justify-center items-center p-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-pink-500">
                        Welcome!
                    </h2>
                    <p className="text-base sm:text-lg max-w-md">
                        Hi there, little champion! 💫 Let’s explore a magical world full of
                        colors, fun, and friends.
                    </p>
                </div>

                {/* PAGE 2 */}
                <div className="page bg-yellow-100 text-gray-800 flex flex-col justify-center items-center p-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-yellow-600">
                        Play Time!
                    </h2>
                    <p className="text-base sm:text-lg max-w-md">
                        We build, paint, and dance — every day is a new adventure filled
                        with smiles! 🎨✨
                    </p>
                </div>

                {/* PAGE 3 */}
                <div className="page bg-blue-100 text-gray-800 flex flex-col justify-center items-center p-6 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-blue-600">
                        Learning Together
                    </h2>
                    <p className="text-base sm:text-lg max-w-md">
                        We learn about shapes, colors, kindness, and teamwork while having
                        tons of fun! 📚🧸
                    </p>
                </div>

                {/* ✅ END PAGE */}
                <div className="page cover bg-green-400 flex justify-center items-center text-white text-2xl sm:text-3xl font-semibold">
                    <p>🌟 The End — Keep Shining, Little Champion!</p>
                </div>
            </HTMLFlipBook>
        </div>
    );
}
