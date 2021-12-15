const file = require("./import");
let text = file.getInput("sample.txt");
//let text = file.getInput("input.txt");
let read = text.split("\r\n");
let input = [];
for(let i=0; i<read.length; i++){
    input.push(read[i].split('').map(x=>Number(x)));
}

console.log("Part 1: ", );
console.log("Part 2: ", );