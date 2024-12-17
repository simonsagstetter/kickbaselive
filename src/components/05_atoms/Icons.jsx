import { bool } from "prop-types";
import { BiPlusMedical } from "react-icons/bi";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import { IoBandageSharp, IoLogOut } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import { PiAirplaneTakeoffFill, PiTrafficConeFill } from "react-icons/pi";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { TbRectangleVerticalFilled, TbSwitchHorizontal } from "react-icons/tb";
import { VscDash } from "react-icons/vsc";

export function FormationIcon() {
    return (
        <div className="flex flex-col items-center justify-center scale-75 -mr-1 text-zinc-300">
            <div className="flex flex-row items-center justify-center">
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mb-1" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mb-1" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mr-1 -mb-1" />
                <RxDotFilled className="h-2 w-2 -mb-1" />
            </div>
            <div className="flex flex-row items-center justify-center">
                <RxDotFilled className="h-2 w-2" />
            </div>
        </div>
    );
}

export function BenchIcon(props) {
    return (
        <div
            className="flex flex-col text-zinc-300 items-center justify-center"
            style={{ marginTop: "-5px", marginRight: "-2px" }}
        >
            <VscDash
                style={{
                    marginBottom: "-15px",
                    width: "15px",
                    transform: "scaleX(2)",
                    height: "17px",
                }}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="scale-x-75 text-zinc-300"
                {...props}
            >
                <path fill="currentColor" d="M23 13H1v2h2v4h2v-4h14v4h2v-4h2z"></path>
            </svg>
        </div>
    );
}

export function S11Icons() {
    return (
        <>
            <FormationIcon />
            <SubIcon />
        </>
    );
}

export function SubIcon() {
    return <CgArrowsExchangeAltV className="text-zinc-300 font-light" strokeWidth={0.1} />;
}

export function SubIcons() {
    return (
        <>
            <BenchIcon />
            <SubIcon />
        </>
    );
}

export function YellowCardIcon({ forBadge = false }) {
    const cssClasses = `text-yellow-400 scale-x-90 ${forBadge ? "text-sm max-sm:text-xs" : "text-xs"}`;
    return <TbRectangleVerticalFilled className={cssClasses} />;
}

YellowCardIcon.propTypes = {
    forBadge: bool,
};

export function YellowRedCardIcon() {
    return (
        <div className="relative">
            <TbRectangleVerticalFilled className="text-yellow-400 scale-x-90 text-xs absolute -top-2px -right-2px" />
            <TbRectangleVerticalFilled className="text-red-600 scale-x-90 text-xs" />
        </div>
    );
}

export function RedCardIcon({ forBadge = false }) {
    const cssClasses = `text-red-600 scale-x-90 ${forBadge ? "text-sm max-sm:text-xs" : "text-xs"}`;
    return <TbRectangleVerticalFilled className={cssClasses} />;
}

RedCardIcon.propTypes = {
    forBadge: bool,
};

export function MissIcon() {
    return <RxCross2 className="text-xs" strokeWidth={1} />;
}

export function UnknownIcon() {
    return <MdQuestionMark className="text-zinc-200 text-xs max-sm:text-xxs" />;
}

export function FitIcon() {
    return <FaCheck className="text-kbdark text-xs max-sm:text-xxs" />;
}

export function RehabIcon() {
    return <PiTrafficConeFill className="text-kbdark text-sm max-sm:text-xs" />;
}

export function AwayIcon() {
    return <PiAirplaneTakeoffFill className="text-red-600 max-sm:text-sm" />;
}

export function InjuredIcon() {
    return <BiPlusMedical className="text-kbdark text-xs max-sm:text-xxs" />;
}

export function StrickenIcon() {
    return <IoBandageSharp className="text-kbdark text-sm max-sm:text-xs" />;
}

export function SwitchIcon() {
    return <TbSwitchHorizontal className="inline max-sm:h-7 max-sm:py-1 max-sm:w-8 group-hover:animate-pulse-fast" />;
}

export function LogoutIcon() {
    return <IoLogOut className="inline max-sm:h-7 max-sm:py-1 max-sm:w-8 group-hover:animate-pulse-fast" />;
}
