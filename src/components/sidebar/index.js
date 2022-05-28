import { useEffect } from "react";
import avatarsUrl from "../../helper/avatarsUrl";
import useUser from "../../hooks/use-users";
import Suggestions from "./suggestion";
import User from "./user";

export default function Sidebar() {
    const { user: { docId, fullName, username, userId, following } } = useUser();
    // console.log('folowing', following);
    return (
        <>
            <div className="p-4 mobiles:hidden">
                <User username={username} fullName={fullName} />
                <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
            </div>
            {!following?.length && <div className="hidden mobiles:flex mobiles:w-screen">
                <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
            </div>}
        </>
    )
}