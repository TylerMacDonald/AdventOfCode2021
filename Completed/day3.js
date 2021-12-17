const file = require("../utils/import");
let text = file.getInput("day3.txt");
let input = text.split("\r\n");

let count = 0;
let count2 = 0;
let consumption = "";
let gamma = "";
let filter = [];
let filter2 = [];

for(let x=0; x<input[0].length; x++){
    count = 0;
    for(let i=0; i<input.length; i++){
        count+=Number(input[i][x]);
        if(x==0){
            filter.push(input[i]);
            filter2.push(input[i]);
        }
    }
    if(count>=(input.length/2)){
        gamma+="1"
        consumption+="0"
    }else{
        gamma+="0"
        consumption+="1"
    }
    
}

let CO2 = "";
let OGR = "";
for(let x=0; x<input[0].length; x++){
    count = 0;
    count2 = 0;
    //Find and Remove CO2 Matches
    for(let i=0; i<filter2.length; i++){
        count2+=Number(filter2[i][x]);
    }
    if(count2>=(filter2.length/2)){
        CO2+="0"
    }else{
        CO2+="1"
    }
    filter2 = filter2.filter(word=>word.startsWith(CO2));

    //Find and Remove Oxygen Matches
    for(let i=0; i<filter.length; i++){
        count+=Number(filter[i][x]);
    }
    if(count>=(filter.length/2)){
        OGR+="1"
    }else{
        OGR+="0"
    }
    filter = filter.filter(word=>word.startsWith(OGR));
}

let part1 = parseInt(gamma,2)*parseInt(consumption,2);
let part2 = parseInt(OGR,2)*parseInt(CO2,2);
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);