export const page = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
    transition: {
        duration: 1.5,
        type: "spring",
    },
};

export const list = {
    layout: true,
    variants: {
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    },
    initial: "hidden",
    animate: "visible",
};

export const listItem = {
    variants: {
        hidden: {
            opacity: 0,
            y: 10,
            transition: { type: "spring", duration: 0.4 },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", duration: 0.4 },
        },
    },
};

export const liveListItem = {
    layout: "position",
    ...listItem,
    transition: { type: "spring", duration: 0.5, delay: 0.75 },
};

export const listItemNegative = {
    variants: {
        hidden: {
            opacity: 0,
            y: -10,
            transition: { type: "spring", duration: 0.4 },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", duration: 0.4 },
        },
    },
};

export const listItemHover = {
    whileHover: {
        scale: 1.02,
        transition: { type: "spring", duration: 0.4 },
    },
};

export const popValue = {
    animate: {
        scale: [1.3, 1.3, 1.3, 1.1, 1],
    },
    transition: { type: "spring", duration: 0.75 },
};

export const fadeInValue = {
    animate: {
        opacity: [0, 1],
    },
    transition: {
        type: "spring",
        duration: 1,
        delay: 0.2,
    },
};

export const touchOrange = {
    animate: {
        color: ["#ff4600", "#e5e7eb"],
    },
};
