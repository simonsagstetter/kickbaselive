const styles = {
    wrapper: {
        layout: "flex flex-row items-center justify-start self-end gap-10 basis-3/12",
        typo: "text-lg font-medium",
        spacing: "ml-auto mb-1",
        responsive: {
            sm: {
                layout: "max-sm:gap-4 max-sm:justify-start",
            },
        },
    },
    statWrapper: {
        layout: "flex flex-col items-center justify-center",
    },
    statUnit: {
        typo: "text-xs text-zinc-400 font-extralight leading-3",
        responsive: {
            sm: {
                typo: "max-sm:leading-4",
                spacing: "max-sm:mt-0.5",
            },
        },
    },
};

export default styles;
