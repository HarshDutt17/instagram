import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Header() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const history = useNavigate();
    // const firebase =firebasetop.firebase;
    // const user = usertop.user; 
    // console.log(firebase)  ;
    // context provider encapsulate the content therefore we need to decapsulate the content
    // console.log(user);    


    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center cursor-pointer">
                        <h1 className="flex justify-center w-full mobiles:mx-2">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 md:mx-2" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center mobiles:mx-2">
                        {
                            user ? (
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 w-8 mr-6 text-black-light cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                    </Link>

                                    <button
                                        type="button"
                                        title="Sign Out"
                                        onClick={() => firebase.auth().signOut().then(() => { history(ROUTES.LOGIN)})}
                                        onKeyDown={(event) => {
                                            if (event.key == 'Enter') {
                                                firebase.auth().signOut();
                                                history(ROUTES.LOGIN);
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 w-8 mr-6 text-black-light cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center cursor-pointer md:pr-2">
                                        <Link to={`/p/${user.displayName}`}>
                                            <img
                                                className="rounded-full h-8 w-8 flex"
                                                src={`/images/avatars/${user.displayName}.jpg`}
                                                alt={`${user.displayName} profile`}
                                            />
                                        </Link>
                                    </div>

                                </>
                            ) : (
                                <>
                                    <Link to={ROUTES.LOGIN}>
                                        <button type="button" className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">Login</button>
                                    </Link>
                                    <Link to={ROUTES.SIGN_UP}>
                                        <button type="button" className="font-bold text-sm rounded text-blue-medium w-20 h-8">Sign Up</button>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}