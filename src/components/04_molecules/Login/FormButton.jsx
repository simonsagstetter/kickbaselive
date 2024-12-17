import Spinner from "@/components/05_atoms/Spinner";
import { bool, node } from "prop-types";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./FormButton.Styles";

const _ = new TailwindStyleSheet(styles);

export function FormSubmitButton({ $submitted = false, children, ...props }) {
    return (
        <button type="submit" className={$submitted ? _.process : _.submit} {...props}>
            {$submitted ? (
                <>
                    <Spinner />
                    <span className={_.text}>Processing...</span>
                </>
            ) : (
                <span className={_.text}>{children}</span>
            )}
        </button>
    );
}

FormSubmitButton.propTypes = {
    $submitted: bool,
    children: node.isRequired,
};
