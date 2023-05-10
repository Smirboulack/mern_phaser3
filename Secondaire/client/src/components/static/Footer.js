import React from "react";
import { useSelector } from "react-redux";
import { resetUser } from "../../actions/user.action";
import { UidContext } from "../AppContext";
import axios from "axios";

const Footer = () => {
  const LogoutButton = () => {
    return (
      axios({
        method: "GET",
        url: `http://localhost:5000/api/user/logout`,
        withCredentials: true,
      })
        // Si la requête est un succès
        .then((res) => {
          if (res.status === 200) window.location = "/home";
        })
        // Si la requête échoue
        .catch((err) => console.log("Erreur: ", err))
    );
  };

  const uid = React.useContext(UidContext);
  const userData = useSelector((state) => state);
  return (
    <footer className="footer_menu">
      <ul className="menu">
        <li>
          <a
            href="http://cazabetremy.fr/wiki/doku.php?id=projet:presentation#enseignants"
            target="_blank"
            rel="noopener noreferrer"
          >
            Page web de l'UE
          </a>
        </li>
        <li>
          <a
            href="https://bdw1.univ-lyon1.fr/p1707160/BDW1/Developpement/static/plan.php"
            target="_blank"
            rel="noopener noreferrer"
            alt="UCBL"
          >
            Plan du site
          </a>
        </li>
        <li>
          {userData.userReducer.pseudo
            ? `Connecté en tant que ${userData.userReducer.pseudo}`
            : "Visiteur"}
        </li>
        <li>
          {userData.userReducer.pseudo ? (
            <button className="btn_logout" onClick={LogoutButton}>
              Se déconnecter
            </button>
          ) : (
            ""
          )}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
