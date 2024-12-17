const styles = {
    wrapper: {
        layout: "basis-3/12",
        typo: "text-zinc-400",
        responive: {
            sm: { layout: "max-sm:hidden" },
        },
    },
    time: {
        responsive: { sm: { layout: "max-sm:hidden" } },
    },
    heading: {
        layout: "relative inline-block",
        typo: "tracking-wider text-center uppercase text-kborange",
        responive: { sm: { typo: "max-sm:text-xs" } },
    },
    pingWrapper: {
        layout: "relative inline-flex",
        sizing: "h-3 w-3",
        spacing: "mr-2",
        responive: { sm: { sizing: "max-sm:h-2 max-sm:w-2" } },
    },
    pingBackground: {
        layout: "relative inline-flex",
        sizing: "h-3 w-3",
        border: "rounded-full",
        background: "bg-kborange",
        responive: { sm: { sizing: "max-sm:h-2 max-sm:w-2" } },
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
