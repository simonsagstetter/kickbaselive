import { Link, useLocation, useRouteError } from "react-router-dom";
import UserNav from "@/components/03_organisms/Navigation/UserNav";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet({
    page: {
        layout: "h-screen",
    },
    container: {
        layout: "flex flex-row items-center justify-center gap-10",
        sizing: "h-4/5",
        responsive: {
            sm: {
                layout: "max-sm:gap-0",
                spacing: "max-sm:mx-4",
            },
        },
    },
    statusText: {
        typo: "text-kborange font-medium text-7xl",
        responsive: {
            sm: {
                typo: "max-sm:text-5xl",
                spacing: "max-sm:pr-4",
            },
        },
    },
    wrapper: {
        border: "border-l-2 border-zinc-50",
        spacing: "pl-10",
        responsive: {
            sm: {
                spacing: "max-sm:pl-4",
            },
        },
    },
    title: {
        typo: "text-zinc-50 text-center text-4xl font-medium",
        responsive: {
            sm: {
                typo: "max-sm:text-2xl",
            },
        },
    },
    message: {
        typo: "text-zinc-50 text-center text-lg font-light",
        responsive: {
            sm: {
                typo: "max-sm:text-sm",
            },
        },
    },
    link: {
        layout: "block",
        typo: "text-kborange text-center text-lg font-light",
        animation: "animate-pulse",
        responsive: {
            sm: {
                typo: "max-sm:text-sm",
            },
        },
    },
});

/**
 * ErrorPage component is responsible for displaying an error message to the user
 * when an error occurs during routing. It attempts to parse the error and display
 * relevant information such as status, title, and message.
 *
 * @returns {JSX.Element} A portal rendering the error page UI.
 */
function ErrorPage() {
    const error = useRouteError();
    const location = useLocation();
    const [errorData, setErrorData] = useState();
    let title = "Ooopsi! Something went wrong!";
    let message = "Please try to refresh the page or try again in a few moments.";
    let status = 500;

    useEffect(() => {
        async function parseError() {
            if (error instanceof Response) {
                const data = await error.clone().json();
                setErrorData(data);
            }
        }
        parseError();
    }, [error]);

    if (errorData) {
        title = errorData.title || title;
        message = errorData.message || message;
    }

    if (error) {
        status = error.status || status;
    }

    return createPortal(
        <div className={_.page}>
            <UserNav />
            <div className={_.container}>
                <span className={_.statusText}>{status}</span>
                <div className={_.wrapper}>
                    <h1 className={_.title}>{title}</h1>
                    <p className={_.message}>{message}</p>
                    <Link to={location.pathname || "/leagues"} replace reloadDocument className={_.link}>
                        Click here to refresh the page
                    </Link>
                </div>
            </div>
        </div>,
        document.getElementById("errors")
    );
}

export default ErrorPage;
