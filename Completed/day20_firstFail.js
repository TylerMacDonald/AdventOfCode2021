const file = require("../utils/import");
//let text = file.getInput("sample.txt");
let text = file.getInput("day20.txt");
let read = text.split("\r\n");
let lookup = read[0];
var points = new Set();
let minx;
let maxx;
let miny;
let maxy;
for(let i=2; i<read.length; i++){
    let data = read[i].split('');
    for(let x=0; x<data.length; x++){
        if(data[x]=="#")
            points.add(`${x},${i-2}`);
    }
}

//console.log(points);
function findminMax(points){
    let tempx = [...points].map(x=>x.split(',')[0]);
    let tempy = [...points].map(y=>y.split(',')[1]);
    minx = Math.min(...tempx);
    maxx = Math.max(...tempx);
    miny = Math.min(...tempy);
    maxy = Math.max(...tempy);
}

function step(points, on){
    let points2 = new Set();
    findminMax(points);
    for(let y=miny-5; y<maxy+10; y++){
        for(let x=minx-5; x<maxx+10; x++){
            let str = "";
            let bit = 8;
            for(let dy=-1; dy<=1; dy++){
                for(let dx=-1; dx<=1; dx++){
                    if((points.has(`${x+dx},${y+dy}`)) == on){
                        str += Math.pow(bit, 2);
                    }
                    bit--;
                }
            }
            if((lookup[str]=="#") !== on){
                points2.add(`${x},${y}`);
            }
        }
    }
    return points2;
}

function drawGrid(points){
    findminMax(points);
    for(let y=miny-5; y<maxy+5; y++){
        let row = "";
        for(let x=minx-5; x<maxx+5; x++){
            if(points.has(`${x},${y}`)){
                row+="#";
            }else{
                row+=" ";
            }
        }
        console.log(row);
    }
}

for(let i=0; i<2; i++){
    console.log(points.size);
    //drawGrid(points);
    points = step(points, (i%2==0 && lookup[0]=='#' && lookup[511]=="."));
    if(i==1){
        //drawGrid(points);
        console.log("Part 1:", points.size);
    }
}
console.log("Part 2: ", points.size);