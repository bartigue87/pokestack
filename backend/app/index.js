const express = require('express');
const GenerationEngine = require('./generation/engine');
const pokemonRouter = require('./api/pokemon');
const generationRouter = require('./api/generation');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/pokemon', pokemonRouter);
app.use('/generation', generationRouter);

app.use((err, req, res, next) => {
  const stausCode = err.statusCode || 500;
  res.status(stausCode).json({
    type: 'error',
    message: err.message,
  });
});
engine.start();

module.exports = app;
