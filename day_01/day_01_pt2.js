const fs = require('fs');
const input = fs.readFileSync('input.txt','UTF8').toString()
const left_list = [];
const right_list = [];



function getSimilarityScore () {
    const {left, right} = sortList(input);

    const scoreList = []

    for(i=0; i < left.length; i++){
        //See how many times the left id appears in the right list
        const matches = right.filter((id) => id === left[i])

        //If there are matches
        if(matches.length > 0) {
            //Calculate the similarity score and add it to the score list
            const similarityScore = left[i] * matches.length
            scoreList.push(similarityScore);
        }
    }

    //Add the scores together
    const scoreSum = scoreList.reduce((total,score) => total + score, 0)

    return scoreSum

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




console.log(getSimilarityScore());

//24643097