function applyFilter(){
    var minFreq = document.getElementById("fromFreqInput");
    var maxFreq = document.getElementById("toFreqInput");

    var nr = document.getElementById("checkNr").checked;
    var lte = document.getElementById("checkLte").checked;
    var tdscdma = document.getElementById("checkTdScdma").checked;
    var wcdma = document.getElementById("checkWcdma").checked;
    var gsm = document.getElementById("checkGsm").checked;

    var token = document.getElementById("tokenInput").value;

    uri = new URL("http://5geo.me/signal");
    if (token)
        uri.searchParams.append("user", token);
    
    if (nr)
        uri.searchParams.append("type", "NR");  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
    
    if (lte)
        uri.searchParams.append("type", "LTE");
    
    if (tdscdma)
        uri.searchParams.append("type", "TDSCDMA");
    
    if (wcdma)
        uri.searchParams.append("type", "WCDMA");
    
    if (gsm)
        uri.searchParams.append("type", "GSM");
    
    if (minFreq.value != minFreq.min)
        uri.searchParams.append("minFreq", minFreq.value);

    if (maxFreq.value != maxFreq.max)
        uri.searchParams.append("maxFreq", maxFreq.value);

    fetch(uri.toString())
    .then((response) => response.json()).then(data => {
        setMapData(data["signals"]);
        displayMap(mapData)
        if (token){
            setGraphData(data["signals"]);
            displayGraph(graphData, "Datos de señales de " + token);
        }
    });
}

function withinRange(signal, objLat, objLong, zoom){
    var threshold = 0.1/(zoom^5);

    if (Math.abs(signal["ubiLat"] - objLat) > threshold)
        return false;

    if (Math.abs(signal["ubiLong"] - objLong) > threshold)
        return false;
    
    return true;
}

function coordFilter(data, lat, lng, zoom){

    console.log(zoom + ": " + lat + " | " + lng);
    newData = data.filter(signal => withinRange(signal, lat, lng, zoom));
    console.log(newData);

    return newData;

}