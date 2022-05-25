import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";

export default function Profile() {
    const { username } = useParams();
    // console.log(username)
    const [ user, setUser ] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        async function checkUserExists() {
            const userFound = await getUserByUsername(username);

            if (userFound.length > 0) {
                setUser(userFound[0]);
            } else {
                history(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
        // console.log('user', user);

    }, [username, history])

    return user ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;

}