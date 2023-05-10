import React from "react";

const Nav = () => {
  const navHandler = () => {    
   const body = document.querySelector('body');
    body.classList.toggle('open');
  }
      
  return (
    <nav>
      <div className="logo">
        <i className="fas fa-rocket"></i>
      </div>
      <div className="toggle" onClick={navHandler}>
        <i className="fas fa-bars ouvrir"></i>
        <i className="fas fa-times fermer"></i>
      </div>
      <ul className="menu">
        <li><a href="/Home">Accueil</a></li>
        <li><a href="/connexion">Connexion</a></li>
        <li><a href="/inscription">Inscription</a></li>
        <li><a href="/Chat">Chat</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/jeu">Jouer</a></li>
        <li><a href="/profil">Profil</a></li>
      </ul>
    </nav>
  );
}
  
export default Nav;
