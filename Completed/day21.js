const file = require("./utils/import");
const _ = require('./utils/customAssert');
const util = require("./utils/utility");
let input = [3,4];
let qDice = [];
let playerPos = [2,3];
let pScore = [0,0];
for (let i=1; i<=100; i++){
    qDice.push(i);
}

let diceRolls = 0;

function rollDice(){
    let dice = 0;
    for(let i=0; i<3; i++){
        let die = qDice.shift();
        qDice.push(die);
        dice+=die;
        diceRolls++;
    }
    return dice;
}

function playerTurn(player){
    let diceRolled = rollDice();
    playerPos[player]=(playerPos[player]+diceRolled)%10;
    pScore[player]+=playerPos[player]+1;
}
let rounds = 0;
let p1win = false;
let p2win = false;
while(!p2win&&!p1win){
    playerTurn(rounds%2);
    rounds++;
    p1win = pScore[0]>=1000;
    p2win = pScore[1]>=1000;
}

if(p2win){
    console.log("Part 1: ", pScore[0]*diceRolls);
}else{
    console.log("Part 1: ", pScore[1]*diceRolls);
}


var prob = {};
let p = [input[0]-1,input[1]-1]; //Positon-1 for starting at index 0;
let s = [0,0];

function testWin(p1,p2,s1,s2){
    if(s1 >= 21){
        return [1,0];
    }
    if(s2>=21){
        return [0,1];
    }
    if(prob[`${p1},${p2},${s1},${s2}`]!=undefined){
        return prob[`${p1},${p2},${s1},${s2}`];
    }
    let outcome = [0,0];
    for(let dice1=1; dice1<4; dice1++){
        for(let dice2=1; dice2<4; dice2++){
            for(let dice3=1; dice3<4; dice3++){
                let newPos = (p1+dice1+dice2+dice3)%10;
                let newScore = s1+newPos+1;
                let result = testWin(p2,newPos,s2,newScore);
                outcome=[outcome[0]+result[1],outcome[1]+result[0]];
            }
        }
    }
    prob[`${p1},${p2},${s1},${s2}`]=outcome;
    return outcome;
}
console.log("Part 2: ", Math.max(...testWin(p[0],p[1],s[0],s[1])));