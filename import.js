const fs = require("fs");

function getText(filename){
    if(filename.indexOf(".txt")<0){
        filename+=".txt";
    }
    let old = filename;
    if(fs.existsSync(filename)){
        return fs.readFileSync(filename).toString('utf-8');
    }else{
        filename = './'+filename;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8');
        }
        filename = './completed/'+old;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8');
        }
    }
    return "Unable to load file.";
}

exports.getInput = getText;