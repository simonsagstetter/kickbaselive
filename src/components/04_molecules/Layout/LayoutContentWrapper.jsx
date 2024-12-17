import { node } from "prop-types";
import { forwardRef } from "react";
import { TailwindStyleSheet } from "@/utils/tw";

const { wrapper } = new TailwindStyleSheet({
    wrapper: {
        layout: "absolute overflow-y-auto",
        sizing: "w-full",
    },
});

const LayoutContentWrapper = forwardRef(function LayoutContentWrapper({ children, ...props }, ref) {
    return (
        <div ref={ref} id="improved-scrollbar" style={{ height: "calc(100% - 130px)" }} className={wrapper} {...props}>
            {children}
        </div>
    );
});

LayoutContentWrapper.propTypes = {
    children: node.isRequired,
};

export default LayoutContentWrapper;
