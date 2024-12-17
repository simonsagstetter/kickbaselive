import { TailwindStyleSheet } from "@/utils/tw";
import { bool } from "prop-types";

const _ = new TailwindStyleSheet({
    wrapper: {
        sizing: "w-full",
    },
    bar: {
        sizing: "h-1 w-full",
        layout: "overflow-hidden",
    },
    progress: {
        sizing: "w-full h-full",
        border: "rounded-2xl",
        animation: "animate-progress origin-[0%_50%]",
        background: "bg-kborange/50",
    },
});

function ProgressBar({ isFetching }) {
    const barCssClasses = `${_.bar} ${isFetching ? "bg-kborange/50" : "bg-transparent"}`;
    return (
        <div className={_.wrapper}>
            <div className={barCssClasses}>{isFetching && <div className={_.progress}></div>}</div>
        </div>
    );
}

export default ProgressBar;

ProgressBar.propTypes = {
    isFetching: bool.isRequired,
};
