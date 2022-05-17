import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";

export default function Header() {
    const firebase = useContext(FirebaseContext);
    const user = useContext(UserContext);
    
    return(
        <p> I am Header</p>
    )
}