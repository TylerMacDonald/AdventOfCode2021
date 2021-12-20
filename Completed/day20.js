const file = require("../utils/import");
let text = file.getInput("day20.txt");
input = text.split('\r\n');
let alg = input[0];
alg = alg.split('').map((char) => +(char === '#'));
let img = [];
for(let i=2; i<input.length; i++){
    img.push(input[i]);
}
img = img.map((row) => row.split('').map((char) => +(char === '#')));
for (let t = 0; t < 50; t++) {
    const nextImg = [];
    for (let i = -1; i < img.length + 1; i++) {
        const nextImgRow = [];
        for (let j = -1; j < img.length + 1; j++) {
            const pixels = [];
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    pixels.push(img[i + di]?.[j + dj] ?? (alg[0] && t % 2));
                }
            }
            const num = parseInt(pixels.join(''), 2);
            nextImgRow.push(alg[num]);
        }
        nextImg.push(nextImgRow);
    }
    img = nextImg;
    if(t==1){
        console.log("Part 1:",img.flat().filter(Boolean).length);
    }
}
console.log("Part 2 :", img.flat().filter(Boolean).length);