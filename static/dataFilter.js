function applyFilter(){
    console.warn("Incomplete method:", "The method 'applyFilter()' has not been implemented, please fill the function before removing this warning");

    var minFreq = document.getElementById("fromFreqInput");
    var maxFreq = document.getElementById("toFreqInput");

    var nr = document.getElementById("checkNr").checked;
    var lte = document.getElementById("checkLte").checked;
    var tdscdma = document.getElementById("checkTdScdma").checked;
    var wcdma = document.getElementById("checkWcdma").checked;
    var gsm = document.getElementById("checkGsm").checked;

    var token = document.getElementById("tokenInput").value;

    var minTime = document.getElementById("minTime").value;
    var maxTime = document.getElementById("maxTime").value;

    console.log(minTime + " | " + maxTime);

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

    if (minTime)
        uri.searchParams.append("minTime", minTime);
    
    if (maxTime)
        uri.searchParams.append("maxTime", maxTime);
    
    if (minFreq.value != minFreq.min)
        uri.searchParams.append("minFreq", minFreq.value);

    if (maxFreq.value != maxFreq.max)
        uri.searchParams.append("maxFreq", maxFreq.value);

    fetch(uri.toString())
    .then((response) => response.json()).then(data => {
        mapData = data["signals"];
        displayMap(mapData)
        if (token){
            var graphData = data["signals"]
            displayGraph(graphData);
        }
    });
}

