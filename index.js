let count = 0
let input = 0
let output = 0
let searchSpace = []
let functions = []
let inputs = []
let outputs = []
let script = document.createElement("script");
script.setAttribute("id", "synth_script");
document.body.appendChild(script);
let isSolution = false

function synth(){
    reset()
    inputs = document.getElementById("input").value.split(',')
    outputs = document.getElementById("output").value.split(',')
    for (let i = 0; i < inputs.length; i++){
        inputs[i] = parseInt(inputs[i])
        outputs[i] = parseInt(outputs[i])
    }
    findFunc()
    document.getElementById("function").innerHTML += (functions[0] + "<br>")
}

//adapted from armando's algorithm without checking for equivalency!
function findFunc() {
    //add terminals to our search space
    for (let i = 1; i < 10; i++){
        searchSpace.push("input + " + i)
        searchSpace.push("input - " + i)
        searchSpace.push("input * " + i)
        //this is ugly but how I'm accounting for integer division!
        searchSpace.push("Math.floor(input / " + i + ")")
        searchSpace.push("Math.floor(" + i + "/ input)")
        searchSpace.push(i + ' - input')
    }
    //set the search space to only go three layers deep and then timeout cause otherwise it
    //takes too long without pruning equivalence!
    while (count < 2) {
        grow()
        //iterates through our inputs and outputs and evaluates them against
        //every function in our search space until it finds one that works.
        //if it finds a function that works, it will immediately stop and return that function
        searchSpace.every((func) => {
            for (let i = 0; i < inputs.length; i++){
                input = inputs[i]
                //create new eval func with given function
                script.text = "function eval(" + func + "){\n let out = " + func + "\nreturn out}";
                if (eval(func) === outputs[i]) {
                    isSolution = true
                }
                else {
                    isSolution = false
                    break;
                }
            }
            //if eval is true for all inputs
            if (isSolution){
                functions.push(func)
                return false
            }
            return true
        })
        count++
    }
    functions.push("failure: timeout")
}

function grow () {
    //add operations from our grammar to create nonterminals
    if (searchSpace.length !== 0){
        searchSpace.forEach((func) => {
            for (let i = 1; i < 10; i++){
                searchSpace.push("Math.floor(( " + func + " ) / " + i + ")")
                searchSpace.push("( " + func + " ) * " + i)
                searchSpace.push("( " + func + ") + " + i)
                searchSpace.push("( " + func + " ) - " + i)
                searchSpace.push(i + " - ( " + func + " )")
                searchSpace.push("Math.floor( " + i + "  / (" + func + "))")
            }
        })
    }
}

function reset(){
    count = 0
    document.getElementById("function").innerHTML = ""
    searchSpace = []
    functions = []
    inputs = []
    outputs = []
    input = 0
    output = 0
    script.text = ""
    isSolution = false
    document.getElementById("function").innerHTML = ""
}