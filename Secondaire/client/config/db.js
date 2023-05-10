const mongoose = require("mongoose");
require("dotenv").config({ path: "./client/config/.env" });

async function connect() {
  try {
    await mongoose
      .connect(process.env.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Vous êtes connecté à la base de données");
      });
  } catch (err) {
    console.log("Impossible de se connecter à la base de données", err);
  }
}

module.exports = { connect };
