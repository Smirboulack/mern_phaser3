const UserModel = require("../models/user.model");
const { isValidObjectId } = require("mongoose");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).send("ID unknown : " + req.params.id);
    }

    const user = await UserModel.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (err) {
    //console.log("Error retrieving user info: ", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.updateUser = async (req, res) => {
  //console.log("UpdateUser")
  //console.log(req.body)
  if (!isValidObjectId(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          points: req.body.points,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
