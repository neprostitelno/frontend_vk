import React from "react";
import {Navigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";


const MyProfile = () => {
    const [cookies, ,] = useCookies(['currentUser']);
    return <div>
        <Navigate to={`/user/${cookies.currentUser}`}/>
    </div>
}
export default MyProfile;

