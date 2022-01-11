let graphMatrix = [];

for(let i = 0; i<rows; i++){
    let row = [];
    for(let j = 0; j<cols; j++){
      row.push([]);
    }
    graphMatrix.push(row);
}
console.log(graphMatrix);
function isCyclic(graphMatrix){
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

    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            if(visited[i][j]=== false){
                console.log("graph = ", graphMatrix);
                let res =  dfsCycleDetection(graphMatrix, i, j, visited, dfsVisited);
                if(res==true) return [i, j];
            }
        }
    }
    return null;
}


function dfsCycleDetection(graphMatrix, srcr, srcc, visited, dfsVisited){
    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;
    console.log(graphMatrix);
    for(let children = 0; children<graphMatrix[srcr][srcc].length; children++){
        let [crid, ccid] = graphMatrix[srcr][srcc][children];
        if(visited[crid][ccid] === false){
          let res =  dfsCycleDetection(graphMatrix, crid, ccid, visited, dfsVisited);
          if(res===true) return true;
        }
        else if(visited[crid][ccid]===true && dfsVisited[crid][ccid]===true) {
            return true;
    }
    }

    dfsVisited[srcr][srcc] = false;
 return false;
}