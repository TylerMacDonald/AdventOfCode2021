import fs from "fs";
let text : string = fs.readFileSync("day2.txt").toString('utf-8');
let input : string[] = text.split("\r\n");

let x : number = 0;
let depth : number = 0;
let depthp2 : number = 0;
let aim : number = 0;

for(let i : number=0; i<input.length; i++){
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