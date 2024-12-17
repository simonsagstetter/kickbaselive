import { node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./FormInputGroup.Styles";

const _ = new TailwindStyleSheet(styles);
export function FormInputGroup({ children, ...props }) {
    return (
        <div className={_.group} {...props}>
            {children}
        </div>
    );
}

FormInputGroup.propTypes = {
    children: node.isRequired,
};
