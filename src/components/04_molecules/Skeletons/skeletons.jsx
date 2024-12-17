import { number, string } from "prop-types";

function PlayerListItemSkeleton() {
    return (
        <li className="flex flex-row justify-start items-center gap-7 mb-4 p-4 rounded-2xl animate-pulse max-sm:px-1">
            <div className="relative">
                <div className="absolute -top-1 -right-2 bg-zinc-800 px-2 p-1 font-medium tracking-tight rounded-2xl flex flex-col items-center max-sm:-right-1">
                    <span className="block h-3 w-4 max-sm:h-2 max-sm:-w3"></span>
                </div>

                <div className="overflow-hidden h-16 w-16 max-sm:h-14 max-sm:w-14 rounded-full bg-zinc-800"></div>
            </div>
            <div className="flex flex-col gap-2 self-end max-sm:gap-3">
                <p className="w-16 h-3 max-sm:h-2 bg-zinc-800 rounded-2xl leading-3"></p>
                <p className="w-28 h-6 max-sm:h-5 bg-zinc-800 rounded-2xl leading-6"></p>
                <div className="flex flex-row items-center justify-start gap-1">
                    <span className="h-4 w-4 max-sm:h-3 block bg-zinc-800 rounded-full"></span>
                    <div className="bg-zinc-800 h-4 max-sm:h-3 w-8 rounded-2xl leading-5"></div>
                    <div className="bg-zinc-800 h-4 max-sm:h-3 w-8 rounded-2xl leading-5"></div>
                    <div className="bg-zinc-800 h-4 max-sm:h-3 w-8 rounded-2xl leading-5"></div>
                </div>
            </div>
            <div id="points" className="flex flex-col ml-auto items-end self-end relative gap-1 max-sm:gap-3">
                <span className="h-9 max-sm:h-7 w-16 bg-zinc-800 rounded-2xl leading-9"></span>
                <span className="h-3 max-sm:h-2 bg-zinc-800 w-20 leading-3 mb-1 max-sm:mb-0.5 rounded-2xl max-sm:leading-5"></span>
            </div>
        </li>
    );
}

export function PlayerListSkeleton({ amount = 10 }) {
    const fragments = [];
    for (let index = 0; index <= amount; index++) {
        fragments.push(<PlayerListItemSkeleton key={index} />);
    }

    return (
        <ul className="px-8 mx-auto pt-2 w-1/2 max-2xl:w-4/5 max-lg:w-full max-md:w-full max-md:px-1 max-sm:w-full max-sm:px-4">
            {fragments.map((fragment) => fragment)}
        </ul>
    );
}

PlayerListSkeleton.propTypes = {
    amount: number,
};

export function LineupHeaderSkeleton() {
    return (
        <div className="text-zinc-200 z-50 text-center pt-4 pb-4 sticky self-center w-full border-b-1 border-transparent  animate-pulse">
            <div className="relative w-28 h-28 max-sm:w-20 max-sm:h-20 mx-auto mb-5">
                <div className="absolute top-0 -right-3 px-3 h-7 w-12 rounded-2xl bg-zinc-800 "></div>
                <div className="h-28 w-28  max-sm:w-20 max-sm:h-20 rounded-full bg-zinc-800 border-2 border-transparent"></div>
            </div>
            <h4 className="h-4 w-36 bg-zinc-800 rounded-2xl mx-auto mb-4 max-sm:mb-2"></h4>
            <h1 className="h-16 w-28 bg-zinc-800 rounded-2xl mx-auto max-sm:h-12"></h1>
        </div>
    );
}

export function TopHeaderSkeleton() {
    return (
        <div className="text-zinc-200 z-50 text-center pt-4 pb-4 sticky self-center w-full border-b-1 border-transparent animate-pulse">
            <h4 className="h-4 w-40 bg-zinc-800 rounded-2xl mx-auto mb-4"></h4>
            <h1 className="h-16 w-32 bg-zinc-800 rounded-2xl mx-auto max-sm:h-12"></h1>
        </div>
    );
}

export function HeaderSkeleton({ titleWidth = "w-32", subtitleWidth = "w-40" }) {
    return (
        <div className="text-zinc-200 z-50 text-center pt-4 pb-4 sticky self-center w-full border-b-1 border-transparent  animate-pulse">
            <h4 className={`h-4 ${subtitleWidth} bg-zinc-800 rounded-2xl mx-auto mb-4`}></h4>
            <h1 className={`h-16 ${titleWidth} bg-zinc-800 rounded-2xl mx-auto max-sm:h-12  max-sm:w-32`}></h1>
        </div>
    );
}

HeaderSkeleton.propTypes = {
    titleWidth: string,
    subtitleWidth: string,
};

function ManagerListItemSkeleton() {
    return (
        <li className="flex flex-row justify-start items-center gap-7 mb-4 p-4 rounded-2xl animate-pulse max-sm:min-w-0 max-sm:gap-4">
            <div className="relative">
                <div className="overflow-hidden h-16 w-16 rounded-full bg-zinc-800 max-sm:h-14 max-sm:w-14"></div>
            </div>
            <div className="flex flex-col gap-1 self-end max-sm:gap-2">
                <div className="bg-zinc-800 h-5 w-8 rounded-2xl leading-5 "></div>
                <p className="w-28 h-8 max-sm:h-6 bg-zinc-800 rounded-2xl leading-6"></p>
            </div>
            <div id="points" className="flex flex-col ml-auto items-end self-end relative gap-1 max-sm:gap-3">
                <span className="h-9 w-16 max-sm:h-7 bg-zinc-800 rounded-2xl leading-9 "></span>
                <span className="h-3 max-sm:h-2 bg-zinc-800 w-20 leading-3 mb-1 rounded-2xl max-sm:leading-5 max-sm:mb-0.5"></span>
            </div>
        </li>
    );
}

export function ManagerListSkeleton({ amount = 10 }) {
    const fragments = [];
    for (let index = 0; index <= amount; index++) {
        fragments.push(<ManagerListItemSkeleton key={index} />);
    }

    return (
        <ul className="mx-auto pt-4 px-8 w-1/2 max-2xl:w-2/3 max-lg:w-4/5 max-md:w-10/12 max-sm:w-full max-sm:px-4">
            {fragments.map((fragment) => fragment)}
        </ul>
    );
}

ManagerListSkeleton.propTypes = {
    amount: number,
};

function StandingListItemSkeleton() {
    return <li className="block h-18 w-full bg-zinc-900 rounded-2xl mb-3 max-sm:h-12"></li>;
}

function StandingListSkeleton({ amount }) {
    const fragments = [];
    for (let i = 0; i < amount; i++) {
        fragments.push(<StandingListItemSkeleton key={i} />);
    }
    return (
        <li className="mb-12">
            <h3 className="bg-zinc-900 h-8 w-32 rounded-2xl mb-4 pb-1 mx-auto"></h3>
            <ul className="mx-auto">{fragments.map((fragment) => fragment)}</ul>
        </li>
    );
}

StandingListSkeleton.propTypes = {
    amount: number,
};

export function StandingSkeleton() {
    const fragments = [];
    fragments.push(<StandingListSkeleton key={1} amount={1} />);
    fragments.push(<StandingListSkeleton key={2} amount={5} />);
    fragments.push(<StandingListSkeleton key={3} amount={1} />);
    fragments.push(<StandingListSkeleton key={4} amount={1} />);
    fragments.push(<StandingListSkeleton key={5} amount={1} />);

    return (
        <div className="flex flex-col items-center pt-4 animate-pulse">
            <ul className="px-8 w-2/3 max-2xl:w-4/5 max-lg:w-full max-md:w-full max-sm:w-full max-md:px-4 max-sm:px-4">
                {fragments.map((fragment) => fragment)}
            </ul>
        </div>
    );
}

export function StandingHeaderSkeleton() {
    return (
        <div className="z-50 text-center pt-4 pb-4 sticky self-center w-full border-b-1 border-transparent animate-pulse">
            <div className="relative">
                <div className="flex flex-row items-center justify-center mb-4 max-sm:px-2">
                    <div className="flex flex-row items-center basis-1/6 grow-0 justify-start relativem ax-md:basis-1/4 max-sm:basis-1/3">
                        <div className="h-14 w-14 rounded-full bg-zinc-800 max-sm:h-12 max-sm:w-12" />
                        <div className="h-7 w-10 bg-zinc-800 rounded-2xl ml-4"></div>
                    </div>
                    <div className="basis-1/6 grow-0 justify-center h-8 bg-zinc-800 rounded-2xl max-md:basis-1/4 max-sm:basis-1/3 max-sm:h-7"></div>
                    <div className="flex flex-row items-center basis-1/6 grow-0 justify-end relative max-md:basis-1/4 max-sm:basis-1/3">
                        <div className="h-7 w-10 bg-zinc-800 rounded-2xl mr-4"></div>
                        <div className="h-14 w-14 rounded-full bg-zinc-800 max-sm:h-12 max-sm:w-12" />
                    </div>
                </div>
            </div>
            <h4 className="h-4 w-36 bg-zinc-800 rounded-2xl mx-auto mb-4"></h4>
            <h1 className="h-16 w-40 bg-zinc-800 rounded-2xl mx-auto max-sm:h-12"></h1>
        </div>
    );
}

function MatchdayListItemSkeleton() {
    return <li className="bg-zinc-900 mb-4 py-4 px-8 border-transparent border-2 rounded-2xl h-22"></li>;
}

export function MatchdayListSkeleton({ amount = 3 }) {
    const fragments = [];
    for (let i = 0; i < amount; i++) {
        fragments.push(<MatchdayListItemSkeleton key={i} />);
    }
    return (
        <div className="flex flex-col justify-center items-center mt-8 animate-pulse">
            <h1 className="bg-zinc-900 h-10 w-96 rounded-2xl mb-8"></h1>
            <ul className="w-2/4 max-xl:w-2/3 max-lg:w-5/6 max-md:w-full px-4">
                {fragments.map((fragment) => fragment)}
            </ul>
        </div>
    );
}

MatchdayListSkeleton.propTypes = {
    amount: number,
};

function LeagueListItemSkeleton() {
    return (
        <li className="bg-zinc-900 w-full py-8 px-8 rounded-2xl border-transparent border-2 my-4 relative overflow-hidden h-45"></li>
    );
}

export function LeagueListSkeleton({ amount = 3 }) {
    const fragments = [];
    for (let i = 0; i < amount; i++) {
        fragments.push(<LeagueListItemSkeleton key={i} />);
    }
    return (
        <div className="flex flex-col justify-center items-center mt-8">
            <h1 className="bg-zinc-900 h-10 w-96 rounded-2xl mb-8"></h1>
            <ul className="flex flex-col justify-center items-center pt-2 w-1/3 max-xl:w-1/2 max-md:w-2/3 max-sm:w-full px-4">
                {fragments.map((fragment) => fragment)}
            </ul>
        </div>
    );
}

LeagueListSkeleton.propTypes = {
    amount: number,
};

function TeamsListItemSkeleton() {
    return (
        <li className="flex flex-row justify-start items-center gap-7 mb-4 p-4 rounded-2xl animate-pulse max-sm:gap-4 max-sm:px-1 ">
            <div className="relative basis-1/12">
                <div className="overflow-hidden h-16 w-16 rounded-full bg-zinc-800 max-sm:h-14 max-sm:w-14"></div>
            </div>
            <div id="info" className="flex flex-col gap-2 self-end items-start basis-5/12 max-sm:gap-1">
                <div className="bg-zinc-800 h-5 w-8 rounded-2xl leading-5"></div>
                <p className="w-28 h-7 bg-zinc-800 rounded-2xl leading-6 max-sm:w-16"></p>
            </div>
            <div
                id="stats"
                className="flex flex-row items-center justify-end self-end gap-10 ml-auto mb-1 basis-3/12 max-sm:gap-4 max-sm:justify-start"
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-6 w-6 bg-zinc-800 rounded-2xl"></div>
                    <small className="h-3 w-5 bg-zinc-800 rounded-2xl block mb-1"></small>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-6 w-6 bg-zinc-800 rounded-2xl"></div>
                    <small className="h-3 w-5  bg-zinc-800 rounded-2xl block mb-1"></small>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-6 w-6 bg-zinc-800 rounded-2xl"></div>
                    <small className="h-3 w-5 bg-zinc-800 rounded-2xl block mb-1"></small>
                </div>
            </div>
            <div id="points" className="flex flex-col ml-auto items-end self-end relative mb-1 basis-3/12">
                <span className="h-9 w-16 bg-zinc-800 rounded-2xl mb-1 leading-9 max-sm:h-7 max-sm:w-12"></span>
                <span className="h-3 bg-zinc-800 w-20 leading-3 rounded-2xl max-sm:h-2 max-sm:w-16"></span>
            </div>
        </li>
    );
}

export function TeamsListSkeleton({ amount = 18 }) {
    const fragments = [];
    for (let index = 0; index <= amount; index++) {
        fragments.push(<TeamsListItemSkeleton key={index} />);
    }
    return (
        <ul className="px-8 mx-auto pt-2 w-2/3 max-2xl:w-3/4 max-lg:w-10/12 max-md:w-full max-md:px-1 max-sm:w-full max-sm:px-4">
            {fragments.map((fragment) => fragment)}
        </ul>
    );
}

TeamsListSkeleton.propTypes = {
    amount: number,
};

export function TeamPlayersHeaderSkeleton() {
    return (
        <div className="z-50 text-center pt-4 pb-4 sticky self-center w-full border-b-1 border-transparent animate-pulse">
            <div className="relative w-28 h-28 mx-auto mb-8  max-sm:w-20 max-sm:h-20">
                <div className="absolute top-1 -right-2 px-3 w-11 h-6 rounded-2xl bg-zinc-800 z-10"></div>
                <div className="h-28 w-28 max-sm:w-20 max-sm:h-20 rounded-full bg-zinc-800"></div>
            </div>
            <h4 className="h-4 w-36 bg-zinc-800 rounded-2xl mx-auto mb-4"></h4>
            <h1 className="h-16 w-40 bg-zinc-800 rounded-2xl mx-auto max-sm:h-12"></h1>
        </div>
    );
}
