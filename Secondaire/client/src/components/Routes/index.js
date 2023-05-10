import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Inscription from "../../pages/Inscription";
import Connexion from "../../pages/Connexion";
import Jeu from "../../pages/Jeu";
import Chat from "../../pages/Chat";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/profil" exact Component={Profil} />
        <Route path="/trending" exact Component={Trending} />
        <Route path="/inscription" exact Component={Inscription} />
        <Route path="/jeu" exact Component={Jeu} />
        <Route path="/chat" exact Component={Chat} />
        <Route path="/connexion" exact Component={Connexion} />
        <Route path="*" Component={Home} />
      </Routes>
    </Router>
  );
};

export default index;
