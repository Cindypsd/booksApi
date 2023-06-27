const { Router } = require('express');
const listRouter = require('./listRouter');
const booksRouter = require('./booksRouter');
const userRouter = require('./userRouter');

const router = Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

//Authorization: Bearer <token>
const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) throw new Error('Forbidden: Missing Token');

    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const verifyTokenAuth = (req, res, next) => {
  try {
    jwt.verify(req.token, secretKey, (error, authData) => {
      if (error) {
        throw new Error('Forbidden: Wrong token, you cannot access');
      }
      next();
    });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

router.use('/user', userRouter);
router.use('/booklists', verifyToken, verifyTokenAuth, listRouter);
router.use('/books', verifyToken, verifyTokenAuth, booksRouter);

module.exports = router;
