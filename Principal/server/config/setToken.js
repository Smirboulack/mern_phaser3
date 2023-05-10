const jwt = require('jsonwebtoken');

const setToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

module.exports = setToken;