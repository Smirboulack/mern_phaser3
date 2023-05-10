import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "./components/Routes";
import axios from "axios";
import { getUser } from "./actions/user.action";
import { useEffect } from "react";
import { UidContext } from "./components/AppContext";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        url: `http://localhost:5000/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => {
          //console.log("App: No token");
        });
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
