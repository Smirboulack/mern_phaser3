const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const exp = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.CLE, {
    expiresIn: exp,
  });
};

module.exports.signUp = async (req, res) => {
  //console.log("Appel à Signup");
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(200).json({ user: user._id }); //en cas de succès, on renvoie l'id de l'utilisateur créé
  } catch (err) {
    res.status(201).send(err); //en cas d'erreur, on renvoie l'erreur
  }
};

module.exports.SignIn = async (req, res) => {
  //console.log("Appel à SignIn");
  const { email, password } = req.body; //on récupère les données de la requête
  try {
    const user = await UserModel.login({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: exp * 1000 });
    res.status(200).json({ user: user._id }); //en cas de succès, on renvoie l'id de l'utilisateur crée
  } catch (err) {
    res.status(201).json(err); //renvoie les erreurs sous forme de JSON
    //console.log(err);
  }
};

module.exports.logout = (req, res) => {
  console.log("Appel à logout");
  res.cookie("jwt", "", { maxAge: 1 });
  console.log(res.cookie);
  return res.status(200).json({ message: "Déconnexion réussie" });
};
