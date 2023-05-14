xMin;
xMax;

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
    var shownTraces = [];
    for (let i = 0; i < plotDiv.data.length; i++) {
        if (plotDiv.data[i].visible) {
            shownTraces.push(plotDiv.data[i]);
        }
    }

    filteredData = shownTraces.filter(trace => trace.x < xMax && trace.x > xMin);
    setZoomedData(filteredData);
    
    dBmList = filteredData.map(trace => trace.y);

    min = calcQuartile(dBmList, 0);
    max = calcQuartile(dBmList, 100);
    median = calcQuartile(dBmList, 50);
    p10 = calcQuartile(dBmList, 10);
    p90 = calcQuartile(dBmList, 90);

    console.log("min: " + min + ", p10: " + p10 + ", median: " + median + ", p90: " + p90 + ", max: " + max);
}