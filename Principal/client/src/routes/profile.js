import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useOutletContext();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) navigate('/signUp')
    }, [navigate])

    const signOut = async (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        navigate('/');
    }

    function handlePasswordChange(event) {
        event.preventDefault();
        // Ajoutez votre logique pour changer le mot de passe ici
        console.log(`Changement de mot de passe : Ancien : ${oldPassword}, Nouveau : ${newPassword}`);
        // Réinitialise les champs de saisie
        setOldPassword("");
        setNewPassword("");
    }

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="profile-container mx-auto max-w-3xl" style={{
            width: '500px',
            height: '600px',
            position: 'absolute',
            top: '15%',
            left: '40%',
            backgroundColor: 'rgb(255, 192, 203)',
            borderRadius: '10px',
            border: '1px solid black',
            padding: "10px",
        }}>
            <h2 className="profile-heading text-2xl font-bold uppercase my-2">
                Mon Profil
            </h2>
            <div className="profile-info bg-gray-100 rounded-md shadow-md p-6">
                <p className="profile-username mb-4">
                    <span className="font-semibold">Nom d'utilisateur:</span>{" "}
                    {user ? user.username : "Non connecté"}
                </p>
                <p className="profile-email mb-4">
                    <span className="font-semibold">Adresse email:</span>{" "}
                    {user ? user.email : ""}
                </p>
                <form onSubmit={handlePasswordChange} className="password-form">
                    <label htmlFor="oldPassword" className="font-semibold block mb-2">
                        Ancien mot de passe :
                    </label>
                    <div className="password-input-group mb-4 flex items-center">
                        <input
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            className="form-input mr-2"
                            required
                        />
                        <button
                            className="password-show-btn text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <label htmlFor="newPassword" className="font-semibold block mb-2">
                        Nouveau mot de passe :
                    </label>
                    <div className="password-input-group mb-4 flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-input mr-2"
                            required
                        />
                        <button
                            className="password-show-btn text-gray-400 hover:text-gray-500"
                            onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword) }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="profile-save-btn bg-blue-500 hover:bg-blue-400 text-white uppercase font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                    >
                        Enregistrer le nouveau mot de passe
                    </button>
                </form>
                <button
                    onClick={signOut}
                    className="profile-logout-btn bg-red-500 hover:bg-red-400 text-white uppercase font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    );
}