const styles = {
    item: {
        layout: "flex flex-row justify-start items-center gap-7",
        spacing: "mb-4 p-4",
        border: "rounded-2xl",
        pseudo: {
            hover: {
                background: "hover:bg-zinc-900",
                interactivity: "hover:cursor-pointer",
                effects: "hover:shadow-sm hover:shadow-zinc-950",
            },
        },
        responsive: {
            sm: {
                layout: "max-sm:gap-4",
                spacing: "max-sm:px-2",
            },
        },
    },
};

export default styles;
