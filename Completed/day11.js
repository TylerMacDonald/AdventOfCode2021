const file = require("../import");
let text = file.getInput("day11.txt");
let read = text.split("\r\n");
let input = [];
for(let i=0; i<read.length; i++){
    input.push(read[i].split('').map(x=>Number(x)));
}
let maxX = input[0].length;
let maxY = input.length;
let size = maxX*maxY;

function flashRecurse(x,y){
    let d=[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; // All neighour Deltas
    input[y][x] = 0;
    part1++;
    part2++;
    for(let i=0; i<8; i++){
        let newX = x+d[i][0];
        let newY = y+d[i][1];
        if((newX>=0 && newX<maxX) && (newY>=0 && newY<maxY)){ //Make sure its in bounds
            if(input[newY][newX]!=0){ // Not already flashed
                input[newY][newX]++;
                if(input[newY][newX]>=10){
                    flashRecurse(newX,newY); // flash if it should flash
                }
            }
        }
    }
}


let part1 = 0;
let part2=0;
let step = 0;
while(part2<size){ //Exit loop when All flashes are found.
    part2=0;
    step++;
    input = input.map(y=>y.map(function(x){return x+1})); //increment entire grid
    for(let y=0; y<input.length; y++){
        for(let x=0; x<input[y].length; x++){
            if(input[y][x]==10){
                flashRecurse(x,y);
            }
        }
    }
    if(step==100){ // Print Part 1 at step 100
        console.log("Part 1: ", part1);
    }
}
console.log("Part 2: ", step);