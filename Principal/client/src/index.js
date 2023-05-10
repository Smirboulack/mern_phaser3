import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './styles/style.css';
import Root from './routes/root';
import ErrorPage from './error-page';
import Home from './routes/home';
import Chat from './routes/chat';
import SignUp from './routes/signup';
import Profile from './routes/profile';
import Game from './routes/game';
import About from './routes/about';

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "chat",
        element: <Chat />
      },
      {
        path: "game",
        element: <Game />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);