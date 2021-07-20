const { REFRESH_RATE, SECONDS } = require('../config');
const Pokemon = require('../pokemon');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
  constructor() {
    this.expiration = this.calculateExpiration();
    this.generationId = undefined;
  }

  calculateExpiration() {
    const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
    console.log('exp period:', expirationPeriod);
    const msUntilExpiration =
      Math.random() < 0.5
        ? refreshRate - expirationPeriod
        : refreshRate + expirationPeriod;

    return new Date(Date.now() + msUntilExpiration);
  }

  newPokemon() {
    if (Date.now() > this.expiration) {
      throw new Error(`This generation expired on ${this.expiration}.`);
    }
    return new Pokemon({ generationId: this.generationId });
  }
}
module.exports = Generation;
