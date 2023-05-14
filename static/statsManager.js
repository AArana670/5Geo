function calcQuartile(arr, q) {  //https://snippets.bentasker.co.uk/page-1907020841-Calculating-Mean,-Median,-Mode,-Range-and-Percentiles-with-Javascript-Javascript.html
    var a = arr.slice();
    q = q / 100;
    data = a.sort((a, b) => a - b);
    var p = (data.length - 1) * q;
    var b = Math.floor(p);
    var remainder = p - b;

    if (data[b + 1] !== undefined) {
        return parseFloat(data[b]) + remainder * (parseFloat(data[b + 1]) - parseFloat(data[b]));
    } else {
        return parseFloat(data[b]);
    }
}

function setRange(e){
    xMin = e['xaxis.range[0]'];
    xMax = e['xaxis.range[1]'];
}

function refreshStatistics(){
    /*var shownTraces = [];
    for (let i = 0; i < plotDiv.data.length; i++) {
        if (plotDiv.data[i].visible) {
            shownTraces.push(plotDiv.data[i]);
        }
    }*/

    shownData = graphData.filter(signal => signal["moment"] < xMax && signal["moment"] > xMin);
    setZoomedData(shownData);
    
    dBmList = shownData.map(signal => signal["dBm"]);

    min = calcQuartile(dBmList, 0);
    max = calcQuartile(dBmList, 100);
    median = calcQuartile(dBmList, 50);
    p10 = calcQuartile(dBmList, 10);
    p90 = calcQuartile(dBmList, 90);

    document.getElementById("min").innerHTML="Mínimo: " + min;
    document.getElementById("p10").innerHTML="Percentil 10: " + p10;
    document.getElementById("median").innerHTML="Mediana: " + median;
    document.getElementById("p90").innerHTML="Percentil 90: " + p90;
    document.getElementById("max").innerHTML="Máximo: " + max;
}