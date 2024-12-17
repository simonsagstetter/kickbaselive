import { HeaderSkeleton, StandingSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

export default function StandingPageSkeleton() {
    return (
        <>
            <HeaderSkeleton titleWidth="w-60" />
            <StandingSkeleton />
        </>
    );
}
