function ChartMezzi() {
    
    var regionName;
    var colSize = d3.select("#regionChart").node().getBoundingClientRect();
    
    function me(selection) {
        
        d3.selectAll("#regionChart p").style("visibility", "visible");
        
        d3.csv("assets/data/questions/info regioni/mezzoPerRegione.csv", function(data) {
            
            var mezzoRegione = [];
            
            var filtered = data.filter(function(d) { return d.REGIONE_VISITATA == regionName; });
            
            var scale = d3.scale.linear()
                .domain([0, d3.sum(filtered, function(d) {return +d.Totale})])
                .range([0, 100]);
            
            
            filtered.forEach(function (d) {
                
                mezzoRegione.push({"label": d.FLAG_LOCALITA, "value": scale(+d.Totale)});
                
            });
            
            console.log(mezzoRegione);

              var chart = nv.models.pieChart()
                  .x(function(d) { return d.label })
                  .y(function(d) { return d.value })
                  .showLabels(true)     //Display pie labels
                  .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                  .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                  .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                  .donutRatio(0.28)     //Configure how big you want the donut hole size to be.
                  .height(colSize.height*0.30)
                  ;
            
            var viz = selection
            .datum(mezzoRegione)
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