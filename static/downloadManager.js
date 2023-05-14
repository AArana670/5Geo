function convertToCSV (data) {  //https://stackoverflow.com/a/61928233
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

function setZoomedData(data){
    zoomedData = data;
}

function downloadMap(){  //https://stackoverflow.com/a/14966131
    downloadable = convertToCSV(mapData);
    
    //create a link with the .csv and click it programmatically
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(downloadable);
    hiddenElement.target = '_blank';
    hiddenElement.download = '5geo_map.csv';
    hiddenElement.click();
}

function downloadGraph(){  //https://stackoverflow.com/a/14966131
    downloadable = convertToCSV(zoomedData);
    
    //create a link with the .csv and click it programmatically
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(downloadable);
    hiddenElement.target = '_blank';
    hiddenElement.download = '5geo_graph.csv';
    hiddenElement.click();
}