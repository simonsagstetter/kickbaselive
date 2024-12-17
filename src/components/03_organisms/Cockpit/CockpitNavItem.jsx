import { node, string } from "prop-types";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { motion } from "framer-motion";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./CockpitNavItem.Styles";

const _ = new TailwindStyleSheet(styles);

function CockpitNavItem({ label, route, Icon }) {
    const location = useLocation();
    const resolvedPath = useResolvedPath(route);

    const isActive = location.pathname.startsWith(resolvedPath.pathname);
    return (
        <Link to={route} relative="path" className={`${_.item} ${isActive ? "text-kborange" : ""}`}>
            {Icon}
            {isActive && (
                <motion.span layoutId="label" className={_.itemText}>
                    {label}
                </motion.span>
            )}
        </Link>
    );
}

export default CockpitNavItem;

CockpitNavItem.propTypes = {
    label: string.isRequired,
    route: string.isRequired,
    Icon: node.isRequired,
};
