const file = require("../import");
//let text = file.getInput("sample.txt");
let text = file.getInput("day16.txt");
let read = text;
let binary = "";
for(let i=0; i<read.length; i++){
    let cur = "0000"+parseInt(read[i],16).toString(2);
    cur = cur.substring(cur.length-4);
    binary+=cur;
}
let out = {bin:binary, pos:0};

//Read from current position until number specified in current binary.
//if Convert == true, return int in decimal, otherwise return binary string.
function readSegement(o, num, convert=true){
    let str = "";
    for(let i=0; i<num; i++){
        if(o.pos >= o.bin.length){
            return false;
        }
        str+=o.bin[o.pos++];
    }
    if(convert){
        return parseInt(str,2);
    }
    return str;
}

let versions = [];
//Solve binary, and pass along a function that when fully complete exports total result.
//When in the subsections, we pass different function in that pushes number to a sub values array.
//That array is then used based on Type to calculate final result for current binary.
function solveBinary(o, sv){
    let version = readSegement(o,3);
    let type = readSegement(o,3);
    if(type === false || version === false){
        return false;
    }
    versions.push(version);
    if(type==4){
        let num = "";
        while(true){
            let end = readSegement(o,1);
            let number = readSegement(o,4,false);
            num+=number;
            if(end==0){
                sv(parseInt(num,2));
                return true;
            }
        }
    }else{
        let values = [];
        let I = readSegement(o,1);
        if(I==1){
            let packets = readSegement(o,11);
            for(let i=0; i<packets; i++){
                //Since we are in a operator area here, we want to keep pushing
                //all numbers to values array.
                solveBinary(o,(x)=> values.push(x));
            }
        }else{
            let length = readSegement(o, 15);
            let sub =  o.bin.substring(o.pos, o.pos + length);
            let state = {bin: sub, pos: 0};
            //Same as above, we want to keep pushing results to the array.
            while(solveBinary(state, (x)=> values.push(x)));
            o.pos += length;
        }

        //Calculating what we want to do with our list of Subvalues now that we have them.
        switch(type){
            case 0: 
                sv(values.reduce((a,b) => a + b, 0));
                break;
            case 1: 
                sv(values.reduce((a,b) => a * b, 1));
                break;
            case 2: 
                sv(Math.min(...values));
                break;
            case 3: 
                sv(Math.max(...values));
                break;
            case 5: 
                sv(values[0] > values[1] ? 1 : 0);
                break;
            case 6: 
                sv(values[0] < values[1] ? 1 : 0);
                break;
            case 7: 
                sv(values[0] == values[1] ? 1 : 0);
        }
    }
    return true;
}

let part1 = 0;
let part2 = 0;
//We export final result to part2 variable before displaying it.
while(solveBinary(out, (x)=>part2=x));
part1 = versions.reduce((a,b) => a + b); // Sum Versions for Part 1.
console.log("Part 1: ", part1);
eval(`0b${BigInt(`0x1${text}`).toString(2).substring(1).replaceAll(/(...)(100(1....)*0....|...(0.{15}|1.{11}))/g, "$1+0b")}0`)
console.log("Part 2: ", part2);