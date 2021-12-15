const file = require("../import");
//let text = file.getInput("sample.txt");
let text = file.getInput("day15.txt");
let read = text.split("\r\n");
let cave = [];
for(let i=0; i<read.length; i++){
    cave.push(read[i].split('').map(x=>Number(x)));
}

let maxx = cave[0].length-1;
let maxy = cave.length-1;

let seen = {};
function minCost(row, col){
    if(seen[`${row},${col}`] !== undefined){
        return seen[`${row},${col}`];
    }
    if((row<0 || row>maxy) || (col<0 || col>maxx)){
        return Number.MAX_SAFE_INTEGER;
    }
    if(row==maxy && col==maxx){
        return cave[row][col];
    }
    let minPath = cave[row][col] + Math.min(minCost(row+1, col), minCost(row, col+1));
    seen[`${row},${col}`] = minPath;
    return minPath;
}
console.log("Part 1: ", minCost(0,0)-cave[0][0]);


let cost = new Array(cave.length * 5).fill(0).map(e => new Array(cave[0].length * 5).fill(0));
for (let y = 0; y < cost.length; y++) {
    for (let x = 0; x < cost[0].length; x++) {
        cost[y][x] = ((cave[y % cave.length][x % cave[0].length] + Math.floor(y / cave.length) + Math.floor(x / cave[0].length) - 1)%9)+1;
    }
}

let risk = Array.from({ length: cost.length }, () => Array.from({ length: cost[0].length }, () => Infinity));

let found = true;
while(found){
    for(let y=0; y<cost.length; y++){
        for(let x=0; x<cost[0].length; x++){
            if(x==0 && y == 0){
                risk[y][x] = 0;
            }else{
                let values = [];
                if(x>0){
                    values.push(risk[y][x-1]);
                }
                if(y>0){
                    values.push(risk[y-1][x]);
                }
                risk[y][x] =  Math.min(risk[y][x], Math.min(...values)+cost[y][x]);
            }
        }
    }
    found = false;
    let result = false;
    for(let y=0; y<cost.length; y++){
        for(let x=0; x<cost[0].length; x++){
            if (y==cost.length-1 && x == cost[0].length-1){
                found = result;
                break;
            }
            let values = [];
            if(x !== cost[0].length - 1){
                values.push(risk[y][x+1]);
            }
            if(y !== cost.length - 1){
                values.push(risk[y+1][x]);
            }
            let min = Math.min(...values) + cost[y][x];
            if(min<risk[y][x]){
                risk[y][x] = min;
                result = true;
            }
        }
    }
}

console.log("Part 2: ",risk[risk.length - 1][risk[0].length - 1]);