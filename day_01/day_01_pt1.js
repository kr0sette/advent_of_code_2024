const fs = require('fs');
const input = fs.readFileSync('input.txt','UTF8').toString()
const left_list = [];
const right_list = [];



function getSumOfDistances () {
    const {left, right} = sortList(input);

    const distances = []
    for(i=0; i < left.length; i ++){
        //Compare index of each list and get distance
        const difference = left[i] - right[i]
        const distance = difference < 0 ? difference * -1 : difference
        distances.push(distance);
    }

    //Add all distances
    const sum = distances.reduce((acc,distance) => acc + distance, 0)

    return sum

}

function sortList(input){
    //separate left and right lists
    const regex = /\n/g;
    const rows = input.split(regex)
    rows.forEach((row) => {
        const result = (row.split('   '));
        left_list.push(parseInt(result[0]));
        right_list.push(parseInt(result[1]));
    
    })

    //Re order each list - lowest to highest
    left_list.sort();
    right_list.sort()

    return {left: left_list, right: right_list}
}




console.log(getSumOfDistances());

//2769675