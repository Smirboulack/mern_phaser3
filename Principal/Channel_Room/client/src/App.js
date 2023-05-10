import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";
import Game from "./components/Game";

function App() {
  // Instancie les cookies
  const cookies = new Cookies();
  // Clé de l'API getstream
  const api_key = "dn34b7smvvt3";
  // Crée une instance API
  const client = StreamChat.getInstance(api_key);
  // Essaye d'obtenir un jeton
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("fistName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    // Connecte l'utilisateur à son compte spécifique
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      // Vérifie que la connexion a bien été faite
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}>Déconnexion</button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
