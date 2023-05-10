import React, { useState } from "react";
// Pour créer une API
import Axios from "axios";
// Pour utiliser les cookies
import Cookies from "universal-cookie";

function Login({ setIsAuth }) {
  // ici nous avons que deux entrées, donc nous créeons un état pour chacune d'entre elles
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const login = () => {
    // Si on trouve les données "user" via cette URL alors..
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      // Recupère les données
      const { firstName, lastName, username, token, userId } = res.data;
      // Crée un cookie se nommant selon le premier paramètre qui prend la valeur du deuxième paramètre récupéré
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="login">
      <label>Connexion</label>

      <input
        placeholder="Pseudo"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}>Connexion</button>
    </div>
  );
}

export default Login;
