//let input = "target area: x=20..30, y=-10..-5";
let input = "target area: x=241..273, y=-97..-63";
let valid = input.split(': ')[1];
let tx = valid.split('x=')[1].split(',')[0].split('..').map(x=>Number(x));
let ty = valid.split('y=')[1].split('..').map(x=>Number(x));
tx.sort(function(a, b){return a-b});
ty.sort(function(a, b){return a-b});

function step(pos, x, y){
    pos.x += x;
    pos.y += y;
    if(x>0){
        x--;
    }else if(x<0){
        x++;
    }
    y--;
    return [pos,x,y]
}

function simulateVelocity(pos, x,y){
    let maxy = 0;
    let found = false;
    while (pos.x<=tx[1] && pos.y>=ty[0] && !found){
        let newvals = step(pos, x, y);
        pos = newvals[0];
        x = newvals[1];
        y = newvals[2];
        if(pos.y>=maxy){
            maxy = pos.y;
        }
        if(pos.x>=tx[0] && pos.x<=tx[1] && pos.y>=ty[0] && pos.y<=ty[1]){
            found = true;
        }
    }
    if(found){
        return maxy;
    }else{
        return false;
    }
    
}

let count = 0;
let maxy = 0;
for(let y=-100; y<900; y++){
    for(let x=0; x<900; x++){
        let newy = simulateVelocity({x:0, y:0}, x, y);
        if(newy!==false){
            if(newy>=maxy){
                maxy = newy;
            }
            count++;
        }
    }
}

console.log("Part 1: ", maxy);
console.log("Part 2: ", count);