import { HeaderSkeleton, TeamsListSkeleton } from "@/components/04_molecules/Skeletons/skeletons";

export default function TeamPageSkeleton() {
    return (
        <>
            <HeaderSkeleton titleWidth="w-96" />
            <TeamsListSkeleton />
        </>
    );
}
