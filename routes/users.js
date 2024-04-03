var express = require('express');
var router = express.Router();
const { userQuery } = require('../prisma/query/query');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('../middleware/authenticateToken')

dotenv.config();

TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post('/', async (req, res, next) => {
  const user = req.body
  user.password = await bcrypt.hash(user.password, 10);
  await userQuery.saveUser(user).then(() => {
    res.send(user)
    res.status(200)
    res.end();
  }).catch((err) => {
    next(err)
  })
})

router.post('/singIn', async (req, res, next) => {
  let email = req.body.email
  let password = req.body.password

  await userQuery.singIn(email).then(async (data) => {
    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) throw new Error('403')
    const token = await jwt.sign({ email: data.email, username: data.username }, TOKEN_SECRET, { expiresIn: '720h' })
    res.send({token: token, email: data.email})
    res.status(200)
    res.end();
  }).catch((err) => {
    next(err)
  })
})

router.get('/actif', async (req, res, next) => {
  await userQuery.findUsersActif().then((data) => {
    res.send(data)
    res.status(200)
    res.end();
  }).catch((err) => next(err))
})

module.exports = router;
