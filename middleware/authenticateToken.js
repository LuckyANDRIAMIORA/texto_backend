const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

TOKEN_SECRET = process.env.TOKEN_SECRET;

let authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == undefined) throw new Error('403')

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) throw new Error('403')
            req.user = user
            next();
        })
    } catch (error) {
        next(error)
    }

}

module.exports = {authenticateToken}