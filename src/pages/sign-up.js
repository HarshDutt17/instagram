import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes';
import { doesUserNameExists } from "../services/firebase";

// useEffect used to create/ force a change with respect to change in rendering of component
// useNavigate is used to redirect user to another page
export default function SignUp(){
    const history = useNavigate();
    const { firebase } = useContext(FirebaseContext)

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('')
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const isInvalid = password == '' || emailAddress== '';

    const handleSignUp = async (event) => {
        event.preventDefault();


        const usernameExists = await doesUserNameExists(username);
        if(!usernameExists.length){

            try{
                const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress, password)

                // authentication
                    // -> we are sending emailaddress and password and username (displayname)

                // console.log(createdUserResult, createdUserResult.user)
                    
                await createdUserResult.user.updateProfile({
                    displayName: username
                });

                // firebase user collection (create a document)

                await firebase.firestore().collection('users').add({
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                })

                history(ROUTES.DASHBOARD);
                // firebase.auth().onAuthStateChanged(function(user) {
                //     if (user) {
                //       user.updateProfile({
                //           displayName: username
                //       })
                //     } else {
                //       // No user is signed in.
                //     }
                //   });

            } 
            
            catch (error) {
                setEmailAddress('');
                setFullName('');
                setPassword('');
                setError(error.message);
                setUsername('');
             }

        }else {
            setUsername('');
            setError('That username is already taken, please try another.')
        }

        // console.log('error ', error );
    };

    useEffect(() => {
      document.title = 'Sign Up - Instakilogram';
      const userExists = localStorage.getItem('authUser');
      if(userExists){
          history(ROUTES.DASHBOARD);
      };
    }, []);
    
    
    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen mobiles:flex-col">
            <div className="flex w-3/5 mobiles:hidden">
                <img src="/images/iphoneinsta.jpg" alt="iPhone image"/>
            </div>
            <div className="flex flex-col w-2/5 mobiles:w-5/6 mobiles:my-auto">

                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded mobiles:pb-8">

                    <h1 className="flex justify-center w-full mobiles:my-4">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 "/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}


                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            aria-label="Enter your Username"
                            type="text"
                            placeholder="Username"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setUsername(target.value)}
                            value = {username}
                        />
                        <input
                            aria-label="Enter your Full Name"
                            type="text"
                            placeholder="Full Name"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setFullName(target.value)}
                            value = {fullName}
                        />
                        <input
                            aria-label="Enter your Email Address"
                            type="text"
                            placeholder="Email Address"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setEmailAddress(target.value)}
                            value = {emailAddress}
                        />

                        <input
                            aria-label="Enter your Password"
                            type="password"
                            placeholder="Password"
                            className = "text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary mb-2"
                            onChange={ ({target}) => setPassword(target.value)}
                            value = {password}
                        />

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={` 
                            bg-blue-medium  text-white w-full rounded h-8 font-bold mobiles:mt-2
                            ${isInvalid && `opacity-50`}     
                        `}>
                                Sign Up
                        </button>
                    </form>
                </div>

                <div className="flex justify-center item-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
                    <p className="text-sm text-center">Have an Account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

