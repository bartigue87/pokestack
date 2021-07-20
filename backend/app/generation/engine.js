const Generation = require('./index');
const GenerationTable = require('./table');

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }

  start() {
    this.buildNewGeneration();
  }

  stop() {
    clearTimeout(this.timer);
  }

  buildNewGeneration() {
    const generation = new Generation();

    GenerationTable.storeGeneration(generation)
      .then((generationId) => {
        this.generation = generation;
        this.generation.generationId = generationId;

        console.log('new generation', this.generation);
        let num = this.generation.expiration.getTime() - Date.now();

        this.timer = setTimeout(() => this.buildNewGeneration(), num);
      })
      .catch((error) => console.log(error));
  }
}

module.exports = GenerationEngine;
