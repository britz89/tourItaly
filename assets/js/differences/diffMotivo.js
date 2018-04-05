function ChartDiffMotivo() {
    
    function me(selection) {
        
        var colSize = d3.select("#svgDiffMotivo").node().getBoundingClientRect();

        
        d3.csv("assets/data/questions/differences/diffMotivo.csv", function(data) {
            
            var pernScale = d3.scale.linear()
							.domain([0, d3.sum(data, function(d) {return +d.PERN})])
							.range([0, 100]);
            
            
            var noPernScale = d3.scale.linear()
							.domain([0, d3.sum(data, function(d) {return +d.NO_PERN})])
							.range([0, 100]);
                        
            var distMotivi = [
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

                        distMotivi[0].values.push({"label": d.MOTIVO_VIAGGIO_97, "value": pernScale(+d.PERN)});
                        distMotivi[1].values.push({"label": d.MOTIVO_VIAGGIO_97, "value": noPernScale(+d.NO_PERN)});

                });
            
            var chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .showControls(false)
            .width(colSize.width)
            .height(colSize.height)
            .margin({top: colSize.height*0.1031, right: colSize.width*0.06871,bottom: colSize.height*0.171988, left: colSize.width*0.389056})
            .yDomain(pernScale.range());
            
            var viz = selection.datum(distMotivi).call(chart);
            nv.utils.windowResize(chart.update);
        });

    }

return me;
}