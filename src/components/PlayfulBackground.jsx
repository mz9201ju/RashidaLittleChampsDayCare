import { useEffect, useState } from "react";

export default function PlayfulBackground() {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        // 🎨 Generate random floating toys / balloons
        const toys = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            size: 40 + Math.random() * 60,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: 20 + Math.random() * 15,
            color: `hsl(${Math.random() * 360}, 85%, 70%)`,
            type: ["balloon", "cube", "teddy", "ball"][Math.floor(Math.random() * 4)],
        }));
        setElements(toys);
    }, []);

    return (
        <div className="kids-bg">
            {/* 🌈 Animated gradient background */}
            <div className="animated-gradient" />

            {/* ☁️ Drifting clouds */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={`cloud-${i}`}
                    className="cloud"
                    style={{
                        top: `${10 + Math.random() * 70}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${40 + Math.random() * 20}s`,
                    }}
                />
            ))}

            {/* 🌟 Twinkling stars */}
            {[...Array(40)].map((_, i) => (
                <div
                    key={`star-${i}`}
                    className="star"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            {/* 🎈 Floating toys & balloons */}
            {elements.map((el) => (
                <div
                    key={el.id}
                    className={`toy ${el.type}`}
                    style={{
                        width: el.size,
                        height: el.size,
                        left: `${el.left}%`,
                        backgroundColor: el.color,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
