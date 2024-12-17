import { bool, string, number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    detailWrapper: {
        layout: "flex flex-col gap-2",
    },
    placement: {
        layout: "flex flex-row items-center justify-center self-start",
        spacing: "px-3",
        typo: "text-xs font-medium tracking-tight",
        border: "rounded-2xl",
    },
    placementText: {
        typo: "font-bold",
    },
    username: {
        typo: "truncate text-2xl leading-6 font-medium",
        responsive: {
            sm: {
                typo: "max-sm:text-xl",
            },
        },
    },
});

function ManagerDetail({ isWinner, dayPlacement, userName }) {
    return (
        <div className={_.detailWrapper}>
            <div className={`${_.placement} ${isWinner ? "bg-kbgreen text-kbdark" : "bg-zinc-800 text-zinc-200"}`}>
                <span className={_.placementText}>{dayPlacement}</span>
            </div>
            <p className={`${_.username} ${isWinner ? "text-kbgreen" : "text-zinc-200"}`}>{userName}</p>
        </div>
    );
}

export default ManagerDetail;

ManagerDetail.propTypes = {
    isWinner: bool.isRequired,
    dayPlacement: number.isRequired,
    userName: string.isRequired,
};
