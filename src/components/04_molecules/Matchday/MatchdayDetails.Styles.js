const styles = {
    container: {
        layout: "flex flex-col items-start justify-center gap-1",
    },
    userName: {
        typo: "text-2xl font-medium leading-6 tracking-wider text-zinc-100",
        responsive: { sm: { typo: "max-sm:text-lg" } },
    },
    liveUserName: {
        typo: "text-2xl font-medium leading-6 tracking-wider text-zinc-100",
        responsive: { sm: { typo: "max-sm:text-xl max-sm:truncate" } },
    },
    detailWrapper: {
        layout: "flex flex-row items-center justify-start gap-2",
    },
    detail: {
        background: "bg-zinc-400/25",
        spacing: "px-2",
        typo: "text-sm font-medium tracking-tight",
        border: "rounded-2xl",
        responsive: { sm: { typo: "max-sm:text-xs" } },
    },
};

export default styles;
