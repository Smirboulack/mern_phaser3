const autorisation_cors = require('./autorisation_cors')

const corsOptions = {
    origin: (origin, callback) => {
        if (autorisation_cors.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Non-autorisé par CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 