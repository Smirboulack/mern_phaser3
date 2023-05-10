import { useState, useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {CgSpinner} from 'react-icons/cg';

export default function SignUp(){
    const [isLoading, setIsLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if(currentUser) navigate('/')
    }, [navigate])

    const createUser = async() => {
        setIsLoading(true);
        setError("");

        if(!username || !email || !password || !repeatPassword){
            setError("Tous les champs doivent être remplis.");
            setIsLoading(false);
            return;
        }

        if(password !== repeatPassword){
            setError("Les mots de passes doivent être identiques.");
            setIsLoading(false);
            return;
        }

        let minLength = 4;

        if(username.length < minLength){
            setError("Le nom d'utilisateur est trop court.");
            setIsLoading(false);
            return;
        }

        if(password.length < minLength){
            setError("Le mot de passe est trop court.");
            setIsLoading(false);
            return;
        }

        try{
            let params = {
                header: {
                    "Content-type": "application/json"
                }
            }

            let {data} = await axios.post('/api/user', {username, email, password}, params);

            localStorage.setItem('currentUser', JSON.stringify(data));
            setIsLoading(false);
            navigate('/');
        } catch(e){
            setError("Un problème est survenu.");
            console.log(e);
            setIsLoading(false);
        }
    }

    const authUser = async() => {
        setIsLoading(true);
        setError("");

        if(!username || !password){
            setError("Tous les champs doivent être remplis.");
            setIsLoading(false);
            return;
        }

        try{
            let params = {
                header: {
                    "Content-type": "application/json"
                }
            }

            let {data} = await axios.post('/api/user/signUp', {username, password}, params);

            localStorage.setItem('currentUser', JSON.stringify(data));
            setIsLoading(false);
            navigate('/');
        } catch(e){
            setError("Nom d'utilisateur ou mot de passe introuvable.");
            setIsLoading(false);
        }
    }

    const submitForm = async(e) => {
        e.preventDefault();
        if(isSignIn) createUser();
        else authUser();
    }

    return(
        
        <div className="container m-auto xl:max-w-xl"
        style={{
            width: '500px',
            height: isSignIn ? '550px' : '400px',
            position: 'absolute',
            top: '15%',
            left: '40%',
            backgroundColor: 'rgb(255, 192, 203)',
            borderRadius: '10px',
            border: '1px solid black',
            padding: "10px",
        }} 
        >
            {error && 
                <p className="text-red-500 my-2">
                    {error}
                </p>
            }
            <h2 className="text-2xl font-bold uppercase my-2">{isSignIn ? "S'inscrire" : "Se Connecter"}</h2>
            <form onSubmit={submitForm} onKeyDown={(e) => {if(e.key === "Enter") submitForm(e);}} className="p-4 rounded-md shadow-md">
                <div className="mb-2">
                    <label htmlFor="username">Nom d'utilisateur :</label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        className="p-2 border border-gray-300 rounded-md w-full"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </div>
                
                {
                    isSignIn && 
                    <div className="mb-2">
                        <label htmlFor="email">Adresse mail :</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            className="p-2 border border-gray-300 rounded-md w-full"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                }

                <div className="mb-2">
                    <label htmlFor="password">Mot de passe :</label>
                    <div className="relative w-full">
                        <input 
                            id="password"
                            className="p-2 border border-gray-300 rounded-md w-full pr-8"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            type={showPassword ? "text" : "password"} 
                        />
                        <button 
                            className="absolute top-1/2 right-2  -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            onClick={(e) => {e.preventDefault(); setShowPassword(!showPassword)}}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye/>}
                        </button>
                    </div>
                </div>
                
                {
                    isSignIn &&
                    <div className="mb-2">
                        <label htmlFor="repeatpassword">Répeter le mot de passe :</label>
                        <div className="relative w-full">
                            <input 
                                id="repeatpassword"
                                name="repeatpassword"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                value={repeatPassword}
                                onChange={(e) => {setRepeatPassword(e.target.value)}}
                                type={showRepeatPassword ? "text" : "password"} 
                            />
                            <button 
                            className="absolute top-1/2 right-2  -translate-y-1/2 text-gray-400 hover:text-gray-500"
                            onClick={(e) => {e.preventDefault(); setShowRepeatPassword(!showRepeatPassword)}}
                        >
                            {showRepeatPassword ? <FaEyeSlash /> : <FaEye/>}
                        </button>
                        </div>
                    </div>
                }

                <div className="flex flex-col gap-y-2">
                    <button 
                        className={`p-2 ${isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-400"} rounded-md text-white shadow-sm flex items-center justify-center gap-x-2`}
                        disabled={isLoading ? "disabled" : ""}
                        type="submit"
                    >
                        {isLoading && <CgSpinner className="animate-spin" />}
                        Envoyer
                    </button>

                    {
                        isSignIn ?
                        <button
                            onClick={(e) => {e.preventDefault(); setIsSignIn(false)}} 
                            className="p-2 text-blue-500 hover:text-blue-400"
                            disabled={isLoading ? "disabled" : ""} 
                        >Vous avez déjà un compte ?</button>
                        :
                        <button
                            onClick={(e) => {e.preventDefault(); setIsSignIn(true)}}
                            className="p-2 text-blue-500 hover:text-blue-400"
                            disabled={isLoading ? "disabled" : ""} 
                        >Vous n'avez pas encore de compte ?</button>
                    }
                </div>

            </form>
        </div>
    )
}