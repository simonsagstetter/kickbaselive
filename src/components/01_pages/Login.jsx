import { json, redirect } from "react-router-dom";
import { authenticate } from "@/api/user";
import { store } from "@/store/store";
import { login, logout } from "@/store/auth-slice";
import { removeLeague } from "@/store/league-slice";
import { removeMatchday } from "@/store/matchday-slice";
import { removeLiveData } from "@/store/live-slice";
import BrandedHeader from "@/components/05_atoms/BrandedHeader";
import LoginForm from "@/components/03_organisms/Login/LoginForm";
import { AnimatePresence, motion } from "framer-motion";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    container: {
        layout: "flex flex-col items-center justify-center",
        sizing: "h-screen",
        responsive: {
            sm: {
                sizing: "max-sm:h-full",
                spacing: "max-sm:pt-16 max-sm:mx-4",
            },
        },
    },
    mask: {
        layout: "items-center",
        background: "bg-zinc-400/5",
        border: "rounded-lg",
        spacing: "p-8",
        sizing: "w-1/3",
        responsive: {
            "2xl": {
                sizing: "max-2xl:w-3/6",
            },
            xl: {
                sizing: "max-xl:w-3/5",
            },
            lg: {
                sizing: "max-lg:w-3/5",
            },
            md: {
                sizing: "max-md:w-4/5",
            },
            sm: {
                sizing: "max-sm:w-full",
            },
        },
    },
    heading: {
        typo: "text-zinc-400 font-extralight text-sm",
    },
});

/**
 * LoginPage component renders the login page with animations.
 * Utilizes Framer Motion for smooth transitions and animations.
 *
 * @returns {JSX.Element} The rendered login page component.
 */
function LoginPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.75 }}
            className={_.container}
        >
            <div className={_.mask}>
                <BrandedHeader />
                <h4 className={_.heading}>
                    Type in your kickbase email and passwort to get started. This information will not be stored in this
                    app but a token which is issued by the kickbase api.
                </h4>
                <AnimatePresence mode="wait">
                    <LoginForm />
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default LoginPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loginAction({ request }) {
    const data = await request.formData();

    const response = await authenticate({
        em: data.get("email"),
        pass: data.get("password"),
    });
    if (!response.ok) {
        if (response.status === 401) {
            return json({ error: "Incorrect email or password" }, { status: 401 });
        }
        return json({ error: "Could not authenticate, please try again later" }, { status: 500 });
    }
    const resData = await response.json();

    await store.dispatch(login(resData));

    return redirect("/leagues");
}

// eslint-disable-next-line react-refresh/only-export-components
export async function logoutAction() {
    await store.dispatch(removeLiveData()).unwrap();
    await store.dispatch(removeMatchday()).unwrap();
    await store.dispatch(removeLeague()).unwrap();
    await store.dispatch(logout()).unwrap();
    return redirect("/auth/login");
}
