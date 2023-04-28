var map = L.map('map').setView([43.26310, -2.94939], 15);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

var heatmap = new HeatmapOverlay({
    radius: 0.001,
    maxOpacity: .8,
    minOpacity: 0,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'ubiLat',
    lngField: 'ubiLong',
    valueField: 'dBm'
});

fetch("http://5geo.me/signal")
    .then((response) => response.json()).then(data => {
        let mapData = data["signals"];
        displayMap(mapData)});

function displayMap(heatmapData){
    console.log(heatmapData)
    
    heatmap.setData({
        max: -44,
        min: -140,
        data: heatmapData
    });
    map.addLayer(heatmap);
}


function applyFilter(){
    console.warn("Incomplete method:", "The method 'applyFilter()' has not been implemented, please fill the function before removing this warning");

    var minFreq = document.getElementById("fromInput").value;
    var maxFreq = document.getElementById("toInput").value;

    var g4 = document.getElementById("check4G").checked;
    var g5 = document.getElementById("check5G").checked;

    var token = document.getElementById("tokenInput").value;

    uri = new URL("http://5geo.me/signal");
    if (token)
        uri.searchParams.set("user", token);

    fetch(uri.toString())
    .then((response) => response.json()).then(data => {
        let mapData = data["signals"];
        heatmap.setLatLngs(mapData)});
}


map.on('click', function(e){
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;

    createGraph(lat,lng);
    });


function downloadMap(){
    console.warn("Incomplete method:", "The method 'downloadMap()' has not been implemented, please fill the function before removing this warning");


}


function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}