import {createContext, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        setUser(currentUser);
        if(!currentUser) navigate('/signUp');
    }, [navigate])

    return (
        <AppContext.Provider value={{user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export const AppState = () => {
    return useContext(AppContext);
};

export default AppProvider;