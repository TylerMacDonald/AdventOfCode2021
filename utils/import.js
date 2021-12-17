const fs = require("fs");

function getText(filename){
    if(filename.indexOf(".txt")<0 && filename.indexOf(".js")<0){
        filename+=".txt";
    }
    let old = filename;
    if(fs.existsSync(filename)){
        return fs.readFileSync(filename).toString('utf-8').trim();
    }else{
        filename = './'+old;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8').trim();
        }
        filename = './Completed/'+old;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8').trim();
        }
    }
    return "Unable to load file.";
}

exports.getInput = getText;