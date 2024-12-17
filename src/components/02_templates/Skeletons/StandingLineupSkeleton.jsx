import { PlayerListSkeleton, StandingHeaderSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

export default function StandingLineupSkeleton() {
    return (
        <>
            <StandingHeaderSkeleton />
            <PlayerListSkeleton />
        </>
    );
}
