import { string } from "prop-types";
import { useState } from "react";

export function AwaitImage({ src, alt, className, fallbackClasses }) {
    const [loading, setLoading] = useState(true);

    function handleImageLoad() {
        setLoading(false);
    }

    return (
        <>
            {loading && <div className={`${fallbackClasses} bg-zinc-800 animate-pulse`}></div>}
            <img src={src} alt={alt} onLoad={handleImageLoad} className={loading ? "hidden" : className} />
        </>
    );
}

AwaitImage.propTypes = {
    src: string.isRequired,
    alt: string,
    className: string,
    fallbackClasses: string,
};
