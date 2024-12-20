const fs = require('fs');
const input = fs.readFileSync('input2.txt','UTF8').toString();


function main () {
    const rows = parseInput(input);

    return countX_Mas(rows);

}


function parseInput (input) {
    const rows = input.split('\n');
    return rows;

}

//find instances in diagonal (both directions)
function countX_Mas (rows) {
    let total = 0;

    const rowCount = rows.length;
    const colCount = rows[0].length;


    for(let i = 0; i < rowCount-2; i++){
        for(let j = 0; j < colCount-2; j++){
            const range = [
                rows[i][j], // top left corner
                rows[i][j+2], // top right corner
                rows[i+1][j+1], // middle
                rows[i+2][j], //bottom left corner
                rows[i+2][j+2] // bottom right corner
            ]

            if (validX_Mas(range)){
                total++
            }
        }
    }

    return total;

}

 function validX_Mas (range) {

    if (range[2]==='A' && !range.includes('X')){
        const mas = 'MAS';
        const sam = 'SAM';
        const diagA = [range[0], range[2], range[4]].join('')
        const diagB = [range[1], range[2], range[3]].join('')
        const diagAMatch = diagA === mas || diagA === sam;
        const diagBMatch = diagB === mas || diagB === sam;

        return diagAMatch && diagBMatch;

    }
 }


console.time("Execution time")
console.log(main())
// main()
console.timeEnd("Execution time")

//1877
