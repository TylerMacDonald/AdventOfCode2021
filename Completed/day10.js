const fs = require("fs");
let text = fs.readFileSync("day10.txt").toString('utf-8');
let read = text.split("\r\n");
let input = [];
const openers = {'(':')','[':']','{':'}','<':'>'};
const points = {')':3,']':57,'}':1197,'>':25137};
const reward = {')':1,']':2,'}':3,'>':4};
for(let i=0; i<read.length; i++){
    input.push(read[i].split(''));
}

let sum = 0;
let part2 = [];
for (let i=0; i<input.length; i++){
    let corrupt = false;
    let queue = [];
    let closer = "";
    for(let x=0; x<input[i].length; x++){
        if(input[i][x] in openers){
            closer = openers[input[i][x]];
            queue.push(closer);
        }else{
            if(input[i][x]==closer){
                queue.pop();
                closer = queue.length>0?queue[queue.length-1]:"";
            }else{
                corrupt = true;
                sum+=points[input[i][x]];
                break;
            }
        }
    }
    if(!corrupt){
        let value = 0;
        while(queue.length>0){
            value=(value*5)+reward[queue.pop()];
        }
        part2.push(value);
    }
}
console.log("Part 1: ", sum);

part2.sort(function(a,b){return a - b});
let middle = Math.floor(part2.length/2);
console.log("Part 2: ", part2[middle]);