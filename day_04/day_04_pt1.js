const fs = require('fs');
const input = fs.readFileSync('input.txt','UTF8').toString();


const xmasFwd = 'XMAS'
const xmasBack = 'SAMX'


function main () {
    const rows = parseInput(input);
    let totalXmas = 0

    totalXmas += horizontal(rows);
    totalXmas += vertical(rows);
    totalXmas += diagonal(rows, true); //Diagonal top to bottom
    totalXmas += diagonal(rows, false);//Diagonal bottom to top;

    return totalXmas;

}


function parseInput (input) {
    const rows = input.split('\n');
    return rows;

}


//find instances in horizontal
function horizontal (rows) {
    let totalHoriz = 0
    rows.forEach((row)=> {
        totalHoriz += row.split(xmasFwd).length-1 + row.split(xmasBack).length-1;
    })

    return totalHoriz;
}

//find instances in vertical
function vertical (rows) {
    let totalVertical = 0;
    for(let i=0; i < rows.length-3; i++){
        for(let j=0; j < rows[i].length; j++){
            const range = [
                rows[i][j],
                rows[i+1][j],
                rows[i+2][j],
                rows[i+3][j]
            ].join('');

            if(range === xmasFwd || range === xmasBack){
                totalVertical++;

            }
        }
        
    }

    return totalVertical
    // console.log(totalVertical);


}

//find instances in diagonal (both directions)
function diagonal (rows, isTopToBottom) {
    let totalDiag = 0

    const rowCount = rows.length;
    const colCount = rows[0].length;

    for(let i = 0; i < rowCount - 3; i++){
        for(let j = 0; j < colCount - 3; j++){
            let range;
            if (isTopToBottom) {
                range = [
                    rows[i][j],
                    rows[i+1][j+1],
                    rows[i+2][j+2],
                    rows[i+3][j+3]
                ].join('');
            }
            else {
                range = [
                    rows[i][j+3],
                    rows[i+1][j+2],
                    rows[i+2][j+1],
                    rows[i+3][j]
                ].join('')
            }

            if ( range === xmasFwd || range === xmasBack){
                totalDiag++;
            }
        }

    }

    return totalDiag;

}

console.time("Execution time")
console.log(main());
console.timeEnd("Execution time")

//2462
