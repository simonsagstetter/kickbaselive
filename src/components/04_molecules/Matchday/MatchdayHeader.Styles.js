const styles = {
    heading: {
        typo: "text-5xl text-zinc-200 font-semibold",
        sizing: "min-w-16",
        responsive: {
            sm: {
                typo: "max-sm:text-4xl",
                sizing: "max-sm:min-w-10",
            },
        },
    },
    avatarWrapper: {
        layout: "overflow-hidden",
        sizinh: "h-14 w-14 min-w-14",
        border: "rounded-full",
        effect: "shadow-md shadow-zinc-900",
        responsive: {
            sm: {
                layout: "max-sm:hidden",
            },
        },
    },
    avatar: {
        layout: "object-cover",
        sizing: "h-14 w-auto",
    },
    avatarFallback: {
        layout: "block object-cover",
        border: "rounded-full",
        sizing: "h-14 w-14",
    },
};

export default styles;
