import { number, string } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    timeUnit: {
        layout: "flex flex-col items-center basis-1/4",
    },
    value: {
        typo: "font-bold",
    },
});

function Digit({ size, unitText, value }) {
    const valueCssClasses = `${_.value} text-${size}xl`;
    return (
        <div className={_.timeUnit}>
            <p className={valueCssClasses}>{value}</p>
            <small>{unitText}</small>
        </div>
    );
}

Digit.propTypes = {
    size: number.isRequired,
    unitText: string.isRequired,
    value: number.isRequired,
};

export default Digit;
