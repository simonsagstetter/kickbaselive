const styles = {
    container: {
        layout: "relative",
        spacing: "mx-auto",
        sizing: "w-36 h-36",
        responsive: {
            sm: {
                sizing: "max-sm:w-28 max-sm:h-28",
            },
        },
    },
    placementWrapper: {
        layout: "absolute top-1 -right-2 z-10",
        typo: "font-medium tracking-tight text-zinc-200",
        border: "bg-zinc-800 rounded-2xl",
        background: "bg-zinc-800",
        spacing: "px-3",
        effects: "shadow-sm shadow-kbdark/25",
    },
    placement: {
        typo: "font-bold",
    },
    imageWrapper: {
        sizing: "h-36 w-36",
        layout: "object-contain overflow-hidden",
        responsive: {
            sm: {
                sizing: "max-sm:w-28 max-sm:h-28",
            },
        },
    },
    imageFallback: {
        sizing: "h-36 w-36",
        layout: "block",
        border: "rounded-full",
        responsive: {
            sm: {
                sizing: "max-sm:w-28 max-sm:h-28",
            },
        },
    },
};

export default styles;
