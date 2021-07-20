const pool = require('../../databasePool');
const TraitTable = require('../trait/table');

class PokemonTraitTable {
  static storePokemonTrait({ pokemonId, traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      TraitTable.getTraitId({ traitType, traitValue }).then(({ traitId }) => {
        pool.query(
          `INSERT INTO pokemonTrait("traitId", "pokemonId") VALUES($1, $2)`,
          [traitId, pokemonId],
          (error, response) => {
            if (error) return reject(error);

            resolve();
          }
        );
      });
    });
  }
}

module.exports = PokemonTraitTable;
