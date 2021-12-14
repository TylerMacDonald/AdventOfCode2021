const file = require("../import");
//let text = file.getInput("sample.txt");
let text = file.getInput("day14.txt");
let read = text.split("\r\n");
let input = [];
let template = read[0];
let rules = {};
let counts = {};
for(let i=2; i<read.length; i++){
    let split = read[i].split(' -> ');
    rules[split[0]] = split[1];
}
for(let i=0; i<template.length-1; i++){
    if(template[i]+template[i+1] in counts){
        counts[template[i]+template[i+1]]++
    }else{
        counts[template[i]+template[i+1]]=1;
    }
}

function safeIncrement(arr, value, amount=1){
    if(amount==undefined){
        amount=1;
    }
    if(arr[value] == undefined){
        arr[value] = amount;
    }else{
        arr[value]+= amount;
    }
}

for(let step=0; step<40; step++){
    let values = Object.keys(counts);
    let temp = {};
    for(let i=0; i<values.length; i++){
        let new1 = values[i][0]+rules[values[i]];
        let new2 = rules[values[i]]+values[i][1];
        safeIncrement(temp, new1, counts[values[i]]);
        safeIncrement(temp, new2, counts[values[i]]);
    }
    counts = temp;
    if(step==9){
        let part1 = CountLetters(counts);
        console.log("Part 1: ", part1[1]-part1[0]);
    }
}

function CountLetters(arr){
    let lc = {};
    let values = Object.keys(arr);
    for(let i=0; i<values.length; i++){
        safeIncrement(lc,values[i][0], counts[values[i]]);
    }
    safeIncrement(lc,template[template.length-1], 1);
    return [Math.min(...Object.values(lc)),Math.max(...Object.values(lc))];
}

let part2 = CountLetters(counts);
console.log("Part 2: ", part2[1]-part2[0]);