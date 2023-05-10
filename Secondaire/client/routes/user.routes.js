const routes = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

routes.post("/register", authController.signUp);
routes.post("/login", authController.SignIn);
routes.get("/logout", authController.logout);

routes.get("/", userController.getAllUsers);
routes.get("/:id", userController.userInfo);
routes.put("/:id", userController.updateUser);

module.exports = routes;
