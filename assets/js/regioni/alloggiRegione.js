function ChartAlloggi() {
    
    var regionName;
    var colSize = d3.select("#regionChart").node().getBoundingClientRect();
    
    function me(selection) {
        
        d3.selectAll("#regionChart p").style("visibility", "visible");
        
        d3.csv("assets/data/questions/info regioni/alloggioPerRegione.csv", function(data) {
            
            var alloggioRegione = [{
                                    key: "Alloggi per regione",
                                    color: "#4f99b4",
                                    values: []
                                }];
            
            var filtered = data.filter(function(d) { return d.REGIONE_VISITATA == regionName; });
            
            var scale = d3.scale.linear()
                .domain([0, d3.sum(filtered, function(d) {return +d.Totale})])
                .range([0, 100]);
            
            
            filtered.forEach(function (d) {
                
                alloggioRegione[0].values.push({"label": d.ALLOGGIO_PRINC_08, "value": scale(+d.Totale)});
                
            });
            
            
            var chart = nv.models.multiBarHorizontalChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .height(colSize.height*0.30)
                    .showControls(false)
                    .margin({top:0, right:0, bottom: colSize.height*0.071988, left: colSize.width*0.29056})
                    .showLegend(false)
                    .yDomain(scale.range());
            
            var viz = selection
            .datum(alloggioRegione)
            .call(chart);
            
        });
        
    }

    me.regionName = function(_){
        
        if(!arguments.length) return regionName;
        regionName = _;

        return me;
    }


return me;
}