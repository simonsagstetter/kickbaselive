const styles = {
    wrapper: {
        layout: "relative basis-1/12 grow-0",
        sizing: "max-w-16",
    },
    coverWrapper: {
        layout: "overflow-hidden z-10 relative",
        effects: "shadow-sm shadow-zinc-950",
        border: "rounded-full",
        sizing: "h-16 w-16",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
                background: "max-sm:bg-zinc-800",
            },
        },
    },
    cover: {
        layout: "object-cover",
        sizing: "h-16 w-auto",
        responsive: {
            sm: {
                sizing: "max-sm:h-14",
            },
        },
    },
    coverFallback: {
        layout: "object-cover",
        sizing: "h-16 w-16",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
            },
        },
    },
    status: {
        layout: "hidden absolute top-0 left-0 z-0",
        sizing: "h-14 w-14",
        border: "rounded-full",
        background: "bg-kborange",
        animation: "animate-ping-slow",
        responsive: {
            sm: {
                layout: "max-sm:block",
            },
        },
    },
};

export default styles;
