const express = require('express')
const app = express()
const server = require('http').Server(app)

const PORT = process.env.PORT || 5004
app.use(express.static(`${__dirname}/public`))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))


server.listen(PORT, () => console.log(`le serveur du jeu MineBattle est en écoute http://localhost:${PORT}`))
