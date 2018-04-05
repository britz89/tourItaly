/*
*   Visualizzazione della mappa dell'italia
*/

function viz() {
    
    var svg;
    var tooltip;
    
    function me(selection) {
    
        var sectionSize = d3.select("#vizRegioni").node().getBoundingClientRect();
        d3.select("#rowItaly").style("height", sectionSize.height+"px");
        selection.style("height", d3.select("#rowItaly").node().getBoundingClientRect().height+"px");
        svg = selection.append("svg")
                    .attr("width","100%")
                    .attr("height","90%");

        var boundaries = svg.node().parentNode.getBoundingClientRect();

        //Load in GeoJSON data
        d3.json("map/italy.json", function(json) {

            var center = d3.geo.centroid(json);
            var projection = d3.geo.mercator()   
                            .scale(boundaries.width*3.94)
                            .center([12.20895517698033, 41.7])
                            .translate([boundaries.width/2, boundaries.height/2]);

            //Define default path generators
            var path = d3.geo.path()
                    .projection(projection);
            
            var region = d3.select("#regionChart").append("h3");

            //Bind data and create one path per GeoJSON feature
            svg.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path)
               .attr("fill", "white")
               .attr("stroke", "#bd5d38")
               .attr("stroke-width", "1.5") 
               .on("mouseover", function(d) {
                    d3.select(this)
                    .attr("fill", "#bd5d38");
                    tooltip = selection.append("h4")
                    .attr("id", "tooltip")
                    .text(d.properties.NOME_REG);
                })
               .on("mouseout", function() {
                    d3.select(this)
                    .attr("fill", "white")
                    .attr("stroke", "#bd5d38");
                    d3.select("#tooltip").remove();
               });
            
            d3.select("#regionChart").style("height", d3.select("#rowItaly").node().getBoundingClientRect().height+"px");
            
            d3.select("#regionChart").append("p")
                .text("Motivo del viaggio")
                .style("visibility", "hidden")
                .style("text-align", "center")
                .style("margin-bottom", "0");
            
            
            var viz = d3.select("#regionChart")
            .append("svg")
            .attr("width","100%")
            .style("height",d3.select("#regionChart").node().getBoundingClientRect().height*0.24+"px");
            
            d3.select("#regionChart").append("p")
                .text("Mezzo utilizzato dai turisti")
                .style("visibility", "hidden")
                .style("text-align", "center")
                .style("margin-bottom", "0");

            var mezziViz = d3.select("#regionChart")
            .append("svg")
            .attr("width","100%")
            .style("height",d3.select("#regionChart").node().getBoundingClientRect().height*0.27+"px")
            .style("margin-top", "5px");
            
            d3.select("#regionChart").append("p")
                .text("Tipo di alloggio scelto dai turisti")
                .style("visibility", "hidden")
                .style("text-align", "center")
                .style("margin-bottom", "0");
            
            var alloggiViz = d3.select("#regionChart")
                .append("svg")
                .attr("width","100%")
                .style("height",d3.select("#regionChart").node().getBoundingClientRect().height*0.27+"px");
            
            
            
            svg.selectAll("path")
                .on("click", function(d) {
                                d3.select("#tooltip").remove();
                                var regione = RegionInfo();
                                regione.regionName(d.properties.NOME_REG.toUpperCase());
                                region
                                .call(regione);
                                
                                var charts = Chart();
                                charts.regionName(d.properties.NOME_REG.toUpperCase());
                                viz.call(charts);
                            
                                var mezzi = ChartMezzi();
                                mezzi.regionName(d.properties.NOME_REG.toUpperCase());
                                mezziViz.call(mezzi);                              
                                
                                var alloggi = ChartAlloggi();
                                alloggi.regionName(d.properties.NOME_REG.toUpperCase());
                                alloggiViz.call(alloggi);   
                
                 });

        });
    }
    return me;

}

var italyViz = viz();

d3.select("#italy").call(italyViz);