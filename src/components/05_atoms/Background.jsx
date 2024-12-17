import { createPortal } from "react-dom";

export default function Background({ ...props }) {
    return createPortal(
        <img className="fixed top-0 -z-20 h-screen w-screen object-cover blur-sm opacity-10" {...props} />,
        document.getElementById("background")
    );
}
