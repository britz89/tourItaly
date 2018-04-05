function ChartDiffMezzo() {
    
    function me(selection) {
        
        var colSize = d3.select("#svgDiffMezzo").node().getBoundingClientRect();

        d3.csv("assets/data/questions/differences/diffMezzo.csv", function(data) {
            
            var pernScale = d3.scale.linear()
                .domain([0, d3.sum(data, function(d) {return +d.PERN})])
                .range([0, 100]);
            
            
            var noPernScale = d3.scale.linear()
							.domain([0, d3.sum(data, function(d) {return +d.NO_PERN})])
							.range([0, 100]);
                        
            var distMezzo = [
            {
                key: "Pernottanti",
                color: "#d67777",
                values: []
            },
            {
                key:"Escursionisti",
                color: "#4f99b4",
                values: []
            }
          ];
            
            
            var topDist = data.map(function(d, i) {

                distMezzo[0].values.push({"x": d.FLAG_LOCALITA, "y": pernScale(+d.PERN)});
                distMezzo[1].values.push({"x": d.FLAG_LOCALITA, "y": noPernScale(+d.NO_PERN)});

            });
            
            var chart = nv.models.multiBarChart()
            //.x(function(d) { return d.label })
            //.y(function(d) { return d.value })
            .showControls(false)
            .width(colSize.width)
            .height(colSize.height*0.9)
            .margin({top: colSize.height*0.0531, right: colSize.width*0.06871,bottom: colSize.height*0.171988, left: colSize.width*0.109056})
            .yDomain(pernScale.range())
            .reduceXTicks(false);
            
            var viz = selection.datum(distMezzo).call(chart);
            nv.utils.windowResize(chart.update);
            
        });
        
    }

return me;
}