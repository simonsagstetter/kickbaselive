import { object } from "prop-types";
import { useNavigate } from "react-router-dom";
import ManagerAvatar from "@/components/04_molecules/Manager/ManagerAvatar";
import ManagerDetail from "@/components/04_molecules/Manager/ManagerDetail";
import ManagerScore from "@/components/04_molecules/Manager/ManagerScore";
import { motion } from "framer-motion";
import { listItem } from "@/motion/motionConfig";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./ManagerListItem.Styles";

const _ = new TailwindStyleSheet(styles);

function ManagerListItem({ manager }) {
    const { userAvatar, userName, dayPlacement, dayPoints, dayEarnings } = manager;
    const navigate = useNavigate();
    const isWinner = dayPlacement === 1;

    function handleManagerClick(e) {
        e.stopPropagation();
        navigate(manager.userId, { relative: "path" });
    }

    return (
        <motion.li layout="position" {...listItem} transition={{ type: "spring", duration: 0.5, delay: 0.75 }}>
            <motion.div
                onClick={handleManagerClick}
                className={_.listItem}
                whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", duration: 0.4, delay: 0 },
                }}
            >
                <ManagerAvatar {...{ isWinner, userAvatar, userName }} />
                <ManagerDetail {...{ isWinner, userName, dayPlacement }} />
                <ManagerScore {...{ isWinner, dayPoints, dayEarnings }} />
            </motion.div>
        </motion.li>
    );
}

export default ManagerListItem;

ManagerListItem.propTypes = {
    manager: object.isRequired,
};
