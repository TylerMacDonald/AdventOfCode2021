const file = require("../utils/import");
let text = file.getInput("day5.txt");
let lines = text.split("\r\n");
let pairs = [];
let counts = Array(1000).fill().map(() => Array(1000).fill(0));
for(let i=0; i<lines.length; i++){  
    let set = lines[i].split(' -> ');
    let coord1 = set[0].split(',');
    let coord2 = set[1].split(',');
    let coordPair = {x1:Number(coord1[0]),y1:Number(coord1[1]),x2:Number(coord2[0]),y2:Number(coord2[1])};
    pairs.push(coordPair);
}

//Horizontal / Vertical Lines
for(let i=0; i<pairs.length; i++){
    let x1 = pairs[i].x1;
    let y1 = pairs[i].y1;
    let x2 = pairs[i].x2;
    let y2 = pairs[i].y2;
    if(x1==x2){
        let high;
        let low;
        if(y1==y2){
            counts[x1][y2]+=1;
        }else{
            if(y1>y2){
                high = y1;
                low = y2;
            }else{
                high = y2;
                low = y1;
            }
            for(let y=low; y<=high; y++){
                counts[x1][y]+=1;
            }
        }
    }else if(y1==y2){
        let high;
        let low;
        if(x1==x2){
            counts[x1][y2]+=1;
        }else{
            if(x1>x2){
                high = x1;
                low = x2;
            }else{
                high = x2;
                low = x1;
            }
            for(let x=low; x<=high; x++){
                counts[x][y1]+=1;
            }
        }
    }
}
let final = [].concat(...counts);
let part1 = final.filter(x=>x>1).length;
console.log("Part 1: ",part1);

//Diagonal Lines
for(let i=0; i<pairs.length; i++){
    let x1 = pairs[i].x1;
    let y1 = pairs[i].y1;
    let x2 = pairs[i].x2;
    let y2 = pairs[i].y2;
    if(x1!==x2&&y1!==y2){
        if(Math.abs(x1-x2)==Math.abs(y1-y2)){
            let loops = Math.abs(x1-x2);
            for(let i=0; i<=loops; i++){
                if(x1<x2){
                    if(y1<y2){
                        counts[x1+i][y1+i]+=1;
                    }else{
                        counts[x1+i][y1-i]+=1;
                    }
                }else{
                    if(y1<y2){
                        counts[x1-i][y1+i]+=1;
                    }else{
                        counts[x1-i][y1-i]+=1;
                    }
                }
            }
        }
    }
}
/*for(let x=0; x<counts.length; x++){
    let str = "";
    for(let y=0; y<counts[x].length; y++){
        str+=counts[y][x]==0?".":counts[y][x];
    }
    console.log(str);
}*/
let final2 = [].concat(...counts);
let part2 = final2.filter(x=>x>1).length;
console.log("Part 2: ",part2);