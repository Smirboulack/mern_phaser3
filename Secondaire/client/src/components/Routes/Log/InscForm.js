import React, { useState } from "react";
import axios from "axios";

const InscForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pseudoError, setPseudoError] = useState("");

  const handleInsc = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/user/register",
      withCredentials: true,
      data: {
        pseudo: pseudo,
        email: email,
        password: password,
      },
    }).then((res) => {
      if (res.status === 201) {
        if (res.data.errors) {
          if (res.data.errors.pseudo) {
            setPseudoError("Le pseudo doit contenir au minimum 3 caractères");
          } else setPseudoError("");
          if (res.data.errors.email) {
            setEmailError("L'adresse mail ne convient pas");
          } else setEmailError("");
          if (res.data.errors.password) {
            setPasswordError(
              "Le mot de passe doit contenir au moins 6 caractères"
            );
          } else setPasswordError("");
        }
      } else if (res.status === 200) {
        window.location = "/connexion";
      }
    });
  };

  return (
    <form onSubmit={handleInsc} className="form_insc">
      <label htmlFor="pseudo" style={{ marginBottom: "5px" }}>
        Pseudo
      </label>
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={(e) => setPseudo(e.target.value)}
        placeholder="Entrez le pseudo souhaité"
        required
      />
      <br />
      {pseudoError}
      <br />

      <label htmlFor="email" style={{ marginBottom: "5px" }}>
        Email
      </label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez l'adresse mail souhaité"
        required
      />
      <br />
      {emailError}
      <br />

      <label htmlFor="password" style={{ marginBottom: "5px" }}>
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Entrez le mot de passe souhaité"
        required
      />
      <br />
      {passwordError}
      <br />

      <input
        type="file"
        id="profil-image"
        name="profil-image"
        accept="image/png, imgae/jpg, image/jpeg "
      />

      <button type="submit" value="S'inscrire">
        S'inscrire
      </button>
    </form>
  );
};

export default InscForm;
