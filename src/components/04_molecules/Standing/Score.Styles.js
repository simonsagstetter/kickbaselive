const styles = {
    wrapper: {
        layout: "flex flex-row basis-2/4 justify-center",
        responsive: { sm: { layout: "max-md:basis-1/5" } },
    },
    score: {
        typo: "text-zinc-200 text-center text-2xl tracking-widest",
    },
    scoreWrapper: {
        layout: "flex",
        responsive: { sm: { typo: "max-sm:text-lg" } },
    },
    scoreNA: {
        typo: "text-zinc-200 text-center text-2xl tracking-widest",
        responsive: { sm: { typo: "max-sm:text-lg" } },
    },
    scorePlaceholder: {
        layout: "block",
        responsive: { sm: { typo: "max-sm:text-base" } },
    },
    matchTime: {
        layout: "block",
        typo: "text-xs font-light tracking-normal",
        responsive: { sm: { typo: "max-sm:text-xxs" } },
    },
    live: {
        layout: "block relative",
        typo: "text-xs font-light tracking-normal text-kborange",
        spacing: "-ml-1",
    },
    pingWrapper: {
        layout: "relative inline-flex",
        sizing: "h-2 w-2",
        spacing: "mr-1",
    },
    pingBackground: {
        layout: "relative inline-flex",
        sizing: "h-2 w-2",
        border: "rounded-full",
        background: "bg-kborange",
    },
    ping: {
        layout: "absolute inline-flex",
        sizing: "h-full w-full",
        border: "rounded-full",
        animation: "animate-ping",
        effects: "opacity-75",
        background: "bg-kborange",
    },
};

export default styles;
