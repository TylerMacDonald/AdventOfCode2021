function mapToArray(map){
    let results = Object.keys(map).map((key)=>[key, map[key]]);
    return results;
}

function arrayToMap(arr){
    let map = {};
    for(let i=0; i<arr.length; i++){
        map[arr[i][0]]=arr[i][1];
    }
    return map;
}

function sortValueAsc(map,returnmap=true){
    let temp = mapToArray(map);
    temp.sort(function(x, y) {
        return y[1] - x[1]  
    });
    if(returnmap){
        return arrayToMap(temp);
    }else{
        return temp;
    }
}

function sortValueDesc(map,returnmap=true){
    let temp = mapToArray(map);
    temp.sort(function(x, y) {
        return x[1] - y[1]  
    });
    if(returnmap){
        return arrayToMap(temp);
    }else{
        return temp;
    }
}

function sortKeysAsc(map,returnmap=true){
    let temp = mapToArray(map);
    temp.sort(function(x, y) {
        return y[0] - x[0]  
    });
    if(returnmap){
        return arrayToMap(temp);
    }else{
        return temp;
    }
}

function sortKeysDesc(map,returnmap=true){
    let temp = mapToArray(map);
    temp.sort(function(x, y) {
        return x[0] - y[0]  
    });
    if(returnmap){
        return arrayToMap(temp);
    }else{
        return temp;
    }
}

function topKeys(map, number, stillmap=true){
    let temp = map;
    if(stillmap){
        temp = mapToArray(map);
    }
    return temp.slice(0,number).map(x=>x[0]);
}

function topValues(map, number, stillmap=true){
    let temp = map;
    if(stillmap){
        temp = mapToArray(map);
    }
    return temp.slice(0,number).map(x=>x[1]);
}

exports.sortValueAsc = sortValueAsc;
exports.sortValueDesc = sortValueDesc;
exports.sortKeysAsc = sortKeysAsc;
exports.sortKeysDesc = sortKeysDesc;
exports.topKeys = topKeys;
exports.topValues = topValues;