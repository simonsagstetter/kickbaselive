import Logo from "../../assets/images/logo_2.svg";

export default function BrandedHeader() {
    return (
        <div className="flex flex-row gap-4 justify-center items-center my-4">
            <img src={Logo} alt="Kickbase Logo" className="w-7 h-auto object-contain inline-block max-sm:w-6 " />
            <h2 className="relative inline-block text-zinc-200 font-light text-4xl tracking-wider text-center uppercase max-sm:text-3xl">
                Kickbase
                <span className="font-bold text-kborange pl-1">Live</span>
                <span className="relative inline-flex h-3 w-3 align-top ml-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kborange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-kborange"></span>
                </span>
            </h2>
        </div>
    );
}
