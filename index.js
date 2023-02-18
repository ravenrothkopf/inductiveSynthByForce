let count = 0
let input
let isSolution = false

function synth(){
    reset()
    let searchSpace = ["input"]
    const lang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ops = [" + ", " - ", " * ", " / "]
    const inputs = document.getElementById("input").value.split(',')
    const outputs = document.getElementById("output").value.split(',')
    document.getElementById("function").innerHTML += findFunc(searchSpace, inputs, outputs, lang, ops)
}

//adapted from armando's algorithm!
function findFunc(searchSpace, inputs, outputs, lang, ops) {
    while (count < 3) {
        grow(searchSpace, lang, ops)
        //iterates through our inputs and outputs and evaluates them against every function in our search space until it finds one that works.
        //if it finds a function that works, it will immediately stop and return that function
        for (const func of searchSpace){
            if (func !== "input"){
                for (let i = 0; i < inputs.length; i++){
                    input = parseInt(inputs[i])
                    if (eval(func) === parseInt(outputs[i])) {
                        isSolution = true
                    }
                    else {
                        isSolution = false
                        break;
                    }
                }
                //if eval is true for all inputs
                if (isSolution){
                    return func
                }
            }
        }
        count++
    }
    return "failure: timeout"
}

function grow(searchSpace, lang, ops) {
    //add operations from our grammar to create non-terminals
    searchSpace.forEach((func) => {
        lang.forEach((term) => {
            ops.forEach((op) => {
                if (op === " - " || (op === " / " && term !== 0)) {
                    searchSpace.push("(" + func + ")" + op + term)
                }
                searchSpace.push(term + op + "(" + func + ")")
            })
        })
    })
}

function reset(){
    count = 0
    isSolution = false
    document.getElementById("function").innerHTML = ""
}