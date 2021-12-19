const file = require("../utils/import");
let text = file.getInput("day19.txt");
let read = text.split("\r\n");

function subtract(a,b){
    return {x:a.x-b.x, y:a.y-b.y, z:a.z-b.z}
}

function abs(a){
    return {x:Math.abs(a.x),y:Math.abs(a.y),z:Math.abs(a.z)}
}

function absCompare(a,b){
    return Math.abs(a)==Math.abs(b);
}

class Beacon {
    relatives = []
    constructor(x, y, z, id) {
        this.x = x
        this.y = y
        this.z = z
        this.id = id
    }

    orient(beacon) {
        const d = abs(subtract(this, beacon));
        this.relatives[beacon.id] = beacon.relatives[this.id] = [
            Math.hypot(d.x, d.y, d.z).toFixed(5),
            Math.min(d.x, d.y, d.z),
            Math.max(d.x, d.y, d.z)
        ].join(",")
    }

    compare(beacon) {
        const result = []
        for (let relative of this.relatives) {
            const index = beacon.relatives.indexOf(relative)
            if (index > -1)
                result.push([beacon.relatives[index], this.relatives.indexOf(relative), index])
        }
        return result
    }
}

class Scanner {
    beacons = []

    addBeacon(x, y, z) {
        const newBeacon = new Beacon(x, y, z, this.beacons.length)
        for (let beacon of this.beacons) {
            beacon.orient(newBeacon)
        }
        this.beacons.push(newBeacon)
    }

    compare(scanner) {
        let max = 0
        for (let dest of scanner.beacons) {
            for (let pos of this.beacons) {
                const intersection = dest.compare(pos)
                if (intersection.length >= 11) {
                    return {dest, pos, intersection}
                }
            }
        }
    }

    orient(scanner, data) {
        for (let line of data.intersection) {
            if (line[0].split(",")[1] === "0")
                continue
            const relativepos = this.beacons[line[2]]
            const d0 = subtract(data.pos, relativepos);

            const relativedest = scanner.beacons[line[1]]
            const d1 = subtract(data.dest, relativedest);
            if (absCompare(d0.x,d0.y) || absCompare(d0.z,d0.y) || absCompare(d0.x,d0.z))
                continue

            const map = [{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}]

            if (d0.x === d1.x)
                map[0].x = 1
            else if (d0.x === -d1.x)
                map[0].x = -1
            if (d0.x === d1.y)
                map[0].y = 1
            else if (d0.x === -d1.y)
                map[0].y = -1
            if (d0.x === d1.z)
                map[0].z = 1
            else if (d0.x === -d1.z)
                map[0].z = -1
            if (d0.y === d1.x)
                map[1].x = 1
            else if (d0.y === -d1.x)
                map[1].x = -1
            if (d0.y === d1.y)
                map[1].y = 1
            else if (d0.y === -d1.y)
                map[1].y = -1
            if (d0.y === d1.z)
                map[1].z = 1
            else if (d0.y === -d1.z)
                map[1].z = -1
            if (d0.z === d1.x)
                map[2].x = 1
            else if (d0.z === -d1.x)
                map[2].x = -1
            if (d0.z === d1.y)
                map[2].y = 1
            else if (d0.z === -d1.y)
                map[2].y = -1
            if (d0.z === d1.z)
                map[2].z = 1
            else if (d0.z === -d1.z)
                map[2].z = -1

            for (let beacon of scanner.beacons) {
                const old = {
                    x : beacon.x,
                    y : beacon.y,
                    z : beacon.z,
                }
                beacon.x = old.x * map[0].x + old.y * map[0].y + old.z * map[0].z;
                beacon.y = old.x * map[1].x + old.y * map[1].y + old.z * map[1].z;
                beacon.z = old.x * map[2].x + old.y * map[2].y + old.z * map[2].z;
            }
            scanner.position = {
                x : data.pos.x - data.dest.x,
                y : data.pos.y - data.dest.y,
                z : data.pos.z - data.dest.z,
            }
            for (let beacon of scanner.beacons) {
                beacon.x += scanner.position.x
                beacon.y += scanner.position.y
                beacon.z += scanner.position.z
            }
            break
        }
    }
}

class Solver {
    scanners = []
    constructor(data) {
        let scanner
        for (let input of data) {
            if (input.length === 0)
                continue
            if (input.indexOf("---")>=0) {
                scanner = new Scanner()
                this.scanners.push(scanner)
                continue
            }
            scanner.addBeacon(...input.split(",").map((x)=>Number(x)));
        }
    }

    orient() {
        const locked = new Set([0])
        this.scanners[0].position = {x : 0, y : 0, z : 0}
        while (locked.size < this.scanners.length) {
            for (let i = 0; i < this.scanners.length; i++) {
                for (let j = 0; j < this.scanners.length; j++) {
                    if (i === j || !locked.has(i) || locked.has(j))
                        continue
                    let intersection = this.scanners[i].compare(this.scanners[j])
                    if (!intersection)
                        continue
                    this.scanners[i].orient(this.scanners[j], intersection)
                    locked.add(j)
                }
            }
        }
    }
    
    part1() {
        this.orient()
        const beacons = new Set()
        for (let scanner of this.scanners)
            for (let beacon of scanner.beacons)
                beacons.add([beacon.x,beacon.y,beacon.z].join(","))

        return beacons.size
    }
    
    part2() {
        let max = 0;
        for (let pos of this.scanners)
            for (let dest of this.scanners)
                max = Math.max(max, Math.abs(dest.position.x - pos.position.x) + Math.abs(dest.position.y - pos.position.y) + Math.abs(dest.position.z - pos.position.z))
        return max
    }
}

let solve =  new Solver(read);
console.log("Part 1: ", solve.part1());
console.log("Part 2: ", solve.part2());