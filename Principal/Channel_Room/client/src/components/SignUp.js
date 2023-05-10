import React, { useState } from "react";
// Pour créer une API
import Axios from "axios";
// Pour utiliser les cookies
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  // Instancie les cookies
  const cookies = new Cookies();
  // Permet d'initialiser User à null et on utilisera setUser pourll modifier la valeur de User
  const [user, setUser] = useState(null);

  const signUp = () => {
    // Si on trouve les données "user" via cette URL alors..
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      // Recupère les données
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      // Crée un cookie se nommant selon le premier paramètre qui prend la valeur du deuxième paramètre récupéré
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <label>Inscription</label>
      <input
        placeholder="Prénom"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Nom"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Pseudo"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Mot de passe"
        type="password"
        onChange={(event) => {
          //...user veut dire qu'on déplie le variable user c'est à dire qu'on "l'énumère" pour y ajouter une chose
          // Cette fonction garde user en changeant l'élément "firstName" par l'événement entrant
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}>Inscription</button>
    </div>
  );
}

export default SignUp;
