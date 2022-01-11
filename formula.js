for(let i = 0; i<rows; i++){
    for(let j = 0; j<cols; j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
       window.onload=function(){
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [activeCell, cellProp] = getCellandCellProp(address);
            let enteredData = activeCell.innerText;
 
           
           if(enteredData === cellProp.value) return;
            cellProp.value = enteredData;
            
            removeChildfromParent(cellProp.formula);
            cellProp.formula = "";
            updateChildrenCells(address);
 
 
         })
       } 
    }
}

let formulaBar = document.querySelector(".formula-bar");

window.onload=function(){
    formulaBar.addEventListener("keydown", (e)=>{
    let inputFormula = formulaBar.value;

   if(e.key==="Enter" && inputFormula){

     let address = addressBar.value;
     let[cell, cellProp] = getCellandCellProp(address);
     if(inputFormula!=cellProp.formula) removeChildfromParent(cellProp.formula);
     addChildtoGraphComponent(inputFormula, address);
     let cyclicResponse = isCyclic(graphMatrix); 

     if(cyclicResponse){
        //  alert("Your formula is cyclic");
        let response = confirm("Your formula is cyclic. Do you want to trace your path?");
        while(response===true){
            isCyclicTracePath(graphMatrix, cyclicResponse);
            response = confirm("Your formula is cyclic. Do you want to trace your path?");
        }
         removeChildfromGraphComponent(inputFormula, address);
         return;
     }

     let evaluatedValue = evaluateFormula(inputFormula);


     setCellUIandCellProp(evaluatedValue, inputFormula, address);
     addChildtoParent(inputFormula);

     updateChildrenCells(address);
   }
})}


function addChildtoGraphComponent(formula, childAddress){
    let[crid, ccid] = decode(childAddress);
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let[prid, pcid] = decode(encodedFormula[i]);
            graphMatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

function removeChildfromGraphComponent(formula, childAddress){
    let[crid, ccid] = decode(childAddress);
    let encodedFormula = formula.split(" ");

    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let[prid, pcid] = decode(encodedFormula[i]);
            graphMatrix[prid][pcid].pop();
        }
    }
}

function updateChildrenCells(parentAddress){
 let [parentCell, parentCellProp] = getCellandCellProp(parentAddress);
 let children = parentCellProp.children;

 for(let i =0; i<children.length; i++){
     let childAddress = children[i];
     let [childCell, childCellProp] = getCellandCellProp(childAddress);
     let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setCellUIandCellProp(evaluatedValue, childFormula, childAddress);
    updateChildrenCells(childAddress);
 }

}



function addChildtoParent(formula){
    let childAddress = addressBar.value;
 let encodedFormula = formula.split(" ");
 for(let i = 0; i<encodedFormula.length; i++){
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if(asciiValue>=65 && asciiValue<=90){
        let[parentCell, parentCellProp] =  getCellandCellProp(encodedFormula[i]);
       parentCellProp.children.push(childAddress);
    }
 }
}

function removeChildfromParent(formula){
    let encodedFormula = formula.split(" ");
 let childAddress = addressBar.value;
 for(let i = 0; i<encodedFormula.length; i++){
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if(asciiValue>=65 && asciiValue<=90){
        let[parentCell, parentCellProp] =  getCellandCellProp(encodedFormula[i]);
       let idx = parentCellProp.children.indexOf(childAddress);
       parentCellProp.children.splice(idx,1);
    }
 }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0; i<encodedFormula.length; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
           let[cell, cellProp] =  getCellandCellProp(encodedFormula[i]);
           encodedFormula[i] = cellProp.value;
        }

    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}

function setCellUIandCellProp(evaluatedValue, formula, address){
    let [cell, cellProp] = getCellandCellProp(address);

    cell.innerText = evaluatedValue;

    cellProp.value = evaluatedValue;
    cellProp.formula = formula;
}