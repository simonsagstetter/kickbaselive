const styles = {
    container: {
        layout: "absolute bottom-0",
        sizing: "w-full",
        spacing: "p-8",
        background: "bg-gradient-to-t from-kbdark via-50% via-kbdark to-transparent",
    },
    wrapper: {
        spacing: "mx-auto",
        sizing: "w-1/2",
        responsive: {
            sm: {
                sizing: "max-sm:w-full",
            },
            md: {
                sizing: "max-md:w-4/5",
            },
        },
    },
    heading: {
        typo: "text-zinc-200 text-lg font-extralight text-center",
        spacing: "py-4",
        responsive: {
            sm: {
                typo: "max-sm:text-base",
            },
        },
    },
};

export default styles;
