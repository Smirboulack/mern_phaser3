const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
const userRoutes = require("./client/routes/user.routes");
const bodyParser = require("body-parser");
const io = socketIo(server);
const mongoose = require("mongoose");
const publicPath = path.join(__dirname, "client", "public");

const fs = require("fs");
const cors = require("cors");
const { checkUser, requireAuth } = require("./middleware/auth.middleware.js");
const { connect } = require("./client/config/db.js");
require("dotenv").config({ path: "./client/config/.env" });
const PORT = process.env.PORT;

// Connection à la bdd
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// routes
app.use("/api/user", userRoutes);

app.post("/api/user/register", (req, res) => {
  // Récupérer le fichier image
  const imageFile = req.files["profil-image"];

  // Vérifier si le fichier est une image
  if (!imageFile.mimetype.startsWith("image/")) {
    return res.status(400).send("Veuillez sélectionner une image.");
  }

  if (!imageFile) {
    return res.status(200);
  }

  // Générer un nom de fichier unique
  const timestamp = Date.now();
  const fileName = `${timestamp}-${imageFile.name}`;

  // Enregistrer le fichier sur le serveur
  const savePath = `./uploads/${fileName}`;
  imageFile.mv(savePath, (err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send("Une erreur est survenue lors de l'enregistrement de l'image.");
    }
    console.log("Fichier enregistré avec succès : " + savePath);
    return res.status(200).send("L'image a été enregistrée avec succès.");
  });
});

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  //console.log(res.locals.user._id);
  res.status(200).send(res.locals.user._id);
});
/*
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});*/

app.get("/chat", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

// Define score schema and model
const ScoreSchema = new mongoose.Schema({
  player: String,
  score: Number,
});

const Score = mongoose.model("Score", ScoreSchema);

// Socket.io events
io.on("connection", (socket) => {
  //console.log("Client connected");

  socket.on("disconnect", () => {
    //console.log("Client disconnected");
  });

  socket.on("new-game", () => {
    socket.join("morpion");
    io.to("morpion").emit("game-started");
  });

  socket.on("move-made", (data) => {
    socket.broadcast.to("morpion").emit("opponent-move", data);
  });

  socket.on("game-over", (winner) => {
    io.to("morpion").emit("game-ended", winner);

    if (winner !== "Draw") {
      Score.findOneAndUpdate(
        { player: winner },
        { $inc: { score: 1 } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).exec();
    }
  });
});

// Lancement du serveur
server.listen(PORT, () => {
  console.log(`Le serveur est sur écoute au port ${process.env.PORT}`);
});

/**
 * 
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/gestion_erreur')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/options_cors')
const connectDB = require('./config/base_de_donnees')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authentification_routes'))
app.use('/users', require('./routes/utilisateur_routes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,'public' ,'vues', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 non-trouvé' })
    } else {
        res.type('txt').send('404 non-trouvé')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connecté à la base de données')
    app.listen(PORT, () => console.log(`Le serveur est ouvert sur le port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

 */
