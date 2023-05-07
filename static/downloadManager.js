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
    return csv;
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
    //https://stackoverflow.com/a/14966131
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(downloadable);
    hiddenElement.target = '_blank';
    
    //provide the name for the CSV file to be downloaded
    hiddenElement.download = '5geo_map.csv';
    hiddenElement.click();
}

function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph' has not been implemented, please fill the function before removing this warning");
    downloadable = ConvertToCSV(graphData);
    //https://stackoverflow.com/a/14966131
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(downloadable);
    hiddenElement.target = '_blank';
    
    //provide the name for the CSV file to be downloaded
    hiddenElement.download = '5geo_graph.csv';
    hiddenElement.click();
}