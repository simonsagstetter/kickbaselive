const styles = {
    wrapper: {
        layout: "flex flex-col gap-2 self-end items-start basis-5/12",
        responsive: {
            sm: {
                sizing: "max-sm:gap-1",
            },
        },
    },
    badge: {
        layout: "flex flex-row items-center justify-center self-start",
        border: "rounded-2xl",
        typo: "text-xs font-medium tracking-tight",
        spacing: "px-3",
    },
    badgeText: {
        typo: "font-bold",
    },
    fullName: {
        typo: "text-2xl font-medium",
        responsive: { sm: { layout: "max-sm:hidden" } },
    },
    shortName: {
        typo: "text-2xl font-medium",
        layout: "hidden",
        responsive: { sm: { layout: "max-sm:block" } },
    },
};

export default styles;
