import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes';

// useEffect used to create/ force a change with respect to change in rendering of component
// useNavigate is used to redirect user to another page
export default function Login(){
    const history = useNavigate();
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const isInvalid = password == '' || emailAddress== '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
            history(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
      document.title = 'Login - Instakilogram';
      const userExists = localStorage.getItem('authUser');
      if(userExists){
          history(ROUTES.DASHBOARD)
      }
    }, []);
    
    
    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen mobiles:flex-col">
            <div className="flex w-3/5 mobiles:hidden">
                <img src="/images/iphoneinsta.jpg" alt="iPhone image"/>
            </div>
            <div className="flex flex-col w-2/5 mobiles:w-5/6 mobiles:my-auto">

                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded mobiles:pb-8">

                    <h1 className="flex justify-center w-full mobiles:my-4">
                        <img fetchpriority="high" src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 "/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}


                    <form onSubmit={handleLogin} method="POST">
                        <input
                            aria-label="Enter your Email Address"
                            type="text"
                            placeholder="Email Address"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setEmailAddress(target.value)}
                        />

                        <input
                            aria-label="Enter your Password"
                            type="password"
                            placeholder="Password"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setPassword(target.value)}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={` 
                            bg-blue-medium  text-white w-full rounded h-8 font-bold mobiles:mt-2
                            ${isInvalid && `opacity-50`}     
                        `}>
                                Log In
                        </button>
                    </form>
                </div>

                <div className="flex justify-center item-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm">Don't have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

