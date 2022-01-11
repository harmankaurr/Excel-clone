let sheetDB = [];
rows = 100;
cols = 26; 

for(let i = 0; i<rows; i++){
    let sheetRow = [];
    for(let j = 0; j<cols; j++){
      let cellProp = {
          bold: false,
          italic: false,
          underline: false,
          fontFamily: "monospace",
          fontSize: "14",
          alignment: "left",
          fontColor: "#000000",
          BGcolor: "#000000",
          value: "",
          formula: "",
      }

        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}


let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let backgroundColor = document.querySelector(".background-color-prop");
let fontColor = document.querySelector(".font-color-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];



let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ececec";

//two way binding
//property listeners
bold.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellandCellProp(address);

    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold? activeColorProp : inactiveColorProp;
})

italic.addEventListener("click", (e)=>{
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.italic = !cellProp.italic;
  cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
  italic.style.backgroundColor = cellProp.italic? activeColorProp : inactiveColorProp;
})

underline.addEventListener("click", (e)=>{
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.underline = !cellProp.underline;
  cell.style.textDecoration = cellProp.underline ? "underline" : "none";
  underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.fontSize = fontSize.value;
  cell.style.fontSize = cellProp.fontSize+ "px";
  fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.fontFamily = fontFamily.value;
  cell.style.fontFamily = cellProp.fontFamily;
  fontFamily.value = cellProp.fontFamily;

})

fontColor.addEventListener("change", (e) =>{
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.fontColor = fontColor.value;
  cell.style.color = cellProp.fontColor;
  fontColor.value = cellProp.fontColor;
})

backgroundColor.addEventListener("change", (e) =>{
  let address = addressBar.value;
  let [cell, cellProp] = getCellandCellProp(address);

  cellProp.backgroundColor = backgroundColor.value;
  cell.style.backgroundColor = cellProp.backgroundColor;
  backgroundColor.value = cellProp.backgroundColor;
})

alignment.forEach((alignElem)=>{
  alignElem.addEventListener("click", (e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellandCellProp(address);

    let alignValue = e.target.classList[0];
    cellProp.alignment = alignValue;
    cell.style.textAlign = cellProp.alignment;

    switch(alignValue){
      case "left" :
     leftAlign.style.backgroundColor = activeColorProp;
     centerAlign.style.backgroundColor = inactiveColorProp;
     rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
     centerAlign.style.backgroundColor = activeColorProp;
     rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
     centerAlign.style.backgroundColor = inactiveColorProp;
     rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
   
  })
})

let allCells = document.querySelectorAll(".cell");

for(let i = 0; i<allCells.length; i++){
  eventListenerforCellProps(allCells[i]);
}

function eventListenerforCellProps(cell){

  cell.addEventListener("click", (e) =>{
    let address = addressBar.value;
    let [rid, cid] = decode(address);
    let cellProp = sheetDB[rid][cid];

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize+ "px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.color = cellProp.fontColor;
    cell.style.backgroundColor = cellProp.backgroundColor;
    cell.style.textAlign = cellProp.alignment;
    
   

    bold.style.backgroundColor = cellProp.bold? activeColorProp : inactiveColorProp;
    italic.style.backgroundColor = cellProp.italic? activeColorProp : inactiveColorProp;
    underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;
    fontColor.value = cellProp.fontColor;
    backgroundColor.value = cellProp.backgroundColor=== "#000000"  ? "transparent" : cellProp.backgroundColor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;

    switch(cellProp.alignment){
      case "left" :
     leftAlign.style.backgroundColor = activeColorProp;
     centerAlign.style.backgroundColor = inactiveColorProp;
     rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "center":
        leftAlign.style.backgroundColor = inactiveColorProp;
     centerAlign.style.backgroundColor = activeColorProp;
     rightAlign.style.backgroundColor = inactiveColorProp;
        break;
      case "right":
        leftAlign.style.backgroundColor = inactiveColorProp;
     centerAlign.style.backgroundColor = inactiveColorProp;
     rightAlign.style.backgroundColor = activeColorProp;
        break;
    }
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.value;
    cell.value = cellProp.value;
  })
}

function getCellandCellProp(address){
     let [rid, cid] = decode(address);
     //Access cell and storage
     let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
     let cellProp = sheetDB[rid][cid];
     return [cell, cellProp];
}

function decode(address){
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0))-65;
    return [rid,cid];

}



