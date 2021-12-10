const fs = require("fs");
let text = fs.readFileSync("day8.txt").toString('utf-8');
let data = text.split("\r\n");
let pairs = [];
let sum = 0;

for(let i=0; i<data.length; i++){
    let split = data[i].split(' | ');
    let input = split[0].split(' ');
    let output = split[1].split(' ');
    for(let x=0; x<output.length; x++){
        let len = output[x].length
        if(len==2||len==3||len==4||len==7){
            sum++;
        }
    }
    input = input.concat(...output);
    pairs.push({in:input, out:output});
}
console.log("Part 1: ", sum);

//Support function to find extra character difference between two characters
function findExtraCharcter(strA, strB)
{
    let res = 0;
    for (let i = 0; i < strA.length; i++)
    {
        res ^= strA.charCodeAt(i);
    }
    for (let i = 0; i < strB.length; i++)
    {
        res ^= strB.charCodeAt(i);
    }
    return String.fromCharCode(res);
}

//Support function to return true if str has all the characters of search in any order.
function containsAll(str,search){
    if(str.length<search.length){
        return false;
    }
    let bool = true;
    for(let i=0; i<search.length; i++){
        if(str.indexOf(search[i])<0){
            bool = false;
        }
    }
    return bool;
}

sum = 0;
for(let i=0; i<pairs.length; i++){
    let clockmap = {top:'',middle:'',topleft:'',topright:'',bottomleft:'',bottomright:'',bottom:''}
    numbers = [];
    //Givens
    numbers[1] = pairs[i].in.find(x=>x.length==2);
    numbers[4] = pairs[i].in.find(x=>x.length==4);
    numbers[7] = pairs[i].in.find(x=>x.length==3);
    numbers[8] = pairs[i].in.find(x=>x.length==7);
    let _5digits = pairs[i].in.filter(x=>x.length==5);
    let _6digits = pairs[i].in.filter(x=>x.length==6);

    //Find 3 which is the only 5 segment digit with both of 1's segements
    numbers[3] = _5digits.find(x=>containsAll(x,numbers[1]));

    //Find 9 which is the only 6 segment digit with all of 3's segements
    numbers[9] = _6digits.find(x=>containsAll(x,numbers[3]));

    //Find topleft segment by finding the difference between 3 and 9;
    clockmap.topleft = findExtraCharcter(numbers[3],numbers[9]);

    //Find middle segment by finding the difference between 1+topLeft and 4;
    clockmap.middle = findExtraCharcter(numbers[1]+clockmap.topleft,numbers[4]);

    //Find 0 which is the only 6 dsegment digit without the middle bar.
    numbers[0] = _6digits.find(x=>!containsAll(x,clockmap.middle));

    //Find 6 which is the only 6 digit segment without both of 1's segments
    numbers[6] = _6digits.find(x=>!containsAll(x,numbers[1]));

    //Find all 5/2 by removing 3 from 5digit numbers
    let _5sand2s = _5digits.filter(x=>!containsAll(x,numbers[1]));

    //Find two by looking at all 2/5s possibilities without top left.
    numbers[2] = _5sand2s.find(x=>!containsAll(x,clockmap.topleft));

    //Find five by looking at all 2/5s possibilities with top left.
    numbers[5] = _5sand2s.find(x=>containsAll(x,clockmap.topleft));
    let str = "";
    for(let x=0; x<pairs[i].out.length; x++){
        for(let y=0; y<10; y++){
            if(numbers[y].length == pairs[i].out[x].length){
                if(containsAll(pairs[i].out[x],numbers[y])){
                    str+=y;
                    break;
                }
            }
        }
    }
    sum+=Number(str);
}
console.log("Part 2: ", sum);