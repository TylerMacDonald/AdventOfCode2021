const file = require("../utils/import");
let text = file.getInput("day8.txt");
let data = text.split("\r\n");
let pairs = [];
let part1 = 0;
for(let i=0; i<data.length; i++){
    let split = data[i].split(' | ');
    let input = split[0].split(' ');
    let output = split[1].split(' ');
    input = input.concat(...output);
    pairs.push({in:input, out:output});
}

//Support function to find all chars in common
function segmentsInCommon(_str,_search){
    let str = "";
    let search = "";
    if(_str.length>_search.length){
        str = _str;
        search = _search;
    }else{
        str = _search;
        search = _str;
    }
    let count = 0;
    for(let i=0; i<search.length; i++){
        if(str.indexOf(search[i])>=0){
            count++;
        }
    }
    return count;
}

let part1 = 0;
let sum = 0;
for(let i=0; i<pairs.length; i++){
    let _1 = pairs[i].in.find(x=>x.length==2);
    let _4 = pairs[i].in.find(x=>x.length==4);
    let _8 = pairs[i].in.find(x=>x.length==7);
    let str = "";
    for(let x=0; x<pairs[i].out.length; x++){
        let cur = pairs[i].out[x];
        let r = ""+segmentsInCommon(cur,_8)+segmentsInCommon(cur,_1)+segmentsInCommon(cur,_4);
             if(r.match(/724/)) { str+='8'; part1++; } 
        else if(r.match(/424/)) { str+='4'; part1++; }
        else if(r.match(/322/)) { str+='7'; part1++; }
        else if(r.match(/222/)) { str+='1'; part1++; }
        else if(r.match(/512/)) { str+='2'; }
        else if(r.match(/513/)) { str+='5'; }
        else if(r.match(/523/)) { str+='3'; }
        else if(r.match(/613/)) { str+='6'; }
        else if(r.match(/624/)) { str+='9'; }
    }
    sum+=Number(str);
}
console.log("Part 1: ", part1);
console.log("Part 2: ", sum);