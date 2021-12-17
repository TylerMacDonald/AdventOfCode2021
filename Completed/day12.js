const file = require("../utils/import");
//let text = file.getInput("sample.txt");
let text = file.getInput("day12.txt");
let read = text.split("\r\n");
let nodes = {};

for(let i=0; i<read.length; i++){
    let line = read[i].split('-');
    if(line[0] in nodes){
        nodes[line[0]].push(line[1]);
    }else{
        nodes[line[0]] = [line[1]];
    }
    if(line[1] in nodes){
        nodes[line[1]].push(line[0]);
    }else{
        nodes[line[1]] = [line[0]];
    }
}

function solve(part2){ // true for part 2, false for part 1;
    let count = 0;
    let startEnd = ["start","end"];
    let path = [{pos:"start",small:["start"], twice: ""}];
    while (path.length>0){
        let cur = path.pop(); // remove current step from path.
        let pos = cur.pos; // assign pos to temp
        let small = cur.small; // assign current visited small caves
        let twice = cur.twice; // assign current cave we have visited twice
        if(pos == "end"){ // If we hit the end, increase count.
            count++;
        }
        for(let i=0; i<nodes[pos].length; i++){ //Step through all nodes attached to current position
            if(!small.includes(nodes[pos][i])){ //If it is not a small cave we already visited.
                let newSmall = [...small]; // Create a new list of small nodes as new array to avoid reference
                if(nodes[pos][i]==nodes[pos][i].toLowerCase()){
                    newSmall.push(nodes[pos][i]); //If it is lowercase, add it to the list of visited lowercases
                }
                path.push({pos:nodes[pos][i], small:newSmall, twice:twice}); // Push the new node into Paths
                //Part 2, if node is Small, but twice is empty, and it is not start or end... and we are solving for part 2.
            }else if(small.includes(nodes[pos][i]) && twice=="" && !startEnd.includes(nodes[pos][i]) && part2){
                path.push({pos:nodes[pos][i], small:small, twice:nodes[pos][i]});
            }
        }
    }
    return count;
}

console.log("Part 1: ", solve(false));
console.log("Part 2: ", solve(true));