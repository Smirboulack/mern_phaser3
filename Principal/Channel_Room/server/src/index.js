//Ancienne méthodeconst express = require{"express"}; , la nouvelle façon d'inclure se trouve directement dans package.json
//dans package.json nous avons "type":"module" ->  // pour utiliser des modules ESM, si l'on ne met pas cela, il va chercher à utiliser la directiver require

// -----------------------------------------------------------------
// --------------IMPORTATION DE LIBRAIRIE---------------------------
// -----------------------------------------------------------------

// Importe express et cors de leur librairie respective
import express from "express";
import cors from "cors";
// Importe l'API de chat
import { StreamChat } from "stream-chat";
// Importe UUID version 4
import { v4 as uuidv4 } from "uuid";
// Importe la librairie bcrypt pour hasher un mot de passe
import bcrypt from "bcrypt";

// -----------------------------------------------------------------
// --------------CREATION DE L'API----------------------------------
// -----------------------------------------------------------------

// Créer une app express
const app = express();
//Faire fonctionner cors
app.use(cors());
//Accepter les formes de données JSON
app.use(express.json());
// Clé de l'API de chat via getstream.io
// On pourrait les mettre dans un fichier .env
const api_key = "dn34b7smvvt3";
const api_secret =
  "5eeccjwackcfa82s5nbvrung5ya262jkxm5x3wxqbhr4jqjd5mwkaup3uu4t5fq6";
//Crée une instance de l'API
const serverClient = StreamChat.getInstance(api_key, api_secret);

// -----------------------------------------------------------------
// --------------CREATION DES ROUTES--------------------------------
// -----------------------------------------------------------------

// Si il y a une requête POST sur le chemin /signup
app.post("/signup", async (req, res) => {
  try {
    // On récupère les champs
    const { firstName, lastName, username, password } = req.body;
    // Genère un Id aléatoire
    const userId = uuidv4();
    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Jeton identifiant l'utilisateur authentifié
    const token = serverClient.createToken(userId);
    // Renvoie au frontend
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    // Renvoie une erreur
    res.json(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // On teste l'existence, renverra un tableau de tt les utilisateurs correspondant au match
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return req.json({ message: "User not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = bcrypt.compare(password, users[0].hashedPassword);

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

// -----------------------------------------------------------------
// --------------ECOUTE SUR LE PORT---------------------------------
// -----------------------------------------------------------------

//Ecoute sur le port 3400
app.listen(3400, () => {
  console.log("Server is running on port 3400");
});
