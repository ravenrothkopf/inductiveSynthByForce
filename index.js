let count = 0
let input
let output

function synth(){
    reset()
    let searchSpace = ["input"]
    const lang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ops = [" + ", " - ", " * ", " / "]
    const inputs = document.getElementById("input").value.split(',')
    const outputs = document.getElementById("output").value.split(',')
    input = parseInt(inputs[0])
    output = parseInt(outputs[0])
    document.getElementById("function").innerHTML += findFunc(searchSpace, lang, ops)
}

//adapted from armando's algorithm!
function findFunc(searchSpace, lang, ops) {
    const outputsSeen = new Set()
    while (count < 6) {
        grow(searchSpace, lang, ops)
        //iterates through our inputs and outputs and evaluates them against every function in our search space until it finds one that works.
        //if it finds a function that works, it will immediately stop and return that function
        const newSpace = []
        for (const func of searchSpace){
            if (func !== "input"){
                if (eval(func) === output) { return func }
                else { elimEquivalents(newSpace, func, outputsSeen) }
            }
        }
        searchSpace = newSpace
        count++
    }
    return "failure: timeout"
}

function grow(searchSpace, lang, ops) {
    //add operations from our grammar to create non-terminals
    searchSpace.forEach((func) => {
        lang.forEach((term) => {
            ops.forEach((op) => {
                //integer division
                if (op === " / " && term !== 0){
                    searchSpace.push("Math.floor((" + func + ")" + op + term + ")")
                    searchSpace.push("Math.floor( " + term + op + "(" + func + "))")
                }
                else {
                    if (op === " - ") {
                        searchSpace.push("(" + func + ")" + op + term)
                    }
                    searchSpace.push(term + op + "(" + func + ")")
                }
            })
        })
    })
}

function elimEquivalents(newSpace, func, outputsSeen){
    let equiv = false
    let res = eval(func)
    if (outputsSeen.length !== 0){
        if (outputsSeen.has(res)) {
            equiv = true
        }
        if (!equiv){
            newSpace.push(func)
            console.log(res)
            outputsSeen.add(res)
        }
    }
    else { newSpace.push(func); outputsSeen.add(res) }
}

function reset(){
    count = 0
    document.getElementById("function").innerHTML = ""
}