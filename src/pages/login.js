import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import FirebaseContext from "../context/firebase";

// useEffect used to create/ force a change with respect to change in rendering of component
// useNavigate is used to redirect user to another page
export default function Login(){
    const history = useNavigate();
    const { firebase } = useContext(FirebaseContext)

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const isInvalid = password == '' || emailAddress== '';

    const handleLogin = () => {};

    useEffect(() => {
      document.title = 'Login - Instagram';
    }, []);
    
    
    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphoneinsta.jpg" alt="iPhone image"/>
            </div>
            <div className="flex flex-col w-2/5">

                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">

                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 "/>
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
                            bg-blue-500 text-white w-full rounded h-8 font-bold 
                            ${isInvalid && `opacity-50`}     
                        `}>
                                Log In
                        </button>
                    </form>
                </div>

                <div className="flex justify-center item-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Don't have an account?{` `}
                        <Link to="/signup" className="font-bold text-blue-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


// TODO : add to tailwind config
// text-blue-medium
// bg-blue-medium
// text-red-primary
// text-sm text-gray-base
// border-gray-primary