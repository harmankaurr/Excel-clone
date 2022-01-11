function isCyclicTracePath(graphMatrix, cyclicResponse){
    let [srcr, srcc] = cyclicResponse;
    let visited = [];
    let dfsVisited = [];

    for(let i = 0; i<rows; i++){
        let visitedRow = [];
        let dfsVisitedRow = [];
        for(let j = 0; j<cols; j++){
            visitedRow.push(false);
            dfsVisited.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    // for(let i = 0; i<rows; i++){
    //     for(let j = 0; j<cols; j++){
    //         if(visited[i][j]=== false){
    //             let res =  dfsCycleDetection(graphMatrix, i, j, visited, dfsVisited);
    //             if(res==true) return true;
    //         }
    //     }
    // }

    let res =  dfsCycleDetection(graphMatrix, srcr, srcc, visited, dfsVisited);
    if(res===true) return true;
    return false;
}


//coloring for tracking
function dfsCycleDetectionTracePath(graphMatrix, srcr, srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`); 
    cell.style.backgroundColor = "lightblue";


    for(let children = 0; children<graphMatrix[srcr][srcc].length; children++){
        let [crid, ccid] = graphMatrix[srcr][srcc][children];
        if(visited[crid][ccid]===false){
          let res =  dfsCycleDetection(graphMatrix, crid, ccid, visited, dfsVisited);
          if(res===true){
              cell.style.backgroundColor = "transparent";
            return true;
          } 
        }
        else if(visited[crid][ccid]===true && dfsVisited[crid][ccid]===true) {
           let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`); 
           cyclicCell.style.backgroundColor = "lightsalmon";
           cyclicCell.style.backgroundColor = "transparent";
           return true;
    }
    }

    dfsVisited[srcr][srcc] = false;
 return false;
}