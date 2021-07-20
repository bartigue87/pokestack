const pool = require('../../databasePool');
const PokemonTraitTable = require('../pokemonTrait/table');

class PokemonTable {
  static storePokemon(pokemon) {
    const { catchdate, nickname, generationId } = pokemon;
    const int_generationId = pokemon.generationId.generationId;

    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO pokemon(catchdate, nickname, "generationId")
      VALUES($1, $2, $3) RETURNING id`,
        [catchdate, nickname, int_generationId],
        (error, response) => {
          if (error) return reject(error);

          const pokemonId = response.rows[0].id;

          Promise.all(
            pokemon.traits.map(({ traitType, traitValue }) => {
              return PokemonTraitTable.storePokemonTrait({
                pokemonId,
                traitType,
                traitValue,
              });
            })
          )
            .then(() => resolve({ pokemonId }))
            .catch((error) => reject(error));
        }
      );
    });
  }
  static getPokemon({ pokemonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT catchdate, nickname, "generationId"
        FROM pokemon
        WHERE pokemon.id = $1`,
        [pokemonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0)
            return reject(new Error('no pokemon'));

          resolve(response.rows[0]);
        }
      );
    });
  }
}
//debugger code
// PokemonTable.getPokemon({ pokemonId: 1 })
//   .then((pokemon) => console.log(pokemon))
//   .catch((error) => console.error(error));

module.exports = PokemonTable;
