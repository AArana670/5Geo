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
    const traceList = Object.entries(freqDivision).map(([freq, signals]) => {
        const timeline = new Set();
        const meanDBm = new Map();
    
        signals.forEach(signal => {
            timeline.add(signal.moment);
            if (!meanDBm.has(signal.moment)) {
                meanDBm.set(signal.moment, { sum: 0, count: 0 });
            }
            const entry = meanDBm.get(signal.moment);
            entry.sum += signal.dBm;
            entry.count++;
        });
    
        const x = Array.from(timeline);
        const y = x.map(time => meanDBm.get(time).sum / meanDBm.get(time).count);
    
        return {
            x,
            y,
            type: 'scatter',
            name: freq + 'MHz',
        };
    });

    var layout = {
        //title: "Emisión EM en "+lat+", "+lng,
        xaxis:{  //https://plotly.com/python/range-slider/
            rangeslider:{
                visible:true
            },
            type:"date"
        }
        /*plot_bgcolor:"#303030",
        paper_bgcolor:"#FFF3"*/
    };
      
  
  Plotly.newPlot('timeEvo', traceList, layout);
}



function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph()' has not been implemented, please fill the function before removing this warning");

}