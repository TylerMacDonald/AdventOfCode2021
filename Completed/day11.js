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
    let dR=[-1,0,1];
    let dC=[-1,0,1];
    input[y][x] = "f";
    for(let r=0; r<3; r++){
        for(let c=0; c<3; c++){
            let newX = x+dR[r];
            let newY = y+dC[c];
            if((newX>=0 && newX<maxX) && (newY>=0 && newY<maxY)){
                if(input[newY][newX]!="f"){
                    input[newY][newX]++;
                    if(input[newY][newX]>=10){
                        flashRecurse(newX,newY);
                    }
                }
            }
        }
    }
}


let flashCount = 0;
let count=0;
let i = 0;
while(count<size){ //Exit loop when All flashes are found.
    count=0;
    input = input.map(y=>y.map(function(x){return x+1}));
    for(let y=0; y<input.length; y++){
        for(let x=0; x<input[y].length; x++){
            if(input[y][x]==10){
                flashRecurse(x,y);
            }
        }
    }
    for(let y=0; y<input.length; y++){
        for(let x=0; x<input[y].length; x++){
            if(input[y][x]=="f"){
                input[y][x]=0;
                flashCount++; // Part 1
                count++; // Part 2
            }
        }
    }
    if(i==99){ // Print Part 1 at step 100
        console.log("Part 1: ", flashCount);
    }
    i++;
}
console.log("Part 2: ", i);