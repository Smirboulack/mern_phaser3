const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const setToken = require('../config/setToken');

// Renvoyer tous les utilisateurs
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
  
    res.json(users);
});

// Renvoyer un utilisateur spécifique
const getUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const user = await User.findById(userId);
  
    if (!user) {
      res.status(404);
      throw new Error("Utilisateur non trouvé");
    }
  
    res.json(user);
  });
  


//Creer un utilisateur
const createUser = asyncHandler(async (req, res) => {
        const {username, email, password, repeatpassword} = req.body;

        if(
            !username ||
            !email ||
            !password
        ){
            res.status(400);
            throw new Error("Tous les champs doivent être remplis.");
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: setToken(user._id),
            });
        }else{
            res.status(400);
            throw new Error("Une erreur est survenue.");
        }
});

//Methode pour l'authentification d'un utilisateur
const authUser = asyncHandler(async (req,res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(user && (await user.checkPassword(password))){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: setToken(user._id),
        });
    }

    res.status(400);
    throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
});

// Mettre à jour le mot de passe de l'utilisateur
const updateUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;
  
    const user = await User.findById(userId);
  
    if (user && (await user.checkPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
  
      res.json({
        message: 'Le mot de passe a été mis à jour avec succès.',
      });
    } else {
      res.status(401);
      throw new Error('Mot de passe actuel incorrect.');
    }
  });
  
  // Mettre à jour l'email de l'utilisateur
  const updateUserEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userId = req.user._id;
  
    const user = await User.findById(userId);
  
    if (user) {
      user.email = email;
      await user.save();
  
      res.json({
        message: "L'email a été mis à jour avec succès.",
      });
    } else {
      res.status(404);
      throw new Error('Utilisateur non trouvé.');
    }
  });
  
  // Mettre à jour le pseudo de l'utilisateur
  const updateUsername = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const userId = req.user._id;
  
    const user = await User.findById(userId);
  
    if (user) {
      user.username = username;
      await user.save();
  
      res.json({
        message: "Le pseudo a été mis à jour avec succès.",
      });
    } else {
      res.status(404);
      throw new Error('Utilisateur non trouvé.');
    }
  });
  
  // Supprimer un utilisateur
  const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
  
    if (user) {
      await user.remove();
      res.json({
        message: 'Utilisateur supprimé avec succès.',
      });
    } else {
      res.status(404);
      throw new Error('Utilisateur non trouvé.');
    }
  });
  
  module.exports = {
    getUsers,
    getUser,
    createUser,
    authUser,
    updateUserPassword,
    updateUserEmail,
    updateUsername,
    deleteUser,
  };