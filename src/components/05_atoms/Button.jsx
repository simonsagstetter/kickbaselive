import { node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    base: {
        layout: "flex flex-row items-center justify-center gap-1",
        typo: "text-center uppercase font-medium text-md tracking-wider",
        spacing: "px-3",
        border: "rounded-2xl",
        pseudo: "group",
        transition: "ease-out",
        hover: {
            transform: "hover:scale-105 duration-200",
        },
        focus: {
            border: "focus:outline-zinc-300",
        },
    },
    orange: {
        typo: "text-kborange",
        background: "bg-transparent",
        border: "border-1 border-kborange",
    },
    orange_inset: {
        typo: "text-zinc-950",
        background: "bg-kborange",
        border: "border-1 border-kborange",
    },
    green: {
        typo: "text-kbgreen",
        background: "bg-transparent",
        border: "border-1 border-kbgreen",
    },
    green_inset: {
        typo: "text-zinc-950",
        background: "bg-kbgreen",
        border: "border-1 border-kbgreen",
    },
});

export function Button({ children, ...props }) {
    const cssClasses = `${_.base} ${_.orange}`;
    return (
        <button type="button" className={cssClasses} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: node.isRequired,
};

export function ButtonInset({ children, ...props }) {
    const cssClasses = `${_.base} ${_.orange_inset}`;
    return (
        <button type="button" className={cssClasses} {...props}>
            {children}
        </button>
    );
}

ButtonInset.propTypes = {
    children: node.isRequired,
};

export default Button;
