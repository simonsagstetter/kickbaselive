const styles = {
    link: {
        layout: "flex flex-row items-center basis-1/4",
        pseudo: "group",
        hover: {
            interactivity: "hover:cursor-pointer",
        },
        responsive: {
            md: {
                layout: "max-md:basis-2/5",
            },
        },
    },
    cover: {
        sizing: "h-10 w-auto",
        responsive: { sm: { sizing: "max-sm:h-8" } },
    },
    coverFallback: {
        sizing: "h-10 w-10",
        background: "bg-zinc-700",
        border: "rounded-full",
        layout: "block",
        responsive: { sm: { sizing: "max-sm:h-8 max-sm:w-8" } },
    },
    name: {
        typo: "font uppercase",
        spacing: "ml-1",
        hover: {
            typo: "group-hover:text-kborange",
        },
        responsive: { sm: { layout: "max-sm:hidden" } },
    },
    abbreviation: {
        typo: "font uppercase text-base",
        layout: "hidden",
        spacing: "ml-1",
        hover: {
            typo: "group-hover:text-kborange",
        },
        responsive: { sm: { layout: "max-sm:block" } },
    },
};

export default styles;
