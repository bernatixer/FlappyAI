function evolve(population) {
    var offspring = getFittest(population);
    var length = offspring.length;
    for (let i = 0; i < length; ++i) {
        for (let j = i+1; j < length; ++j) {
            console.log(length)
            let nBrain = crossover(offspring[i].brain.toJSON(), offspring[j].brain.toJSON());
            var nb = new Bird(nBrain);
            offspring.push(nb);
        }
    }
    return offspring;
}

function getFittest(population) {
    population.sort(function(a, b) {
        return b.fitness - a.fitness;
    });
    var offspring = [];
    for (let i = 0; i < 4; ++i) {
        var nb = new Bird(population[i].brain.toJSON());
        offspring.push(nb);
    }
    return offspring;
}

function crossover(father, mother) {
    var cutPoint = this.rand(0, father.neurons.length - 1);
    console.log('AAA');
    for (var i = cutPoint; i < father.neurons.length; ++i){
        var fatherBias = father.neurons[i]['bias'];
        father.neurons[i]['bias'] = mother.neurons[i]['bias'];
        mother.neurons[i]['bias'] = fatherBias;
    }
    console.log('BBB')
    return this.rand(0, 1) == 1 ? father : mother;
}

function rand(min, max){
    return Math.floor(Math.random()*(max-min+1) + min);
}