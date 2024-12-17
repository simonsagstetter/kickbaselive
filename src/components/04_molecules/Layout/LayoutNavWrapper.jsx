import { node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const { wrapper } = new TailwindStyleSheet({
    wrapper: {
        layout: "fixed flex flex-row justify-center bottom-0",
        sizing: "w-full",
    },
});
function LayoutNavWrapper({ children, ...props }) {
    return (
        <div id="smooth-edges-before" className={wrapper} {...props}>
            {children}
        </div>
    );
}

LayoutNavWrapper.propTypes = {
    children: node.isRequired,
};

export default LayoutNavWrapper;
