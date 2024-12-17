const styles = {
    container: {
        layout: "relative",
        sizing: "w-28 h-28",
        spacing: "mb-5 mx-auto",
        responsive: {
            sm: {
                sizing: "max-sm:w-20 max-sm:h-20",
            },
        },
    },
    placementWrapper: {
        layout: "absolute top-0 -right-3 z-10",
        spacing: "px-3",
        typo: "font-medium tracking-tight text-zinc-200",
        border: "rounded-2xl",
        background: "bg-zinc-800",
        effects: "shadow-sm shadow-kbdark/25",
    },
    placement: {
        typo: "font-bold",
    },
    imageWrapper: {
        sizing: "h-28 w-28",
        layout: "object-contain overflow-hidden",
        border: "rounded-full border-2 border-zinc-800",
        effects: "shadow-sm shadow-kbdark",
        responsive: {
            sm: {
                sizing: "max-sm:w-20 max-sm:h-20",
            },
        },
    },
    image: {
        sizing: "h-full w-full",
        layout: "object-cover",
    },
    imageFallback: {
        sizing: "h-28 w-28",
        layout: "block",
        border: "rounded-full",
        responsive: {
            sm: {
                sizing: "max-sm:w-20 max-sm:h-20",
            },
        },
    },
};

export default styles;
