import React from "react";

const random = (min, max) => Math.random() * (max - min) + min;

export default function ToyLayer() {
    const toys = [
        { className: "toy sun" },
        { className: "toy star-left" },
        { className: "toy star-right" },
        { className: "toy ball-left" },
        { className: "toy ball-right" },
        { className: "toy block-left", content: "A" },
        { className: "toy block-right", content: "B" },
        { className: "toy cloud-left" },
        { className: "toy cloud-right" },
    ];

    return (
        <div className="toy-layer">
            {toys.map((toy, i) => (
                <div
                    key={i}
                    className={toy.className}
                    style={{
                        top: `${random(5, 80)}%`,
                        left: `${random(5, 90)}%`,
                    }}
                >
                    {toy.content || ""}
                </div>
            ))}
        </div>
    );
}
