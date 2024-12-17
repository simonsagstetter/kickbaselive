import { string, bool } from "prop-types";
import { IoIosCheckmark } from "react-icons/io";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./FormInput.Styles";

const _ = new TailwindStyleSheet(styles);

export function FormInput({ label, $valid = true, ...props }) {
    return (
        <div className={_.group}>
            <label htmlFor={props.name} className={$valid ? _.label : _.label_invalid}>
                {label}
            </label>
            <input {...props} className={$valid ? _.input : _.input_invalid} />
            <span className={_.checkmarkWrapper}>
                <IoIosCheckmark className={_.checkmark} />
            </span>
        </div>
    );
}

FormInput.propTypes = {
    label: string.isRequired,
    $valid: bool,
    name: string,
};
