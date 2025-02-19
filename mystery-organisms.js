// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/*
1. Look over the starter code. There are two helper functions: returnRandBase() and mockUpStrand().

    DNA is comprised of four bases (Adenine, Thymine, Cytosine, and Guanine). When returnRandBase() is called, it will randomly select a base and 
    return the base ('A','T','C', or 'G').

    mockUpStrand() is used to generate an array containing 15 bases to represent a single DNA strand with 15 bases.

    You’ll use these helper functions later to create your objects that represent P. aequor.
-----------------

// console.log(mockUpStrand());
-----------------

2. Since you need to create multiple objects, create a factory function pAequorFactory() that has two parameters:

      The first parameter is a number (no two organisms should have the same number).
      The second parameter is an array of 15 DNA bases.

    pAequorFactory() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.

    You’ll also add more methods to this returned object in the later steps.
-----------------

3. Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).

    To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate().

    .mutate() is responsible for randomly selecting a base in the object’s dna property and changing the current base to a different base. 
    Then .mutate() will return the object’s dna.

    For example, if the randomly selected base is the 1st base and it is 'A', the base must be changed to 'T', 'C', or 'G'. But it cannot be 'A' again.
-----------------

4. Your research team wants to be able to compare the DNA sequences of different P. aequor. You’ll have to add a new method (.compareDNA()) to the returned object 
    of the factory function.

    .compareDNA() has one parameter, another pAequor object.

    The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in pAequor‘s .dna and compute how many bases are identical 
    and in the same locations. .compareDNA() does not return anything, but prints a message that states the percentage of DNA the two objects have in 
    common — use the .specimenNum to identify which pAequor objects are being compared.

    For example:
      ex1 = ['A', 'C', 'T', 'G']
      ex2 = ['C', 'A', 'T', 'T']

    ex1 and ex2 only have the 3rd element in common ('T') and therefore, have 25% (1/4) of their DNA in common. The resulting message would read something along the lines 
    of: specimen #1 and specimen #2 have 25% DNA in common. 
-----------------

5. P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.

  In the returned object of pAequorFactory(), add another method .willLikelySurvive().

  .willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false.
-----------------

6. With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment. 
Store these instances in an array for your team to study later. 
*/



function pAequorFactory(number, dnaBases) {
  return {
    specimenNum: number,
    dna: dnaBases,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();

      while (newBase === this.dna[randIndex]) {
        newBase = returnRandBase();
      }

      this.dna[randIndex] = newBase;
    },
    compareDNA(pAequor) {
      const currentDna = this.dna;
      let common = 0;
      for (let i = 0; i < currentDna.length; i++) {
        if (pAequor.dna[i] === currentDna[i]){
          common += 1;
        }
      }
      let relative = (common / currentDna.length * 100).toFixed(2);
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${relative}% in common.`);
    },
    willLikelySurvive() {
      let countCG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          countCG += 1;
        } 
      }
      if ((countCG / this.dna.length * 100) >= 60) {
        return true;
      }
      return false;
    }
  }
}
const specimen1 = pAequorFactory(1, mockUpStrand());
const specimen2 = pAequorFactory(2, mockUpStrand());
specimen1.compareDNA(specimen2);
console.log(specimen1.willLikelySurvive());
console.log(specimen1.dna);


function createArrayOfSurvivors(number) {
  const arrayOfSurvivors = [];
  for (let i = 0; i < (number + 1); i++) {
    let specimen = pAequorFactory(i, mockUpStrand());
    while (specimen.willLikelySurvive() === false) {
      specimen = pAequorFactory(i, mockUpStrand());
    }
    arrayOfSurvivors.push(specimen);
  }
  return arrayOfSurvivors;
}

const survivors = createArrayOfSurvivors(30);
console.log(survivors);