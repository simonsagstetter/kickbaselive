const styles = {
    wrapper: {
        sizing: "w-2/3",
        spacing: "px-8",
        responsive: {
            "2xl": {
                sizing: "max-2xl:w-4/5",
            },
            lg: {
                sizing: "max-lg:w-full",
            },
            md: {
                sizing: "max-md:w-full",
                spacing: "max-md:px-4",
            },
            sm: {
                sizing: "max-sm:w-full",
                spacing: "max-sm:px-4",
            },
        },
    },
    collection: {
        spacing: "mb-12",
    },
    collectionTitle: {
        typo: "text-zinc-200 text-xl uppercase font-light text-center",
        spacing: "mb-4 pb-1",
    },
    matches: {
        spacing: "mx-auto",
    },
};

export default styles;
