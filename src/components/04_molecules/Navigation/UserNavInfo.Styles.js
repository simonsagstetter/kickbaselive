const styles = {
    wrapper: {
        layout: "flex flex-row items-center gap-5",
    },
    coverWrapper: {
        border: "rounded-full",
        layout: "overflow-hidden object-fill",
    },
    cover: {
        sizing: "h-9 w-9",
        layout: "object-cover",
    },
    infoWrapper: {
        layout: "flex flex-col items-center justify-around",
        responsive: { sm: { layout: "max-sm:hidden" } },
    },
    userName: {
        typo: "text-zinc-50 uppercase font-normal text-sm tracking-widest",
    },
    leagueName: {
        typo: "text-zinc-50 uppercase font-light text-xs tracking-widest",
    },
    matchday: {
        typo: "text-kborange text-center text-3xl font-light -ml-1",
    },
    pingWrapper: {
        layout: "relative inline-flex align-top",
        sizing: "h-3 w-3",
        spacing: "ml-1",
    },
    pingBackground: {
        layout: "relative inline-flex",
        sizing: "h-3 w-3",
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
