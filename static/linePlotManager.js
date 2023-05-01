function groupBy(arr, property) {  //https://stackoverflow.com/a/14696535
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

function displayGraph(graphData){

    freqDivision = groupBy(graphData, "freq");

    //fake timeline
    datasetX=[]
    for (var i=0; i<60; i++) {
        if (i<10){
            datasetX.push("10:0"+i);
        }else{
            datasetX.push("10:"+i);
        }
    }

    //random data for testing
    datasetY=[]
    for (var i=0; i<60; i++) {
        datasetY.push(-(Math.random()*80+40));
    }

    console.log(freqDivision);


    var trace1 = {
        x: datasetX,
        y: datasetY,
        type: 'scatter',
        name: "Señal 1"
        };
    
    var data = [trace1];

    var layout = {
        //title: "Emisión EM en "+lat+", "+lng,
        /*plot_bgcolor:"#303030",
        paper_bgcolor:"#FFF3"*/
    }
  
  Plotly.newPlot('timeEvo', data, layout);
}



function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph()' has not been implemented, please fill the function before removing this warning");

}