const file = require("../utils/import");
const _ = require('../utils/customAssert');
let text = file.getInput("day18.txt");
let read = text.split("\r\n");
let input = [];
for(let i=0; i<read.length; i++){
    input[i]=JSON.parse(read[i]);
}

function add(t1, t2){
    let result = [t1, t2];
    return reduce(result);
}

function reduce(t){
    let results = explode(t);
    let success = results[0];
    let t1 = results[1];
    if(success){
        return reduce(t1);
    }else{
        let res2 = split(t);
        let s2 = res2[0];
        let t2 = res2[1];
        if(s2){
            return reduce(t2);
        }else{
            return t2;
        }
    }
}

function split(x){
    if(typeof(x)=='object'){
        let r1 = split(x[0]);
        let s1 = r1[0];
        let x1 = r1[1];
        if(s1){
            return [true, [x1, x[1]]]
        }else{
            let r2 = split(x[1]);
            let s2 = r2[0];
            let x2 = r2[1];
            return [s2, [x1,x2]];
        }
    }else{
        if(x>=10){
            return [true, [Math.floor(x/2), Math.floor((x+1)/2)]];
        }else{
            return [false, Number(x)];
        }
    }
}

function explode(t){
    let ts = JSON.stringify(t);
    let parts = [];
    for(let i=0; i<ts.length; i++){
        if(ts[i]=='['||ts[i]==","||ts[i]=="]"){
            parts.push(ts[i]);
        }else if(ts[i]!==" "){
            let index = i; 
            while(index<ts.length && !isNaN(ts[index])){
                index++;
            }
            parts.push(Number(ts.substring(i,index)));
            i = index-1;
        }
    }
    let depth = 0;
    for(let i=0; i<parts.length; i++){
        if(parts[i]=="["){
            depth++;
            if(depth==5){
                let left = parts[i+1];
                let right = parts[i+3];
                let left_index = null;
                let right_index = null;
                for(let index=0; index<parts.length; index++){
                    if(!isNaN(parts[index]) && index<i){
                        left_index = index;
                    }else if(!isNaN(parts[index]) && index>i+3 && right_index==null){
                        right_index = index;
                    }
                    if(right_index!==null)
                        break;
                }
                if(right_index!==null){
                    let num = Number(parts[right_index])+Number(right);
                    parts[right_index] = num;
                }
                let temp = parts.filter((x,index)=>index<i);
                let temp2 = parts.filter((x,index)=>index>=i+5);
                parts = temp.concat(0).concat(temp2);
                if(left_index!==null){
                    let num = Number(parts[left_index])+Number(left);
                    parts[left_index]=num;
                }
                return [true, JSON.parse(parts.join(''))];
            }
        }else if(parts[i]==']'){
            depth--;
        }
    }
    return [false, t];
}

function mag(x){
    if(typeof(x)=='object'){
        return 3*mag(x[0]) + 2*mag(x[1]);
    }else{
        return x;
    }
}

let cur = input[0];
for(let x=1; x<input.length; x++){
    cur = add(cur, input[x]);
}
console.log("Part 1: ", mag(cur));

let p2 = null;
for(let x=0; x<input.length; x++){
    for(let y=0; y<input.length; y++){
        if(x!==y){
            let mag1 = mag(add(input[x],input[y]));
            if(mag1>p2 || p2==null){
                p2 = mag1;
            }
        }
    }
}
console.log("Part 2: ", p2);