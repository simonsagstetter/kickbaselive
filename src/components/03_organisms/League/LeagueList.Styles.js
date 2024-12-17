const styles = {
    leaguesContainer: {
        layout: "flex flex-col justify-center items-center",
        spacing: "mt-8",
    },
    leaguesHeading: {
        typo: "text-zinc-200 text-4xl font-normal tracking-widest",
        spacing: "mb-8",
        responsive: {
            sm: "max-sm:text-2xl",
        },
    },
    leaguesList: {
        layout: "flex flex-col justify-center items-center",
        spacing: "pt-2 px-4",
        sizing: "w-1/3",
        responsive: {
            xl: {
                sizing: "max-xl:w-1/2 ",
            },
            md: {
                sizing: "max-md:w-2/3",
            },
            sm: {
                sizing: "max-sm:w-full  ",
            },
        },
    },
};

export default styles;
