import React, { useState } from "react";
import axios from "axios";

const ConnForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleConn = (e) => {
    console.log("Appel à handleConn");
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/user/login",
      withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    }).then((res) => {
      if (res.status === 201) {
        setEmailError(res.data.email);
        setPasswordError(res.data.password);
      } else if (res.status === 200) {
        window.location = "/home";
      }
    });
  };

  return (
    <form onSubmit={handleConn}>
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
        Mot de passe
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



      <button type="submit" value="Se connecter">
        Se connecter
      </button>
    </form>
  );
};

export default ConnForm;
