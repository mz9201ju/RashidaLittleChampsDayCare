// src/components/PageTransition.jsx
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
    const { pathname } = useLocation();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, translateZ: -200, rotateX: 30 }}
            animate={{ opacity: 1, translateZ: 0, rotateX: 0 }}
            exit={{ opacity: 0, translateZ: 200, rotateX: -30 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
            style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            {children}
        </motion.div>
    );
}
