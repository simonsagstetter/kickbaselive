const styles = {
    group: {
        layout: "relative",
        sizing: "w-full",
    },
    checkmarkWrapper: {
        layout: "invisible absolute right-1 bottom-2",
        typo: "text-kborange",
        pseudo: {
            valid: {
                layout: "peer-valid:visible",
            },
        },
    },
    checkmark: {
        sizing: "h-8 w-8",
    },
    label: {
        typo: "text-zinc-400 text-xs font-extralight tracking-wide",
        spacing: "mr-8",
    },
    label_invalid: {
        typo: "text-kborange text-xs font-extralight tracking-wide",
        spacing: "mr-8",
    },
    input: {
        sizing: "w-full",
        spacing: "py-2 pl-2 pr-9 ",
        typo: "text-zinc-200 font-extralight tracking-widest",
        border: "border-b-2 border-zinc-400 outline-none",
        background: "bg-transparent",
        pseudo: {
            marker: "peer",
            disabled: {
                interactivity: "disabled:cursor-not-allowed",
            },
        },
    },
    input_invalid: {
        sizing: "w-full",
        spacing: "py-2 pl-2 pr-9 ",
        typo: "text-zinc-200 font-extralight tracking-widest",
        border: "border-b-2 border-kborange outline-none",
        background: "bg-transparent",
        pseudo: {
            marker: "peer",
            disabled: {
                interactivity: "disabled:cursor-not-allowed",
            },
        },
    },
};

export default styles;
