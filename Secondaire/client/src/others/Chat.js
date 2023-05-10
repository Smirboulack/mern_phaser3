import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';

const Chat = () => {
    const socket = io.connect('http://localhost:5000');

    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });
    }, []);


    const handleSubmit = event => {
        event.preventDefault();
        if (message.trim() && username.trim()) {
            socket.emit('message', { username, message });
            setMessage('');
        }
    };
    return (
        <div>
            <h1>Chat en temps réel</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <br />
                <textarea
                    placeholder="Entrez votre message"
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                ></textarea>
                <br />
                <button>Envoyer</button>
            </form>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.username}: </strong> {message.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;