import React, { useState } from "react";

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  //Ecouter un évenement dans "channel"
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div>En attente que l'autre joueur rejoigne..</div>;
  }
  return <div>Vous êtes en jeu !</div>;
}

export default Game;
