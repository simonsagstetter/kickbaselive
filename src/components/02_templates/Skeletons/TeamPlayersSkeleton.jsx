import { PlayerListSkeleton, TeamPlayersHeaderSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

export default function TeamPlayersSkeleton() {
    return (
        <>
            <TeamPlayersHeaderSkeleton />
            <PlayerListSkeleton />
        </>
    );
}
