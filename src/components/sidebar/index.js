import useUser from "../../hooks/use-users";
import Suggestions from "./suggestion";
import User from "./user";
import whyDidYouRender from "@welldone-software/why-did-you-render";

export default function Sidebar() {
    const { user: { fullName, username, userId } } = useUser();
    // console.log(fullName, username, userId);
    return (
        <div className="p-4">
            <User  username={username} fullName={fullName} />
            <Suggestions userId={userId} />
            <p> I am Sidebar</p>
        </div>
    )
}