var trace1 = {
    x: ["10:00", "10:01", "10:02", "10:03"],
    y: [10, 15, 13, 17],
    type: 'scatter',
    title: "Señal 1"
  };
  
  var trace2 = {
    x: ["10:00", "10:01", "10:02", "10:03"],
    y: [16, 5, 11, 9],
    type: 'scatter',
    title: "Señal 2"
  };
  
  var data = [trace1, trace2];

  var layout = {
    title: "Evolución temporal de la emisión EM"
  }
  
  Plotly.newPlot('timeEvo', data, layout);



  function downloadGraph(){
    console.warn("Incomplete method:", "The method 'downloadGraph()' has not been implemented, please fill the function before removing this warning");


}