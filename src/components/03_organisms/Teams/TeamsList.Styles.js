const styles = {
    list: {
        typo: "text-zinc-200 uppercase font-light",
        spacing: "mx-auto px-8 pt-2",
        sizing: "w-2/3",
        responsive: {
            "2xl": {
                sizing: "max-2xl:w-3/4",
            },
            lg: {
                sizing: "max-lg:w-10/12",
            },
            md: {
                sizing: "max-md:w-full",
                spacing: "max-md:px-1",
            },
            sm: {
                sizing: "max-sm:w-full max-sm:px-4",
            },
        },
    },
};

export default styles;
