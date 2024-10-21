const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const pokemonRouter = require('./controllers/pokemon');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const likesRouter = require('./controllers/likes');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static('dist'))

app.use('/api/pokemon', pokemonRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/likes', likesRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
