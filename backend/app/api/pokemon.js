const { Router } = require('express');
const PokemonTable = require('../pokemon/table');

const router = new Router();

router.get('/new', (req, res, next) => {
  const pokemon = req.app.locals.engine.generation.newPokemon();

  PokemonTable.storePokemon(pokemon)
    .then(({ pokemonId }) => {
      console.log('pokemonId', pokemonId);

      pokemon.pokemonId = pokemonId;
      res.json({ pokemon });
    })
    .catch((error) => next(error));
});

module.exports = router;
