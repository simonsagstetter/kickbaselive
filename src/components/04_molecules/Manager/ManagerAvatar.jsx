import { bool, string } from "prop-types";
import { AwaitImage } from "@/components/05_atoms/Image";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    avatarWrapper: {
        layout: "overflow-hidden",
        sizing: "h-16 w-16",
        border: "rounded-full border-2",
        effect: "shadow-sm shadow-zinc-950",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
            },
        },
    },
    image: {
        sizing: "h-16 h-16",
        layout: "object-cover block",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
            },
        },
    },
    image_fallback: {
        sizing: "h-16 h-16",
        layout: "block",
        border: "rounded-full",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
            },
        },
    },
});

function ManagerAvatar({ isWinner, userAvatar, userName }) {
    return (
        <div className={`${_.avatarWrapper} ${isWinner ? "border-kbgreen" : "border-transparent"}`}>
            <AwaitImage src={userAvatar} alt={userName} className={_.image} fallbackClasses={_.image_fallback} />
        </div>
    );
}

export default ManagerAvatar;

ManagerAvatar.propTypes = {
    isWinner: bool.isRequired,
    userAvatar: string.isRequired,
    userName: string.isRequired,
};
