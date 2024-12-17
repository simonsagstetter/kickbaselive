const styles = {
    container: { layout: "relative" },
    wrapper: {
        layout: "flex flex-row items-center justify-center",
        spacing: "mb-4",
        responsive: {
            sm: {
                spacing: "max-sm:px-2",
            },
        },
    },
    leftSection: {
        layout: "flex flex-row items-center basis-1/6 grow-0 justify-start relative",
        responsive: {
            sm: {
                layout: "max-sm:basis-1/3",
            },
            md: {
                layout: "max-md:basis-1/4 ",
            },
        },
    },
    score: {
        layout: "basis-1/6 grow-0 text-center justify-center",
        typo: "text-3xl font-bold tracking-widest",
        responsive: {
            sm: {
                layout: "max-sm:basis-1/3",
                typo: "max-sm:text-2xl",
            },
            md: {
                layout: "max-md:basis-1/4",
            },
        },
    },
    rightSection: {
        layout: "flex flex-row items-center basis-1/6 grow-0 justify-end relative",
        responsive: {
            sm: {
                layout: "max-sm:basis-1/3",
            },
            md: {
                layout: "max-md:basis-1/4 ",
            },
        },
    },
    image: {
        sizing: "h-16 w-auto",
        responsive: { sm: { sizing: "max-sm:h-14" } },
    },
    imageFallback: {
        sizing: "h-12 w-12",
        layout: "block",
        border: "rounded-full",
        responsive: {
            sm: {
                sizing: "max-sm:h-14 max-sm:w-14",
            },
        },
    },
    nameLeft: {
        typo: "tracking-wider text-lg",
        spacing: "ml-1",
    },
    nameRight: {
        typo: "tracking-wider text-lg",
        spacing: "mr-1",
    },
    winnerWrapper: {
        layout: "z-10 absolute top-0",
        spacing: "px-2",
        typo: "text-xs font-medium tracking-tight text-kbdark",
        background: "bg-kbgreen",
        border: "rounded-2xl",
        responsive: { sm: { layout: "max-sm:hidden" } },
    },
    winner: {
        typo: "font-bold",
    },
};

export default styles;
