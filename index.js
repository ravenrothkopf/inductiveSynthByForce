let input = 0
let output = 0
let count = 0
let searchSpace = []
let functions = []
let script = document.createElement("script");
script.setAttribute("id", "synth_script");
document.body.appendChild(script);

function synth(){
    count = 0
    document.getElementById("function").innerHTML = ""
    searchSpace = []
    functions = []
    script.text = ""

    document.getElementById("function").innerHTML = ""

    input = parseInt(document.getElementById("input").value)
    output = parseInt(document.getElementById("output").value)
    console.log(input)
    console.log(output)
    findFunc()
    document.getElementById("function").innerHTML += (functions[0] + "<br>")
}

function findFunc() {
    for (let i = 1; i < 10; i++){
        searchSpace.push("input + " + i)
        searchSpace.push("input - " + i)
        searchSpace.push("input * " + i)
        searchSpace.push("input / " + i)
        searchSpace.push(i + ' - input')
        if (input !== 0){
            searchSpace.push(i + ' / input')
        }
    }
    searchSpace.every((func) => {
        // console.log(func)
        script.text = "function eval(" + func + "){\n let out = " + func + "\nreturn out}";
        // console.log(output)
        if (eval(func) === output) {
            functions.push(func)
            return false
        }
        return true
    })

    //if we haven't found a solution in the first round
    if (functions.length === 0){
        while (count < 2) {
            grow()
            searchSpace.every((func) => {
                console.log(func)
                script.text = "function eval(" + func + "){\n let out = " + func + "\nreturn out}";
                if (eval(func) === output) {
                    functions.push(func)
                    return false
                }
                return true
            })
            count++
        }
    }
    functions.push("no solutions found")
}

function grow () {
    if (searchSpace.length !== 0){
        searchSpace.forEach((func) => {
            for (let i = 0; i < 10; i++){
                searchSpace.push("( " + func + " ) / " + i)
                searchSpace.push("( " + func + " ) * " + i)
                searchSpace.push("( " + func + ") + " + i)
                searchSpace.push("( " + func + " ) - " + i)
                searchSpace.push(i + " - (" + func + ")")
                searchSpace.push(i + " / (" + func + ")")
                // if (func.includes("+") || func.includes("-")){
                //     searchSpace.push("( " + func + " ) / " + i)
                //     searchSpace.push("( " + func + " ) * " + i)
                // }
                // else if (func.includes("*") || func.includes("/")) {
                //     searchSpace.push("( " + func + ") + " + i)
                //     searchSpace.push("( " + func + " ) - " + i)
                // }
            }
        })
    }
}


// function eval(ins, out) {
//     if (ins > out){
//         let subs = sub(ins, out)
//         if (out !== 0){
//             let divs = ins / out
//             functions.push("- " + subs, "/ " + divs)
//         }
//         else {
//             functions.push("- " + subs)
//         }
//     }
//     else if (ins < out) {
//         let subs = sub(out, ins)
//         if (ins !== 0){
//             let divs = div(out, ins)
//             functions.push("+ " + subs, "* " + divs)
//         }
//         else {
//             functions.push("+ " + subs)
//         }
//
//     }
//     if (ins === out){
//         functions.push("+ 0", "- 0")
//     }
// }
//
// // function eval(op, result) {
// //     let prevSynthesized = document.getElementById("synth_script");
// //     if(prevSynthesized) {
// //         prevSynthesized.remove();
// //     }
// //
// //     func = op + '= ' + result
// //
// //     let script = document.createElement("script");
// //     script.text = "function unknown(input){\n input" + func + "\n return input}";
// //     script.setAttribute("id", "synth_script");
// //     document.body.appendChild(script);
// // }
// function sub(x, y){
//     return x - y
// }
//
// function div(x, y){
//     return Math.floor(x / y)
// }
//
// function mult(x, y){
//     return x * y
// }
//
// //collect all valid functions in an array
// //loop through that array on every input and only keep the functions that work for all inputs
//
