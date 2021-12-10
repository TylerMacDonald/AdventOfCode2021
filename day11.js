const fs = require("fs");
let text = fs.readFileSync("day11.txt").toString('utf-8');
let read = text.split("\r\n");
let input = [];
for(let i=0; i<read.length; i++){
    input.push(read[i].split(''));
}

console.log("Part 1: ", );
console.log("Part 2: ", );