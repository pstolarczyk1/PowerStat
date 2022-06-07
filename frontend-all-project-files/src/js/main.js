var updateInterval = 200; //in ms
var onChartElements = 50;
var i = 0;
var index = 0;

const address = window.prompt("In order to continue please enter esp32 address:" , "http://10.0.0.177/var");

var chart = document.querySelector('#chart');
const label0 = document.querySelector('#label0');
const label1 = document.querySelector('#label1');
const color0 = document.querySelector('#color0');
const color1 = document.querySelector('#color1');
const newUpdateInterval = document.querySelector('#color1');
const newOnChartElements = document.querySelector('#color1');

// create chart options in case of adding another charts
var options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            millisecond: 's:S'
          }
        }
      }],
        yAxes: [{
            ticks: {
                beginAtZero: true,
            }
        }]
    },
    legend: { display: true },
    tooltips: { enabled: false }
};

// create chart object
var chartInstance = new Chart(chart, {
    type: 'line',
    data: {
      datasets: [{
          label: 'Voltage',
          data: 0,
          fill: false,
          borderColor: '#ebd834',
          borderWidth: 2
      },
      {
        label: 'Current',
        data: 0,
        fill: false,
        borderColor: '#343deb',
        borderWidth: 2
    }]
    },
    options: Object.assign({}, options, {
      title:{
        display: false,
        text: "",
        fontSize: 22
      }
    })    
  }
);

// add data to displayed item array and shift the array
function addData(data) {
  if(data){
    chartInstance.data.labels.push(new Date());
    index = 0;
    chartInstance.data.datasets.forEach((dataset) =>{dataset.data.push(data[index]);index++;});
    if(i > onChartElements){
      chartInstance.data.labels.shift();
      chartInstance.data.datasets[0].data.shift();
      chartInstance.data.datasets[1].data.shift();
    }
    else i++;
    chartInstance.update();
  }
};

// get json and set function to run on repeat
function updateData() {
  $.getJSON(address, addData);            //to replace 
  setTimeout(updateData,updateInterval);
}

updateData();

// handle settings change
function updateChartParam(){

  chartInstance.data.datasets[0].label = label0.value;
  chartInstance.data.datasets[1].label = label1.value;
  chartInstance.data.datasets[0].borderColor = color0.value;
  chartInstance.data.datasets[1].borderColor = color1.value;

  if(newUpdateInterval.value != updateInterval){
    updateInterval = newUpdateInterval.value;
  }

  if(newOnChartElements.value != onChartElements){
    onChartElements = $('#onChartElements').value;
  }
  
  chartInstance.update();

};

// make settings div slide (show/hide)
$( ".toggle-settings" ).click(function() {
  $( ".settings-background-hidden" ).slideToggle();
});