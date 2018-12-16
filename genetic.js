function Population() {
    this.birds = [];
    this.populationSize = 10;

    for (let i = 0; i < this.populationSize; ++i) {
        this.birds[i] = new Bird();
    }
}