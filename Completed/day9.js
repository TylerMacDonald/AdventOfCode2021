const file = require("../import");
let text = file.getInput("day9.txt");
let read = text.split("\r\n");
let input = [];
let checked = [];
for(let i=0; i<read.length; i++){
    input.push(read[i].split('').map(x=>Number(x)));
    checked.push(read[i].split('').map(x=>Number(x)));
}

function checkLowest(data,x,y){
    let maxx = data[0].length-1;
    let maxy = data.length-1;
    let pos=data[y][x];
    let up = y-1<0?true:data[y-1][x]>pos;
    let down = y+1>maxy?true:data[y+1][x]>pos;
    let right = x+1>maxx?true:data[y][x+1]>pos;
    let left = x-1<0?true:data[y][x-1]>pos;
    if(up&&left&&down&&right){
        return true;
    }else{
        return false;
    }
}


let riskSum = 0;
for(let y=0; y<input.length; y++){
    for(let x=0; x<input[y].length; x++){
        if(checkLowest(input,x,y)){
            riskSum+=input[y][x]+1;
        }
        checked[y][x]=false;
    }
}
console.log("Part 1: ", riskSum);

function findCoord(current,x,y){
    return (current.find(element => element.x==x&&element.y==y)==undefined?false:true)
}
let basins = [];
function checkBasin(data,x,y,currentBasin){
    let maxx = data[0].length-1;
    let maxy = data.length-1;
    let up = y-1<0?true:(data[y-1][x]==9?true:false);
    let down = y+1>maxy?true:(data[y+1][x]==9?true:false);
    let right = x+1>maxx?true:(data[y][x+1]==9?true:false);
    let left = x-1<0?true:(data[y][x-1]==9?true:false);
    if(!up && !findCoord(currentBasin,x,y-1)){
        currentBasin.push({'y':y-1, 'x':x});
        checked[y-1][x]=true;
        checkBasin(data,x,y-1,currentBasin);
    }
    if(!down && !findCoord(currentBasin,x,y+1)){
        currentBasin.push({'y':y+1, 'x':x});
        checked[y+1][x]=true;
        checkBasin(data,x,y+1,currentBasin);
    }
    if(!right && !findCoord(currentBasin,x+1,y)){
        currentBasin.push({'y':y, 'x':x+1});
        checked[y][x+1]=true;
        checkBasin(data,x+1,y,currentBasin);
    }
    if(!left && !findCoord(currentBasin,x-1,y)){
        currentBasin.push({'y':y, 'x':x-1});
        checked[y][x-1]=true;
        checkBasin(data,x-1,y,currentBasin);
    }
}
let currentBasin=[];
for(let y=0; y<input.length; y++){
    for(let x=0; x<input[y].length; x++){
        if(input[y][x]!==9 && !checked[y][x]){
            currentBasin.push({'y':y,'x':x});
            checked[y][x]=true;
            checkBasin(input,x,y,currentBasin);
            basins.push(currentBasin);
            currentBasin=[];
        }
    }
}
let basinSizes = [];
for(let i=0; i<basins.length; i++){
    basinSizes.push(basins[i].length);
}
basinSizes.sort(function(a,b){return a - b})
let len = basinSizes.length;
let part2 = basinSizes[len-1]*basinSizes[len-2]*basinSizes[len-3]
console.log("Part 2: ", part2);