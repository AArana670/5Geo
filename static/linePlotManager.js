const plotDiv = document.getElementById('timeEvo');

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
        const signalInfo = new Map();
    
        signals.forEach(signal => {
            timeline.add(signal.moment);
            if (!meanDBm.has(signal.moment)) {
                meanDBm.set(signal.moment, { sum: 0, count: 0 });
            }
            const entry = meanDBm.get(signal.moment);
            entry.sum += signal.dBm;
            entry.count++;

            if (signal.operator)
                signalInfo.set(signal.moment, "cId: " + signal.cId + "\n operadora: " + signal.operator);
            else
                signalInfo.set(signal.moment, "cId: " + signal.cId);
        });
    
        const x = Array.from(timeline);
        const y = x.map(time => meanDBm.get(time).sum / meanDBm.get(time).count);
        const info = x.map(time => signalInfo.get(time));
    
        return {
            x,
            y,
            text: info,
            type: 'scatter',
            name: freq + 'MHz',
        };
    });

    var layout = {
        //title: "Emisión EM en "+lat+", "+lng,
        xaxis:{  //https://plotly.com/python/range-slider/
            rangeselector:{
                buttons:[
                    {step:"all"},
                    {count:1,
                         label:"1m",
                         step:"month",
                         stepmode:"backward"},
                    {count:6,
                         label:"1d",
                         step:"day",
                         stepmode:"backward"},
                    {count:1,
                         label:"1h",
                         step:"hour",
                         stepmode:"backward"}
                ]
            },
            rangeslider:{
                visible:true
            },
            type:"date"
        }
        /*plot_bgcolor:"#303030",
        paper_bgcolor:"#FFF3"*/
    };
      
  
  Plotly.newPlot(plotDiv, traceList, layout);
  
}

plotDiv.on('plotly_relayout', e => refreshStatistics(e));