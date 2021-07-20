const pool = require('../../databasePool');
const PokemonTable = require('./table');
const Pokemon = require('./index');

const getPokemonWithTraits = ({ pokemonId }) => {
  return Promise.all([
    PokemonTable.getPokemon({ pokemonId }),
    new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT "traitType", "traitValue"
        FROM trait
        INNER JOIN pokemonTrait ON trait.id = pokemonTrait."traitId"
        WHERE pokemonTrait."pokemonId" = $1`,
        [pokemonId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        }
      );
    }),
  ])
    .then(([pokemon, pokemonTraits]) => {
      return new Pokemon({
        ...pokemon,
        pokemonId,
        traits: pokemonTraits,
      });
    })
    .catch((error) => console.error(error));
};
//debugger
// getPokemonWithTraits({ pokemonId: 1 })
//   .then((pokemon) => console.log('pokemon', pokemon))
//   .catch((error) => console.error('error', error));

module.exports = { getPokemonWithTraits };
