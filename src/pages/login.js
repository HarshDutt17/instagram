import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
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
            <p> Tailwind CSS check</p>
        </div>
    )
}