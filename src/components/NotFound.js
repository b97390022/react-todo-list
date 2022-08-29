
import { Link  } from "react-router-dom";

function NotFound() {
    return (
        <>
            <h2>您的網址出錯囉~</h2>
            <Link to="/">回到首頁</Link>
        </>
    );
}

export default NotFound;