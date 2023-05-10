const jwt = require("jsonwebtoken");
const UserModel = require("../client/models/user.model");
maclé = "lacle";

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.CLE, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.CLE, async (err, decodedToken) => {
      if (err) {
        //console.log(err);
        res.send(200).json("RequireAuth1: no token");
      } else {
        //console.log(decodedToken.id);
        next();
      }
    });
  } else {
    //console.log("RequireAuth2: no token");
  }
};
