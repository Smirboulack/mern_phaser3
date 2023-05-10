const express = require('express');
const dotenv = require('dotenv');
const initDatabase = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const messageRoute = require('./routes/messageRoute');

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;
 
initDatabase();

app.use('/api/user', userRoutes);

app.use('/api/message', messageRoute);

const server = app.listen(PORT, console.log(`Serveur pour le site connecté au port http://localhost:${PORT}`));


const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000", 
    }
});

io.on("connection" , (socket) => {
    var userId;

    socket.on('setup', (user) => {
        if(!user) return;
        socket.join(user._id);
        console.log(`User : ${user._id} connected!`);
        socket.emit('connected');
    });

    socket.on('new message', (message) => {
        io.emit("message received", message);
    });
});


console.log("attendez un peu que tous les serveurs express se lancent");
setTimeout(() => {
    console.log("Tous les serveurs express sont lancés");
}, 5000);