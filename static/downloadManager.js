function ConvertToCSV (data) {
    if (!data || data.length === 0) {
      console.log("data was empty");
      return;
    }
    let csv = [Object.keys(data[0]).slice(0).join(",")];
    data.forEach(
      item => csv.push(
        Object.values(item).map(val => isNaN(val) ? '"'+val+'"':val).join(",")
      )
    )
    csv=csv.join("\n");
}

function setMapData(data){
    mapData = data;
}

function setGraphData(data){
    graphData = data;
}

function downloadMap(){
    console.warn("Incomplete method:", "The method 'downloadMap' has not been implemented, please fill the function before removing this warning");
    downloadable = ConvertToCSV(mapData);
    console.log(downloadable);
}

function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph' has not been implemented, please fill the function before removing this warning");
    downloadable = ConvertToCSV(graphData);
    console.log(downloadable);
}