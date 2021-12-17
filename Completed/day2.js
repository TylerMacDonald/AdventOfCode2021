const file = require("../utils/import");
let text = file.getInput("day2.txt");
let input = text.split("\r\n");

let x = 0;
let depth = 0;
let depthp2 = 0;
let aim = 0;

for(let i =0; i<input.length; i++){
    let pair = input[i].split(" ");
    if(pair[0][0]=="f"){
        x+=Number(pair[1]);
        depthp2+=(aim*Number(pair[1]));
    }else if(pair[0][0]=="u"){
        depth-=Number(pair[1]);
        aim-=Number(pair[1]);
    }else{
        depth+=Number(pair[1]);
        aim+=Number(pair[1]);
    }
}

console.log("Part 1: ", depth*x);
console.log("Part 2: ", depthp2*x);