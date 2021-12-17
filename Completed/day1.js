const file = require("../utils/import");
let text = file.getInput("day1.txt");
let input = text.split("\r\n");
let numbers = input.map(x=>Number(x));

let part1Count = 0;
let part2Count = 0;
for (let i=1; i<numbers.length; i++){
    if(numbers[i]>numbers[i-1]){
        part1Count++;
    }
    if(i>=3){
        let sum1 = numbers[i-3]+numbers[i-2]+numbers[i-1];
        let sum2 = numbers[i-2]+numbers[i-1]+numbers[i];
        if(sum2>sum1){
            part2Count++;
        }
    }
}
console.log("Part 1: ",part1Count);
console.log("Part 2: ",part2Count);