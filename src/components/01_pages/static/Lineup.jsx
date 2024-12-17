import { useSelector } from "react-redux";
import ManagerLineupPage from "./ManagerLineup";

function LineupPage() {
    const { id } = useSelector((state) => state.auth.user);

    return <ManagerLineupPage userId={id} />;
}

export default LineupPage;
