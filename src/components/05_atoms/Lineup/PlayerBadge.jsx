import { number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    badge: {
        layout: "absolute flex flex-col items-center -top-1 -right-2 z-20",
        background: "bg-zinc-800",
        spacing: "px-3",
        border: "rounded-2xl",
        responsive: {
            sm: {
                layout: "max-sm:-right-1",
                spacing: "max-sm:px-2.5",
            },
        },
    },
    badgeContent: {
        typo: "text-zinc-200 font-bold tracking-tight text-sm",
        responsive: { sm: { typo: "max-sm:text-xs" } },
    },
});

function PlayerBadge({ index }) {
    const placement = +index + 1,
        isWinner = index === 0,
        badgeClasses = `${_.badge} ${isWinner && "!bg-kbgreen"}`,
        badgeContentClasses = `${_.badgeContent} ${isWinner && "!text-kbdark"}`;

    return (
        <div className={badgeClasses}>
            <p className={badgeContentClasses}>{placement}</p>
        </div>
    );
}

export default PlayerBadge;

PlayerBadge.propTypes = {
    index: number.isRequired,
};
