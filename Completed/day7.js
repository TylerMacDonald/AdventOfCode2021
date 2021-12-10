const file = require("../import");
let text = file.getInput("day7.txt");
//text = "16,1,2,0,4,2,7,1,2,14"//sample
let input = text.split(",").map(x=>Number(x));

let result = -1;
let lowest = 999999;
let min = Math.min(...input);
let max = Math.max(...input);
console.log(min, max);
for(let x=min; x<=max; x++){
    let sum = 0;
    for(let i=0; i<input.length; i++){
        sum += Math.abs(x-input[i]);
    }

    if(sum<lowest){
        lowest=sum;
        result=x;
    }
}
console.log("Part 1: ", lowest);

let lookup = {}
let fuel = 0;
for(let x=min; x<max; x++){
    fuel+=x;
    lookup[x]=fuel;
}

lowest = 999999999999;
for(let x=min; x<=max; x++){
    let sum = 0;
    for(let i=0; i<input.length; i++){
        sum += lookup[Math.abs(x-input[i])];
    }
    if(sum<lowest){
        lowest=sum;
        result=x;
    }
}

console.log("Part 2: ", lowest);