const styles = {
    list: {
        typo: "text-zinc-200 uppercase font-light",
        spacing: "px-8 mx-auto pt-2",
        sizing: "w-1/2",
        responsive: {
            "2xl": {
                sizing: "max-2xl:w-4/5",
            },
            lg: {
                sizing: "max-lg:w-full",
            },
            md: {
                sizing: "max-md:w-full",
                spacing: "max-md:px-1",
            },
            sm: {
                sizing: "max-sm:w-full",
                spacing: "max-sm:px-3",
            },
        },
    },
    heading: {
        typo: "text-zinc-200 uppercase text-xl text-center italic",
        spacing: "py-4",
    },
};

export default styles;
