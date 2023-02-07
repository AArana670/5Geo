var map = L.map('map').setView([43.26310, -2.94939], 13);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

var heatmapData = [
    {lat: 43.263, lng: -2.955, value: 0.5, },
    {lat: 43.265, lng: -2.95, value: 0.8},
    {lat: 43.268, lng: -2.95, value: 0.2},
    {lat: 43.27, lng: -2.947, value: 0.6},
    {lat: 43.267, lng: -2.953, value: 0.9}
];

var heatmap = new HeatmapOverlay({
    radius: 0.001,
    maxOpacity: .8,
    minOpacity: 0,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'value'
});

heatmap.setData({
    max: 1,
    data: heatmapData
});

map.addLayer(heatmap);


function applyFilter(){
    console.warn("Incomplete method:", "The method 'applyFilter()' has not been implemented, please fill the function before removing this warning");

    var minFreq = document.getElementById("fromInput").value;
    var maxFreq = document.getElementById("toInput").value;

    var g4 = document.getElementById("check4G").checked;
    var g5 = document.getElementById("check5G").checked;

    var msg;
    if (g4 || g5){
        msg = "freq >= " + minFreq;
        msg += " & freq <= " + maxFreq;
        if (g4 && g5){
            msg += " & (type == '4G' | type == '5G')";
        }else if(g4){
            msg += " & type == '4G'";
        }else if(g5){
            msg += " & type == '5G'";
        }
    }else{
        msg = "type == ''";
    }

    console.log(msg);
}

function downloadMap(){
    console.warn("Incomplete method:", "The method 'downloadMap()' has not been implemented, please fill the function before removing this warning");


}


map.on('click', function(e){
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    console.log("You clicked the map at latitude: " + lat + " and longitude: " + lng);
    });