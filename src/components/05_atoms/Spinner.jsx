import { string } from "prop-types";

function Spinner({ classNames = "h-5 w-5", color = "currentColor", ...props }) {
    let cssClasses = `animate-spin align-middle mr-4 inline-block text-zinc-950 ${classNames}`;
    return (
        <svg className={cssClasses} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill={color}
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
}

Spinner.propTypes = {
    classNames: string,
    color: string,
};

export default Spinner;
