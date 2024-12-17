import { Form, useNavigation, useActionData } from "react-router-dom";
import { FormInputGroup } from "@/components/04_molecules/Login/FormInputGroup";
import { FormInput } from "@/components/04_molecules/Login/FormInput";
import { FormSubmitButton } from "@/components/04_molecules/Login/FormButton";
import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";
import { TailwindStyleSheet } from "@/utils/tw";
import styles from "./LoginForm.Styles";

const _ = new TailwindStyleSheet(styles);

export default function LoginForm() {
    const data = useActionData();
    const [scope, animate] = useAnimate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const isValid = !data?.error;

    if (!isValid) {
        animate(
            "input, button",
            { x: [-10, 0, 10, 0, -10, 0, 10, 0] },
            { type: "spring", duration: 0.1, delay: stagger(0.05) }
        );
    }

    return (
        <Form ref={scope} method="post">
            <motion.div layout className={_.wrapper}>
                <FormInputGroup>
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        id="email"
                        required
                        autoFocus
                        $valid={isValid}
                        onChange={(e) => (e.target.value = e.target.value.toLowerCase())}
                        disabled={isSubmitting}
                    />
                </FormInputGroup>

                <FormInputGroup>
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        id="password"
                        $valid={isValid}
                        required
                        disabled={isSubmitting}
                    />
                </FormInputGroup>
                <AnimatePresence mode="wait">
                    {data?.error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: [1.2, 1] }}
                            exit={{ scale: [1.2, 0.5], opacity: [1, 0] }}
                            transition={{ type: "spring", duration: 0.2 }}
                            className={_.error}
                        >
                            {data.error}
                        </motion.div>
                    )}
                </AnimatePresence>
                <FormSubmitButton disabled={isSubmitting} $submitted={isSubmitting}>
                    Login Now
                </FormSubmitButton>
            </motion.div>
        </Form>
    );
}
