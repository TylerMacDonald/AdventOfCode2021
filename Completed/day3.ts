import fs from "fs";
let text : string = fs.readFileSync("day3.txt").toString('utf-8');
let input : string[] = text.split("\r\n");

let count : number = 0;
let count2 : number = 0;
let consumption : string = "";
let gamma :string = "";
let filter : string[] = [];
let filter2 : string[] = [];

for(let x : number=0; x<input[0].length; x++){
    count = 0;
    for(let i : number=0; i<input.length; i++){
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

let CO2 : string = "";
let OGR : string = "";
for(let x : number=0; x<input[0].length; x++){
    count = 0;
    count2 = 0;
    //Find and Remove CO2 Matches
    for(let i : number=0; i<filter2.length; i++){
        count2+=Number(filter2[i][x]);
    }
    if(count2>=(filter2.length/2)){
        CO2+="0"
    }else{
        CO2+="1"
    }
    filter2 = filter2.filter(word=>word.startsWith(CO2));

    //Find and Remove Oxygen Matches
    for(let i : number=0; i<filter.length; i++){
        count+=Number(filter[i][x]);
    }
    if(count>=(filter.length/2)){
        OGR+="1"
    }else{
        OGR+="0"
    }
    filter = filter.filter(word=>word.startsWith(OGR));
}

let part1 : number = parseInt(gamma,2)*parseInt(consumption,2);
let part2 : number = parseInt(OGR,2)*parseInt(CO2,2);
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);