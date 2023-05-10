const express = require("express");
const path = require("path");
const http = require("http");
const PORT = 5005;
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Définir le dossier statique
app.use(express.static(path.join(__dirname, "public")));

// Lancer le serveur
server.listen(PORT, () => console.log(`Le serveur tourne sur le port http://localhost:${PORT}`));

//  Gérer une demande de connexion socket à partir du client web
const connections = [null, null];

io.on("connection", (socket) => {
  // console.log('New WS Connection')

  // Trouver un numéro de joueur
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  // Demande au client connecté, quel numéro il est
  socket.emit("player-number", playerIndex);

  console.log(`Joueur ${playerIndex} est connecté`);

  // Ignorer le joueur 3
  if (playerIndex === -1) return;

  connections[playerIndex] = false;

  // Averti tout le monde du numéro de joueur qui a rejoint
  socket.broadcast.emit("player-connection", playerIndex);

  // Gérer la déconnexion
  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} disconnected`);
    connections[playerIndex] = null;
    //Averti tout le monde du numéro de joueur déconnecté
    socket.broadcast.emit("player-connection", playerIndex);
  });

  // Si il est prêt
  socket.on("player-ready", () => {
    socket.broadcast.emit("enemy-ready", playerIndex);
    connections[playerIndex] = true;
  });

  // Vérifie la connexion des joueurs
  socket.on("check-players", () => {
    const players = [];
    for (const i in connections) {
      connections[i] === null
        ? players.push({ connected: false, ready: false })
        : players.push({ connected: true, ready: connections[i] });
    }
    socket.emit("check-players", players);
  });

  // Si le tir est reçu
  socket.on("fire", (id) => {
    console.log(`Shot fired from ${playerIndex}`, id);

    // Emet le mouvement à l'autre joueur
    socket.broadcast.emit("fire", id);
  });

  // Si réponse de tir
  socket.on("fire-reply", (square) => {
    console.log(square);

    // Envoie la réponse à l'autre joueur
    socket.broadcast.emit("fire-reply", square);
  });

  // Temps de connexion
  setTimeout(() => {
    connections[playerIndex] = null;
    socket.emit("timeout");
    socket.disconnect();
  }, 600000); // Limite de 10 minutes par joueur
});
