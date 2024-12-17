import { page } from "@/motion/motionConfig";
import { motion } from "framer-motion";
import { node } from "prop-types";
import { useLocation } from "react-router-dom";

function AnimatedMiddleware({ children }) {
    const location = useLocation();

    return (
        <motion.div {...page} key={location.pathname}>
            {children}
        </motion.div>
    );
}

AnimatedMiddleware.propTypes = {
    children: node.isRequired,
};

export default AnimatedMiddleware;
