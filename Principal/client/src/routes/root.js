import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { SiTailwindcss } from 'react-icons/si';
import Footer from './footer'

export default function Root() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
  }, [navigate]);

  return (
    <div className="">
      <header className="p-4 bg-slate-800 text-white flex justify-between navbar">
        <h1>
          <Link to="/">
            <SiTailwindcss />
          </Link>
        </h1>
        {user ? (
          <ul className="flex gap-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-200">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/chat" className="text-gray-400 hover:text-gray-200">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/game" className="text-gray-400 hover:text-gray-200">
                Jouer
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-gray-200">
                A propos
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-400 hover:text-gray-200 flex items-center gap-x-2"
              >
                <img
                  src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${user.username}`}
                  alt=""
                  className="rounded-full"
                  width="16"
                />
                {user.username}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex gap-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-200">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-gray-200">
                A propos
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-gray-400 hover:text-gray-200"
              >
                Connexion . inscription
              </Link>
            </li>
          </ul>
        )}
      </header>

      <div className="container m-auto p-2 ">
        <Outlet context={[user, setUser]} />
      </div>

        <Footer />
    </div>
  );
}