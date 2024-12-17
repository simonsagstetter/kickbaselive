const styles = {
    wrapper: {
        layout: "flex flex-col gap-1 self-end",
        responsive: {
            sm: {
                layout: "max-sm:gap-0",
            },
        },
    },
    firstName: {
        typo: "text-xs leading-3",
        responsive: {
            sm: {
                typo: "max-sm:text-xxs",
            },
        },
    },
    lastName: {
        typo: "text-2xl font-medium leading-6 truncate",
        responsive: {
            sm: {
                typo: "max-sm:text-xl",
            },
            custom: {
                typo: "max-[400px]:text-lg",
                sizing: "max-[400px]:max-w-32",
            },
        },
    },
    attributes: {
        layout: "flex flex-row items-center justify-start gap-1",
    },
    cover: {
        sizing: "h-5 w-auto",
        layout: "block",
    },
    coverFallback: {
        sizing: "h-5 w-5",
        border: "rounded-full",
    },
    badgeBase: {
        border: "rounded-2xl",
        background: "bg-zinc-800",
        spacing: "px-2",
        typo: "text-xs font-medium tracking-tight leading-5",
    },
    badge: {
        border: "rounded-2xl",
        background: "bg-zinc-800",
        spacing: "px-2",
        typo: "text-xs font-medium tracking-tight leading-5",
        responsive: {
            sm: {
                layout: "max-sm:hidden",
            },
        },
    },
    matchTimeWrapper: {
        layout: "hidden",
        spacing: "ml-1",
        responsive: { sm: { layout: "max-sm:block" } },
    },
    matchTime: {
        typo: "text-xs",
    },
};

export default styles;
