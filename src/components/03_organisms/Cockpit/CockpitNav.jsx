import CockpitNavItem from "./CockpitNavItem";
import styles from "./CockpitNav.Styles";
import { MdStars } from "react-icons/md";
import { TbSoccerField } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { TailwindStyleSheet } from "@/utils/tw";

const _ = new TailwindStyleSheet(styles);

const navItems = [
    {
        label: "Lineup",
        route: "lineup",
        icon: (
            <TbSoccerField
                strokeWidth={1.2}
                className="text-3xl font-extralight object-contain group-hover:animate-pulse-fast max-sm:text-2xl"
            />
        ),
    },
    {
        label: "Managers",
        route: "managers",
        icon: <RiTeamFill className="text-3xl object-contain group-hover:animate-pulse-fast max-sm:text-2xl" />,
    },
    {
        label: "Standings",
        route: "standings",
        icon: <span className="tracking-wider text-2xl group-hover:animate-pulse-fast max-sm:text-xl">0:2</span>,
    },
    {
        label: "Top 25",
        route: "top",
        icon: <MdStars className="object-contain group-hover:animate-pulse-fast text-3xl  max-sm:text-2xl" />,
    },
    {
        label: "Teams",
        route: "teams",
        icon: <FaRankingStar className="text-3xl object-contain group-hover:animate-pulse-fast max-sm:text-2xl" />,
    },
];

function CockpitNav() {
    return (
        <nav className={_.nav}>
            <ul className={_.list}>
                {navItems.map((navItem) => (
                    <CockpitNavItem
                        key={navItem.route}
                        route={navItem.route}
                        label={navItem.label}
                        Icon={navItem.icon}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default CockpitNav;
