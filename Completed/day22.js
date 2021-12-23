const file = require("./utils/import");
const _ = require('./utils/customAssert');
const csg = require("./utils/csg.js");
let text = file.getInput("sample.txt");
//let text = file.getInput("input.txt");
let read = text.split("\r\n");
let onLights = new Set();
let lines = [];
for(let i=0; i<read.length; i++){
    let on = read[i].split(' ')[0]=="on";
    let xs = read[i].split("x=")[1].split(',')[0].split('..').map(x=>Number(x));
    let ys = read[i].split("y=")[1].split(',')[0].split('..').map(x=>Number(x));
    let zs = read[i].split("z=")[1].split('..').map(x=>Number(x));
    lines.push({
        state: on,
        x1: Math.min(xs[0], xs[1]),
        x2: Math.max(xs[0], xs[1]),
        y1: Math.min(ys[0], ys[1]),
        y2: Math.max(ys[0], ys[1]),
        z1: Math.min(zs[0], zs[1]),
        z2: Math.max(zs[0], zs[1]),
      });
    if(xs[0]<-50||xs[1]>50||ys[0]<-50||ys[1]>50||zs[0]<-50||zs[1]>50)
        continue;
    for(let x=xs[0]; x<=xs[1]; x++){
        for(let y=ys[0]; y<=ys[1]; y++){
            for(let z=zs[0]; z<=zs[1]; z++){
                if(on){
                    onLights.add(`${x},${y},${z}`);
                }else{
                    onLights.delete(`${x},${y},${z}`);
                }
            }
        }
    }
}

console.log("Part 1: ", onLights.size);

function part2(lines) {
    const xs = new Set();
    const ys = new Set();
    const zs = new Set();
    for (const {x1, x2, y1, y2, z1, z2} of lines) {
      //console.log(x1, x2, y1, y2, z1, z2);
      xs.add(x1);
      xs.add(x2+1);
      ys.add(y1);
      ys.add(y2+1);
      zs.add(z1);
      zs.add(z2+1);
    }
    const X = [...xs.values()];
    const Y = [...ys.values()];
    const Z = [...zs.values()];
    X.sort((a, b) => a - b);
    Y.sort((a, b) => a - b);
    Z.sort((a, b) => a - b);
    let sum = 0;
    lines = [...lines]
    lines.reverse();
    for(let x=0; x<X.length; x++){
        if (x == X.length - 1) 
            return;
        const xlines = lines.filter(({x1, x2}) => X[x] >= x1 && X[x + 1] <= x2+1); 
        for(let y=0; y<Y.length; y++){
            if (y == Y.length - 1) 
                return;
            const ylines = xlines.filter(({y1, y2}) => Y[y] >= y1 && Y[y + 1] <= y2+1);
            for(let z=0; z<Z.length; z++){
                if (z == Z.length - 1) 
                    return;
                for (let {state, x1, x2, y1, y2, z1, z2} of ylines) {
                    if (Z[z] >= z1 && Z[z + 1] <= z2+1) {
                    if (state) {
                        sum += (X[x + 1] - X[x]) * (Y[y + 1] - Y[y]) * (Z[z + 1] - Z[z]);
                    }
                    break;
                    }
                }
            }
        }
    }
    return sum;
}

console.log("Part 2: ", part2(lines));