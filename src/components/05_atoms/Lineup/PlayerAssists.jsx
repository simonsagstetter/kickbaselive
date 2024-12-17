import { number } from "prop-types";
import { GiRunningShoe } from "react-icons/gi";
import { TailwindStyleSheet } from "@/utils/tw";

const { wrapper, icon } = new TailwindStyleSheet({
    wrapper: {
        layout: "flex flex-row gap-1 items-center justify-start",
    },
    icon: {
        sizing: "h-3 w-auto",
        typo: "text-zinc-300",
    },
});

function PlayerAssists({ amount }) {
    const fragments = [];
    for (let i = 0; i < amount; i++) {
        fragments.push(<GiRunningShoe key={i} className={icon} />);
    }
    return <div className={wrapper}>{fragments}</div>;
}

export default PlayerAssists;

PlayerAssists.propTypes = {
    amount: number.isRequired,
};
