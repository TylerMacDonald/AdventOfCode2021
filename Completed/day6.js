const { Console } = require("console");
const fs = require("fs");
let text = fs.readFileSync("day6.txt").toString('utf-8');
let input = text.split(",").map(x=>Number(x));
function loopDays(days){
    let map = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0};
    for(let i=0; i<input.length; i++){
        map[input[i]]++;
    }
    for(let day=0; day<days; day++){
        let newlife = 0;
        for(let i=0; i<9; i++){
            if(i==0){
                if(map[i]>0){
                    newlife=map[i];
                    map[i] = 0;
                }
            }else{
                map[i-1]+=map[i];
                map[i]=0;
            }
        }
        map[6]+=newlife;
        map[8]=newlife;
    }
    let sum=0;
    for(let i=0; i<9; i++){
        sum+=map[i];
    }
    return sum;
}

console.log("Part 1:", loopDays(80));
console.log("Part 2:", loopDays(256));