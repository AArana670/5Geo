function refreshStatistics(e){
    var xMin = e['xaxis.range[0]'];
    var xMax = e['xaxis.range[1]'];
    console.log("Graph statistics recalculated, from " + xMin + " to " + xMax);
}