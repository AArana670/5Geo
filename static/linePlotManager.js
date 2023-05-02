function groupBy(arr, property) {  //https://stackoverflow.com/a/14696535
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) { memo[x[property]] = []; }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

function displayGraph(graphData){

    //group the signals by frequency
    var freqDivision = groupBy(graphData, "freq");

    //turn the signal arrays into traces for the graph: https://stackoverflow.com/a/64168282
    traceList = Object.entries(freqDivision).map(([freq, signals]) => {
        var timeline = [...new Set(signals.map(signal => signal.moment))];  //https://stackoverflow.com/a/35092559
        var signalsPerTime = timeline.map(time => signals.filter(signal => signal.moment == time));
        console.log(signalsPerTime);
        var meanDBm = signalsPerTime.map(signalList => signalList.reduce((a, b) => a + b.dBm, 0)/signalList.length);
        console.log(meanDBm);

        return {
            x: timeline,
            y: dBmList,
            type: 'scatter',
            name: freq+'Hz'
        };
    });

    //fake timeline
    /*datasetX=[]
    for (var i=0; i<60; i++) {
        if (i<10){
            datasetX.push("10:0"+i);
        }else{
            datasetX.push("10:"+i);
        }
    }*/

    //random data for testing
    /*datasetY=[]
    for (var i=0; i<60; i++) {
        datasetY.push(-(Math.random()*80+40));
    }*/

    console.log(traceList);


    /*var trace1 = {
        x: datasetX,
        y: datasetY,
        type: 'scatter',
        name: "Señal 1"
        };*/
    
    var data = traceList;

    var layout = {
        //title: "Emisión EM en "+lat+", "+lng,
        /*yaxis: {
            range: [-140, -44],
            type: 'linear'
        }*/
        /*plot_bgcolor:"#303030",
        paper_bgcolor:"#FFF3"*/
    };
      
  
  Plotly.newPlot('timeEvo', data, layout);
}



function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph()' has not been implemented, please fill the function before removing this warning");

}