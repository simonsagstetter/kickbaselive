import { string, bool, any } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { AnimatePresence, motion } from "framer-motion";
import { popValue } from "@/motion/motionConfig";
import styles from "./HeaderTitle.Styles";

const _ = new TailwindStyleSheet(styles);

function HeaderTitle({ title, subtitle, addClasses = "", animated = false }) {
    let titleElement = <h1 className={`${_.title} ${addClasses}`}>{title}</h1>;

    if (animated) {
        titleElement = (
            <h1 className={`${_.titleAnimated} ${addClasses}`}>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span key={title} {...popValue}>
                        {title}
                    </motion.span>
                </AnimatePresence>
            </h1>
        );
    }

    return (
        <>
            <h4 className={_.subtitle}>{subtitle}</h4>
            {titleElement}
        </>
    );
}

export default HeaderTitle;

HeaderTitle.propTypes = {
    title: any.isRequired,
    subtitle: string.isRequired,
    addClasses: string,
    animated: bool,
};
