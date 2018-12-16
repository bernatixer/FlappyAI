function Population() {
    this.birds = [];
    this.populationSize = 10;

    for (let i = 0; i < this.populationSize; ++i) {
        this.birds[i] = new Bird();
    }
}

function evolve(population) {
    var fittest = getFittest(population);
    var offspring = fittest;
    // for (let i = 0; i < fittest.length; ++i) {
    //     for (let j = i+1; j < fittest.length; ++j) {
        //         offspring.push(crossover(fittest[i], fittest[j]));
        //     }
        // }
        return offspring;
    }
    
    function getFittest(population) {
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
    let offspring = [];
    for (let i = 0; i < 4; ++i) {
        offspring[i] = new Bird();
    }
    console.log(offspring);
    return offspring;
}

function crossover(father, mother) {
    // 
}
