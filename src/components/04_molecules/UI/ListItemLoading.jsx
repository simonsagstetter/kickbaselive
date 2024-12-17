import Spinner from "@/components/05_atoms/Spinner";
import { node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    wrapper: {
        layout: "absolute z-50 top-0 left-0 flex flex-row items-center justify-center",
        sizing: "w-full h-full",
        background: "bg-kbdark/15",
        effect: "backdrop-blur-sm",
    },
    text: {
        typo: "uppercase tracking-wider font-medium",
    },
});

function ListItemLoading({ children }) {
    return (
        <div className={_.wrapper}>
            <Spinner color="rgb(255, 70, 0)" />
            <p className={_.text}>Loading {children}</p>
        </div>
    );
}

ListItemLoading.propTypes = {
    children: node,
};

export default ListItemLoading;
