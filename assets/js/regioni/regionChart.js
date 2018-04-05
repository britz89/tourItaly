function Chart() {
    
    var regionName;
    var colSize = d3.select("#regionChart").node().getBoundingClientRect();
    
    function me(selection) {

        d3.csv("assets/data/questions/info regioni/motivoPerRegione.csv", function(data) {
            
            var motiviRegione = 
            [{
                key: "Motivi per regione",
                values: []
            }];
            
            var filtered = data.filter(function(d) { return d.REGIONE_VISITATA == regionName; });
            
            var scale = d3.scale.linear()
                .domain([0, d3.sum(filtered, function(d) {return +d.Totale})])
                .range([0, 100]);
            
            
            filtered.forEach(function (d) {
                
                motiviRegione[0].values.push({"label": d.MOTIVO_VIAGGIO_97, "value": scale(+d.Totale)});
                
            });
            
            var chart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })    //Specify the data accessors.
              .y(function(d) { return d.value })
              .staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
                .height(colSize.height*0.25)
              .showXAxis(true)
              .yDomain(scale.range());

            
            chart.yAxis
                .axisLabel("Percentuali");

            var viz = selection
            .datum(motiviRegione)
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