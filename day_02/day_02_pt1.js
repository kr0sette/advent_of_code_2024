const fs = require('fs');
const { constants } = require('fs/promises');
const input = fs.readFileSync('input.txt','UTF8').toString()

function countSafeReports () {
   const reports = sortInput(input);

    let totalSafe = 0;
    let totalUnsafe = 0;

    for (const report of reports) {
        if(isSafe(report)) {
            totalSafe++
        }
        else {
            totalUnsafe ++
        }
    }

   return `Safe: ${totalSafe} /*- Unsafe: ${totalUnsafe}`


}

function sortInput(input){
    const rows = input.split('\n');
    const reports = [];

    rows.forEach((row)=> {
        const reportStrings = row.split(' ');
        const reportInt = reportStrings.map((level) => parseInt(level));
        reports.push(reportInt);

    })
    return reports;
}

// Analyze report to determine if report is safe or unsafe
function isSafe(report) {

    // Report diffs should either be all negative (indicating increase) or all positive (indicating decrease)
    const expectedSign = Math.sign(report[0] - report[1]);
    
    for(let i = 1; i < report.length; i++){
        const diff = report[i-1] - report[i];
        
        const isNotAllPosOrNeg = Math.sign(diff) != expectedSign;
        const diffTooSmall = Math.abs(diff) < 1;
        const diffTooLarge = Math.abs(diff) > 3;

        if(isNotAllPosOrNeg) {return false};
        if(diffTooSmall) { return false};
        if(diffTooLarge) { return false }
    }
    return true


}

console.time("Execution time")
console.log(countSafeReports());
console.timeEnd("Execution time")

//524