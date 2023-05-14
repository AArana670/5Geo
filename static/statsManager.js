function calcQuartile(arr, q) {
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

function refreshStatistics(e){
    var xMin = e['xaxis.range[0]'];
    var xMax = e['xaxis.range[1]'];

    shownData = graphData.filter(signal => signal["moment"] < xMax && signal["moment"] > xMin);
    setZoomedData(shownData);
    
    dBmList = shownData.map(signal => signal["dBm"]);

    min = Math.min(dBmList);
    max = Math.max(dBmList);
    median = calcQuartile(dBmList, 50);
    p10 = calcQuartile(dBmList, 10);
    p90 = calcQuartile(dBmList, 90);

    console.log("min: " + min + ", p10: " + p10 + ", median: " + median + ", p90: " + p90 + ", max: " + max);
}