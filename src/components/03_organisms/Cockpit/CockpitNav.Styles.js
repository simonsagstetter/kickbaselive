const styles = {
    nav: {
        layout: "z-50",
        sizing: "w-full h-16",
        border: "border-t-1 border-zinc-800",
        background: "bg-kbdark",
    },
    list: {
        layout: "flex flex-row gap-8 items-center justify-center",
        typo: "text-zinc-200 text-xl",
        responsive: {
            sm: {
                layout: "max-sm:gap-2",
            },
        },
    },
};

export default styles;
