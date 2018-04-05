/*
*   Visualizzazione heatmap mondiale in base al numero di turisti del paese relativo
*/

function map() {

    var svg;
    
    function me (selection) {
		//inizio adapting finestra
		var section = d3.select("#generalInfo");
		var fin = section.node().getBoundingClientRect();
		d3.select("#rowMap").style("height", fin.height+"px");
		//fine prova finestra adapting
        svg = selection.append("svg")
                        .attr("width", "90%")
                        .attr("height", "90%");
        
        var boundaries = svg.node().parentNode.getBoundingClientRect();
                
        
        var projection = d3.geo.mercator()
                        .scale(boundaries.width*0.128735632)
                        .center([28.413918712495782, 18.8487])
                        .translate([boundaries.width/2, boundaries.height/2])

        var path = d3.geo.path()
                .projection(projection);
        
        //Define quantize scale to sort data values into buckets of color
        var color = d3.scale.quantize()
                    .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59", "#ef6548","#d7301f","#b30000","#7f0000"]);
        d3.csv("assets/data/questions/totaleTuristiMap.csv", function(data) {
            
            //Set input domain for color scale
            color.domain([
                d3.min(data, function(d) { return d.somma; }), 
                d3.max(data, function(d) { return d.somma; })
            ]);
            
            d3.json("map/world.json", function(json) {
                
                var centro = d3.geo.centroid(json);
                //projection.center(centro);
                //Merge the ag. data and GeoJSON
                //Loop through once for each ag. data value
                for (var i = 0; i < data.length; i++) {

                    //Grab state name
                    var dataState = data[i].STATO_RESIDENZA;

                    //Grab data value, and convert from string to float
                    var dataValue = parseInt(data[i].somma);

                    //Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++) {

                        var jsonState = json.features[j].properties.name.toUpperCase();
                         
                        if (dataState == jsonState) {
                            //Copy the data value into the JSON
                            json.features[j].properties.value = dataValue;

                            //Stop looking through the JSON
                            break;

                        }
                    }		
                }
                
                //Bind data and create one path per GeoJSON feature
                svg.selectAll("path")
                   .data(json.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                    .style("fill", function(d) {
                        
                        //Get data value
                        var value = d.properties.value;

                        if (value) {
                            //If value exists…
                            return color(value);
                        } else {
                            //If value is undefined…
                            return "#ccc";
                        }
                        
					   })
                    
                   .on("mouseover", function(d) {

                        tooltip = selection.append("h4")
                        .attr("id", "tooltip")
                        .text(d.properties.name);
                    })
                   .on("mouseout", function() {

                        d3.select("#tooltip").remove();
                   });
                   
            });
        });
        
    }
    return me;
}





var worldMap = map();

d3.select("#worldHeatMap").call(worldMap);
