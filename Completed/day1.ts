import fs from "fs";
let text : string = fs.readFileSync("day1.txt").toString('utf-8');
let input : string[] = text.split("\r\n");
let numbers : number[] = input.map(x=>Number(x));

let part1Count : number = 0;
let part2Count : number = 0;
for (let i : number=1; i<numbers.length; i++){
    if(numbers[i]>numbers[i-1]){
        part1Count++;
    }
    if(i>=3){
        let sum1 : number = numbers[i-3]+numbers[i-2]+numbers[i-1];
        let sum2 : number = numbers[i-2]+numbers[i-1]+numbers[i];
        if(sum2>sum1){
            part2Count++;
        }
    }
}
console.log("Part 1: ",part1Count);
console.log("Part 2: ",part2Count);