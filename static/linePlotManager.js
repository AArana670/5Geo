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

    console.time('Original Code');
    //turn the signal arrays into traces for the graph: https://stackoverflow.com/a/64168282
    var traceList = Object.entries(freqDivision).map(([freq, signals]) => {
        var timeline = [...new Set(signals.map(signal => signal.moment))];  //https://stackoverflow.com/a/35092559
        var meanDBm = timeline.map(time => signals.filter(signal => signal.moment == time))  //signals per time
                            .map(signalList => signalList.reduce((a, b) => a + b.dBm, 0)/signalList.length);

        return {
            x: timeline,
            y: meanDBm,
            type: 'scatter',
            name: freq+'Hz'
        };
    });
    console.timeEnd('Original Code');


    console.time('Alternative Code');
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
            name: freq + 'Hz',
        };
    });
    console.timeEnd('Alternative Code');
    
    
    var data = traceList;

    var layout = {
        //title: "Emisión EM en "+lat+", "+lng,
        xaxis:{  //https://plotly.com/python/range-slider/
            rangeslider:{
                visible:true
            },
            type:"date"
        }
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