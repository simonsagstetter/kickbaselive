const styles = {
    wrapper: {
        layout: "flex flex-col items-end self-end relative",
        spacing: "ml-auto",
    },
    points: {
        typo: "font-medium text-4xl leading-9",
        responsive: { sm: { typo: "max-sm:text-3xl" } },
    },
    earnings: {
        typo: "text-sm text-zinc-400 font-medium leading-3 lowercase",
        spacing: "mb-1",
        responsive: {
            sm: {
                typo: "max-sm:text-xs",
                spacing: "max-sm:mb-0",
            },
        },
    },
};

export default styles;
