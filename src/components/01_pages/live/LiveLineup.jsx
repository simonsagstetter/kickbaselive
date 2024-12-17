import { useSelector } from "react-redux";
import LiveManagerLineupPage from "./LiveManagerLineup";

function LiveLineup() {
    const { id } = useSelector((state) => state.auth.user);
    return <LiveManagerLineupPage userId={id} />;
}

export default LiveLineup;
