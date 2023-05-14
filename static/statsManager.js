function refreshStatistics(e){
    var xMin = e['xaxis.range[0]'];
    var xMax = e['xaxis.range[1]'];

    shownData = graphData.filter(signal => signal["moment"] < xMax && signal["moment"] > xMin);
    setZoomedData(shownData);
    console.log(zoomedData);
}