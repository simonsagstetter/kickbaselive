const styles = {
    container: {
        layout: "flex flex-row items-center justify-start gap-10",
        spacing: "mb-8",
    },
    avatar: {
        sizing: "h-12 w-12",
        border: "rounded-2xl",
        layout: "block",
    },
    avatarFallback: {
        sizing: "h-12 w-12",
        border: "rounded-2xl",
        layout: "object-cover",
    },
    info: {
        layout: "flex flex-col items-start justify-center",
    },
    infoHeading: {
        typo: "text-zinc-100 text-2xl uppercase tracking-wider font-medium",
    },
    infoText: {
        typo: "text-xs",
        spacing: "m-0 p-0",
    },
};

export default styles;
