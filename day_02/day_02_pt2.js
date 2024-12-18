const fs = require('fs');
const { constants } = require('fs/promises');
const input = fs.readFileSync('input.txt','UTF8').toString()

function countSafeReports () {
   const reports = sortInput(input);

    let totalSafe = 0;
    let totalUnsafe = 0;
    let unsafeReports = []

    //Check for initial safe reports
    for (const report of reports) {
        if(isSafe(report)) {
            totalSafe++
        }
        else {
            unsafeReports.push(report);
            totalUnsafe ++
        }
    }

    //reevalute with problem dampener criteria
    for (const report of unsafeReports ){
        if (reevalutate(report)){
            totalSafe++
            totalUnsafe--;
        }
    }

   return `Safe: ${totalSafe} - Unsafe: ${totalUnsafe}`

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

        if(isNotAllPosOrNeg) { return false };
        if(diffTooSmall) { return false };
        if(diffTooLarge) { return false }
    }
    return true


}

//reevaluates unsafe reports to see if they are safe when you remove one of the numbers
function reevalutate (report) {
    for (let i = 0 ; i < report.length; i++){
        const testReport = report.filter((level, index ) => index !== i );
        if (isSafe(testReport)) {
            return true;
            break;
        };


    }

    return false;

} 


console.time("Execution time")
console.log(countSafeReports());
console.timeEnd("Execution time")

//569