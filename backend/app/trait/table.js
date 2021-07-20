const pool = require('../../databasePool');

class TraitTable {
  static getTraitId({ traitType, traitValue }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id FROM trait WHERE "traitType" = $1 AND "traitValue" = $2`,
        [traitType, traitValue],
        (error, response) => {
          if (error) return reject(error);
          console.log(response.rows[0]);

          resolve({ traitId: response.rows[0].id });
        }
      );
    });
  }
}

// TraitTable.getTraitId({ traitType: 'type1', traitValue: 'steel' })
//   .then(({ traitId }) => console.log('traitId', traitId))
//   .catch((error) => console.error(error));

module.exports = TraitTable;
