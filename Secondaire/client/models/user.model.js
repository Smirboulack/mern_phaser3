const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function (next) {
  const sel = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, sel);
  next();
});

userSchema.statics.login = async function ({ email, password }) {
  const user = await this.findOne({ email });
  //console.log("login user: " + user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw {
      email: "",
      password: "Mot de passe incorrect"
    };
  }
  throw {
    email: "Email incorrect",
    password: ""
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
