import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    // interroge au sujet des utilisateurs, essaye de saisir les infos du rival
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("Utilisateur non trouvé");
      return;
    }

    const newChannel = await client.channel("messaging", {
      //id des personnes autorisées dans le channel
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch;
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Créer un jeu</h4>
          <input
            placeholder="Pseudo du rival.."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}>Rejoindre/Commencer partie</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
