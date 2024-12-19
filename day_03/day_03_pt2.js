const fs = require('fs');
const input = fs.readFileSync('input.txt','UTF8').toString()


function main () {

    const allInstructions = parseInstructions(input);
    let totalProduct = 0
    let calculate = true; //Keeps track of calculation state

    for(let i = 0; i < allInstructions.length; i++) {
        const instruction = allInstructions[i];
        const mul = instruction.includes('mul');
        const _dont = instruction.includes(`don't`);
        const _do = !mul && !_dont;
  
        if(calculate) {
            if(mul){
                totalProduct += getProduct(instruction);
            }
            else if(_dont) {
                calculate = false;
            }
        }
        else if (_do) {
            calculate = true;
        }

    }

    return totalProduct;
};



function parseInstructions (input) {
    const regex = /(mul\(\d{1,3}\,\d{1,3}\))|(do\(\))|(don\'t\(\))/g;

    return input.match(regex);
}
 


function getProduct (instruction){

    const a = parseInt(instruction.match(/(?<=mul\()\d{1,3}(?=\,)/g));
    const b = parseInt(instruction.match(/(?<=\,)\d{1,3}(?=\))/g));

    return a * b;
}


console.time("Execution time")
console.log(main())
console.timeEnd("Execution time")

//63866497