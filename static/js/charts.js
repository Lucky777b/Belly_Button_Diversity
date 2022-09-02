d3.json("samples.json").then(function(data){
  console.log(data);
});

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // NEED TO USE OTHER QUOTATIONS ` ` not ' ' in .text()
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleNumber = samplesArray.filter(sampleObj => sampleObj.id == sample);
    
    //  5. Create a variable that holds the first sample in the array.
    var sampleID = sampleNumber[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = sampleID.otu_ids;
    var otuLabel = sampleID.otu_labels;
    var sampleVal = sampleID.sample_values;

    // Create variables to hold washArray
    var washArray = data.metadata;
    // Create variable that filters the samples for the object with the desired wash sample number
    var wash = washArray.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first wash sample in the array.
    var washNum = wash[0];
    // Create variable that holds the wfreq 
    var wfreq = washNum.wfreq;
    console.log(wfreq);


    // Could probably have done this code instead of steps 4-6 above (try later to test on copy charts.js)
    //var otuIDs = sampleID.filter(otuID => parseInt(otuID.otu_ids));
    //var otuLabel = sampleID.filter(otu_label => otu_label.otu_labels);
    //var sampleVal = sampleID.filter(val = parseInt(val.sample_values));

    console.log(otuIDs);
    console.log(otuLabel);
    console.log(sampleVal);


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // remember to use the ` ` quotations instead of ' ' quotations in .map() below

    var yticks = otuIDs.slice(0,10).reverse().map(function(elem){return`OTU ${elem}`});
    console.log(yticks);
    var xticks = sampleVal.slice(0,10).reverse();
    var labels = otuLabel.slice(0,10).reverse();



    // this setup will give you the highest bacteria OTU bacteria names found in each patient ID 
    // GOOD TO KNOW IF EVER WANTED TO PROVIDE EACH PATIENT BACTERIA NAMES Instead of OTU ID 
    // ASK TUTOR: if this will return each patient id bacteria highest types or something else? 
    // answer: will return bacteria names with highest bacteria names in the left margin not the 
    // highest amount of bacteria (can see difference when uncomment code and run index.html)
    /*
    var yticks = otuLabel.slice(0,10).reverse().map(function(elem){return`Bacteria:`+` ${elem}`});
    console.log(yticks);
    var xticks = sampleVal.slice(0,10).reverse();
    var labels = otuIDs.slice(0,10).reverse();
    */

    // 8. Create the trace for the bar chart. 

    var trace1 = {
      x: xticks,
      y: yticks,
      type: 'bar',
      orientation: 'h',
      autosize: 'True',
      text: labels
    };
    var barData = [trace1];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      // optional(other way to set bar chart onto site) margin: {t:30,l:120}
      // I think instead of using autosize in the trace1?
      
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // CREATE BUBBLE CHART 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIDs,
      y: sampleVal,
      text: otuLabel,
      type: 'bubble',
      mode: 'markers',
      marker: {
        size: sampleVal,
        color: otuIDs,
        colorscale: 'Portland'
        
      }
    }
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample<b>",
      xaxis: {title:"OTU ID"},
      hovermode:'closest'
      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x:[0,1], y:[0,1]},
      value: wfreq,
      type: "indicator", 
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10], tickwidth: 1},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2-4], color: "orange"},
          {range: [4,6], color: "lime"},
          {range: [6,8], color: "darkblue"},
          {range: [8,10], color: "darkviolet"}
       ],
       autosize: 'True'
     }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: {
        text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week"
    },
      width: 500, 
      height: 300, 
      margin: { t: 90, r:5, l:6, b: 10 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    
  });
};

