const fs = require('fs');
const { constants } = require('fs/promises');
const input = fs.readFileSync('input.txt','UTF8').toString()


function main () {
    const products = collectProducts(input);

    const sumOfProducts = products.reduce((total,product) => total + product, 0)

    return sumOfProducts;
};



function collectProducts (input) {
    const regex = /mul\(\d{1,3}\,\d{1,3}\)/g;
    const muls = input.match(regex);
    const products = [];

    for (const mul of muls) {
        const a = parseInt(mul.match(/(?<=mul\()\d{1,3}(?=\,)/g));
        const b = parseInt(mul.match(/(?<=\,)\d{1,3}(?=\))/g));

        const product = a * b;
        products.push(product);

    }

    return products;
}


console.time("Execution time")
console.log(main());
console.timeEnd("Execution time")

//171183089