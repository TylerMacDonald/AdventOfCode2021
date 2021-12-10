const file = require("../import");
let text = file.getInput("day4.txt");
let input = text.split("\r\n");

let counts = [0];
let countBoard = 0;
let boardWinners = [false];
let board = [];
let called = [];
let current = [];
let currentCalled = [];
let numbers = input[0].split(',').map(x=>Number(x));
let rowcount = 0;

//Parse Board from Input and keep track of wins and calls.
for(let i=2; i<input.length; i++){
    if(rowcount==5){
        board.push([...current]);
        called.push([...currentCalled]);
        current = [];
        currentCalled = [];
        countBoard++;
        counts[countBoard] = 0;
        boardWinners[countBoard] = false;
        rowcount = 0;
    }else{
        let rowNums = [];
        for(let x=1; x<input[i].length; x+=3){
            let parsedNumber = Number((input[i][x-1]+input[i][x]).trim());
            rowNums.push(parsedNumber);
            counts[countBoard]+=parsedNumber;
        }
        current.push([...rowNums]);
        currentCalled.push([0,0,0,0,0]);
        rowcount++;
    }
}
board.push([...current]);
called.push([...currentCalled]);
let winner = false; // part 1 finished.
let final = false; // part 2 finished.

//Find check if number is on a card, mark called, and subtrack from uncalled sums.
for(let num=0; num<numbers.length; num++){ //Cycle through numbers
    if(final){
        break;
    }
    for(let i=0; i<board.length; i++){ //Cycle Boards
        for(let y=0; y<board[i].length; y++){ // Cycle Rows
            for(let x=0; x<board[i][y].length; x++){ //Cycle Columns
                if(board[i][y][x]==numbers[num] && called[i][y][x]==0){
                    called[i][y][x]=1; //Mark Number called
                    counts[i]-=numbers[num]; //Subtrack from uncalled sum.
                }
            }
        }

        if(!boardWinners[i]){ //Stop checking for winner when a board has won.
            if(checkBoardForWin(called[i])){ //Check for winner.
                boardWinners[i]=true; //Set board as a winner for part 2.
                //If this is the first winner, return for part 1.
                if(!winner){ 
                    winner=true;
                    console.log("Part 1:", (counts[i]*numbers[num]));
                }
                //if this is the last winner, return part 2.
                if(boardWinners.filter(x => !x).length==0){
                    final = true;
                    console.log("Part 2:", (counts[i]*numbers[num]));
                }
            }
        }
        
    }
}


//Check if the board has won.
function checkBoardForWin(c){
    let sumrow = 0;
    let sumcol = 0;
    for(let y=0; y<5; y++){
        sumrow=0;
        sumcol=0;
        for (let x=0; x<5; x++){
            sumrow+=c[y][x];
            sumcol+=c[x][y];
        }
        if(sumrow==5||sumcol==5){
            return true;
        }
    }
    return false;
}