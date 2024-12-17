const styles = {
    wrapper: {
        layout: "sticky top-0 z-50",
        sizing: "w-full",
        background: "bg-kbdark",
        border: "border-b-1 border-zinc-800",
    },
    nav: {
        layout: "flex flex-row items-center justify-between gap-10",
        spacing: "px-10",
        sizing: "h-16",
        responsive: { sm: { spacing: "max-sm:px-4" } },
    },
};

export default styles;
