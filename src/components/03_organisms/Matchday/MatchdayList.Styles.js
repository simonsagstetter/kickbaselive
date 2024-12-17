const styles = {
    matchdaysContainer: {
        layout: "flex flex-col justify-center items-center",
        spacing: "mt-8",
    },
    matchdaysHeading: {
        typo: "text-zinc-200 text-4xl font-normal tracking-widest",
        spacing: "mb-8",
        responsive: {
            sm: "max-sm:text-2xl",
        },
    },
    matchdaysList: {
        sizing: "w-2/4",
        spacing: "px-4",
        responsive: {
            md: {
                sizing: "max-md:w-full",
            },
            lg: {
                sizing: "max-lg:w-5/6",
            },
            xl: {
                sizing: "max-xl:w-2/3",
            },
        },
    },
};

export default styles;
