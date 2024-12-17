import { number } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import { IoIosFootball } from "react-icons/io";

const { wrapper, icon } = new TailwindStyleSheet({
    wrapper: {
        layout: "flex flex-row gap-1 items-center justify-start",
    },
    icon: {
        sizing: "h-3 w-auto",
        typo: "text-zinc-300",
    },
});

function PlayerGoals({ amount }) {
    const fragments = [];
    for (let i = 0; i < amount; i++) {
        fragments.push(<IoIosFootball key={i} className={icon} />);
    }
    return <div className={wrapper}>{fragments}</div>;
}

export default PlayerGoals;

PlayerGoals.propTypes = {
    amount: number.isRequired,
};
