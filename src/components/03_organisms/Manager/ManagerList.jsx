import { array } from "prop-types";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { list } from "@/motion/motionConfig";
import ManagerListItem from "./ManagerListItem";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./ManagerList.Styles";

const _ = new TailwindStyleSheet(styles);

function ManagerList({ managers }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const loadedManagers = managers || useSelector((state) => state.live.managers);

    return (
        <motion.ul {...list} className={_.list}>
            {loadedManagers.map((manager) => (
                <ManagerListItem key={manager.userId} manager={manager} />
            ))}
        </motion.ul>
    );
}

export default ManagerList;

ManagerList.propTypes = {
    managers: array,
};
