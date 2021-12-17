const file = require("../utils/import");
let text = file.getInput("day13.txt");
let read = text.split("\r\n");
let input = [];
let folds = [];
let maxx = 0;
let maxy = 0;
for(let i=0; i<read.length; i++){
    if(read[i].includes("fold")){
        let fold = read[i].split('=');
        let newFold = [-1,-1];
        if(fold[0].includes("along y")){
            newFold[0] = Number(fold[1]);
        }else{
            newFold[1] = Number(fold[1]);
        }
        folds.push(newFold);
    }else{
        let coord = read[i].split(',').map(x=>Number(x));
        if(coord.length==2){
            input.push(coord);
            if(coord[0]>=maxx){
                maxx = coord[0];
            }
            if(coord[1]>=maxy){
                maxy = coord[1];
            }
        }
    }
}
//init Grid
let grid = Array(maxy+1).fill().map(() => Array(maxx+1).fill(' '));
for(let i=0; i<input.length; i++){
    grid[input[i][1]][input[i][0]]='#';
}

function fold(f){
    let newGrid = null;
    if(f[1]==-1){
        newGrid = Array(f[0]).fill().map(() => Array(maxx+1).fill(' '));
        for(let y=0; y<newGrid.length; y++){
            for(let x=0; x<newGrid[y].length; x++){
                if(grid[y][x]=="#" || grid[maxy-y][x]=="#"){
                    newGrid[y][x]="#";
                }
            }
        }
    }else{
        newGrid = Array(maxy+1).fill().map(() => Array(f[1]).fill(' '));
        for(let y=0; y<newGrid.length; y++){
            for(let x=0; x<newGrid[y].length; x++){
                if(grid[y][x]=="#" || grid[y][maxx-x]=="#"){
                    newGrid[y][x]="#";
                }
            }
        }
    }
    maxy = newGrid.length-1;
    maxx = newGrid[0].length-1;
    return newGrid;
}

function drawCountGrid(_grid,display){
    let count = 0;
    for(let y=0; y<_grid.length; y++){
        let str = "";
        for(let x=0; x<_grid[y].length; x++){
            if(_grid[y][x]=='#'){
                count++;
            }
            str += _grid[y][x];
        }
        if(display){
            console.log(str);
        }
    }
    return count;
}

for(let i=0; i<folds.length; i++){
    grid = fold(folds[i]);
    if(i==0){
        console.log("Part 1: ", drawCountGrid(grid,false));
    }
}
console.log("\nPart 2: \n");
drawCountGrid(grid,true);