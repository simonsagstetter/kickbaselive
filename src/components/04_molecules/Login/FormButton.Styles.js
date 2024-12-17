const styles = {
    submit: {
        sizing: "w-full",
        typo: "text-center uppercase font-medium tracking-wider text-kborange",
        background: "bg-transparent",
        border: "rounded-2xl border-2 border-kborange",
        spacing: "px-3 py-1 mt-6",
        pseudo: {
            focus: {
                border: "focus:outline-zinc-300 focus:outline-1",
            },
        },
    },
    process: {
        sizing: "w-full",
        typo: "text-center uppercase font-medium tracking-wider text-zinc-950",
        background: "bg-kborange",
        border: "rounded-2xl border-2 border-kborange",
        spacing: "px-3 py-1 mt-6",
        pseudo: {
            focus: {
                border: "focus:outline-zinc-300 focus:outline-1",
            },
            disabled: {
                interactivity: "disabled:cursor-not-allowed",
            },
        },
    },
    text: {
        layout: "align-middle",
    },
};

export default styles;
