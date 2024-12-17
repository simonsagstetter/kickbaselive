const styles = {
    matchdayItem: {
        layout: "relative",
        typo: "text-zinc-200 text-center",
        spacing: "py-4 px-8",
        border: "border-zinc-400/5 border-2 rounded-2xl",
    },
    past: {
        spacing: "mb-4",
        background: "bg-zinc-400/15",
        hover: {
            interact: "hover:cursor-pointer",
            border: "hover:border-zinc-600",
        },
    },
    live: {
        spacing: "mb-8",
        background: "bg-kborange",
    },
    matchdayBody: {
        layout: "flex flex-row items-center justify-start gap-10",
        responsive: {
            sm: {
                layout: "max-sm:gap-4",
            },
        },
    },
};

export default styles;
