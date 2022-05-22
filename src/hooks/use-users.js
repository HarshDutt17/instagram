import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";


export default function useUser(){
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);
    // console.log('hook',user.uid);


    useEffect(() => {
        async function getUserObjectByUserId() {
            // we need a function that we call (firebase service ) that gets user data based on uid
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }

        if(user?.uid){
            getUserObjectByUserId();
        }

    }, [user]);

    return { user: activeUser }
}