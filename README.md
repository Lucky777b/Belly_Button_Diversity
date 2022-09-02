# Belly Button Diversity

## Overview 

A company, Improbable Beef, was conducting research on various bacterial species, in hopes that they would find a possible candidate to manufacture synthetic beef from. They wanted to see if there might be a common bacterial species that will produce the same flavor as beef made from animal meat. Thus, the purpose of this project was to create an interactive webpage that would allow all volunteers who submitted bacterial samples from their navel, to filter to their associated ID number and visualize their own bacterial data. The bacterial data that they will be visualizing is the top 10 bacterial species identified in their belly buttons. 

## Resources
* Visual Studio Code 
* Plotly
* HTML
* JavaScript
* D3
* Data: samples.json

## Results 

[Visit My Belly Button Diversity Page](https://lucky777b.github.io/Belly_Button_Diversity/)

Using the link provided above, you can navigate to the interactive webpage, and use the "Test Subject ID No." filter, to select different sample IDs, and see the different results from each sample. You will see all three charts update each time you click on a different sample ID.

When accessing the webpage, the initial screen should look like this: 

![Initial Webpage](https://github.com/Lucky777b/Belly_Button_Diversity/blob/main/static/images/initial_webpage.png)

For this project, I utilized my knowledge of javascript, html, and Plotly, in order to create my interactive webpage. I used Plotly to produce 3 different charts on my webpage, for example, a horizontal bar chart, bubble chart, and a gauge chart. 

The bar chart represented the top 10 bacterial species(or OTUs) found in a specific individuals navel. When the user hovers over each OTU ID bar, a little popup will come up specifying the value of that OTU ID found in the sample, plus the names of the bacteria species associated with that OTU ID. 

The bubble chart essentially shows the same information that the bar chart does, except that it allows to the volunteer to see it in a different manner. Instead of looking at the OTU IDs in bar chart form, they can see all of the different IDs visually in size, and comparative the sizes of one OTU ID, to the rest of the OTU IDs, found in their sample. 

The gauge chart was also incorporated to show the washing frequency of each volunteer's sample. The washing frequency was important to include, because if they had a higher wash frequency, then it would be expected that the sample would contain higher amounts of one or more OTU IDs, and not much variety amongst all the samples. If their wash frequency was lower, then it would make sense that the value amounts of the various OTU IDs would be similar, because there was more time to pick up more bacteria. 

By looking at the sample values for someone who washed 1 time a week, the bar chart and the bubble chart show high amounts of 3-4 OTU IDs, for example, "Test Subject ID No.:941". 

![Sample 941](https://github.com/Lucky777b/Belly_Button_Diversity/blob/main/static/images/testSample941.png)

When looking at "Test Subject ID No.: 950", you can see that they had a wash frequency of '5', and they have a significant amount of only 2 OTU IDs, while the rest show a much lower value. 

![Sample 950](https://github.com/Lucky777b/Belly_Button_Diversity/blob/main/static/images/testSample950.png)
