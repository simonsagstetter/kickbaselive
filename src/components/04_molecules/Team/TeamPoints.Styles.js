const styles = {
    wrapper: {
        layout: "flex flex-col items-end self-end relative basis-3/12",
        spacing: "ml-auto mb-1",
    },
    scorePoints: {
        typo: "font-medium text-4xl leading-9 text-kborange",
        responsive: { sm: { typo: "max-sm:text-3xl" } },
    },
    earnings: {
        typo: "text-sm text-zinc-400 font-medium leading-3 lowercase",
        responsive: { sm: { typo: "max-sm:text-xs" } },
    },
};

export default styles;
