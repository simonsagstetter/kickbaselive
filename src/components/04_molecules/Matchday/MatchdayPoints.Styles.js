const styles = {
    container: {
        layout: "flex flex-col ml-auto items-end",
    },
    dayPoints: {
        typo: "font-medium text-4xl leading-9",
        responsive: { sm: { typo: "max-sm:text-2xl" } },
    },
    points: {
        typo: "text-sm text-zinc-400 leading-3",
        responsive: { sm: { typo: "max-sm:text-xxs" } },
    },
    dayPointsLive: {
        typo: "text-zinc-200 font-bold text-4xl leading-9",
        animation: "animate-pulse",
        responsive: { sm: { typo: "max-sm:text-2xl" } },
    },
};

export default styles;
