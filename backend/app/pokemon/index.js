const TRAITS = require('../../data/traits');

const DEFAULT_PROPERTIES = {
  pokemonId: undefined,
  nickname: 'unnamed',
  generationId: undefined,
  get catchdate() {
    return new Date();
  },
  get randomTraits() {
    const traits = [];

    TRAITS.forEach((TRAIT) => {
      const traitType = TRAIT.type;
      const traitValues = TRAIT.values;

      const traitValue =
        traitValues[Math.floor(Math.random() * traitValues.length)];
      traits.push({ traitType, traitValue });
    });
    return traits;
  },
};

class Pokemon {
  constructor({ pokemonId, catchdate, nickname, traits, generationId } = {}) {
    this.pokemonId = catchdate || DEFAULT_PROPERTIES.pokemonId;
    this.catchdate = catchdate || DEFAULT_PROPERTIES.catchdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
  }
}

module.exports = Pokemon;
