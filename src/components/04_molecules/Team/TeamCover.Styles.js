const styles = {
    wrapper: {
        layout: "relative basis-1/12",
    },
    coverWrapper: {
        layout: "overflow-hidden",
        border: "rounded-full",
        sizing: "h-16 w-16",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
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
};

export default styles;
