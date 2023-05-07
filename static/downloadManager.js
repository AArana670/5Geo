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
    console.log(downloadable);
    //https://stackoverflow.com/a/14966131
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "5Geo_map.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
}

function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph' has not been implemented, please fill the function before removing this warning");
    downloadable = ConvertToCSV(graphData);
    console.log(downloadable);
    //https://stackoverflow.com/a/14966131
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "5Geo_graph.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
}