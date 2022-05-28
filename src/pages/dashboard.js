import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Dashboard() {
    const history = useNavigate();
    const userExists = localStorage.getItem('authUser');

    useEffect(() => {
        document.title = 'Instakilogram';
        // console.log(userExists);
        if (!userExists) {
            history(ROUTES.LOGIN)
        }
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            {userExists ?
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline />
                    <Sidebar />
                </div>
                : 
                <div className="flex justify-center text-2xl text-gray-base">
                    <p className="text-center"><Link to={ROUTES.LOGIN}><span className="text-blue-medium cursor-pointer">Login</span></Link> to your existing account <br />or<br/> <Link to={ROUTES.SIGN_UP}><span className="text-blue-medium cursor-pointer">SignUp</span></Link> to Create a New one to see your Dashboard</p>
                </div>
                }
        </div>
    )
}