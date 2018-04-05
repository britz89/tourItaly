function ChartDiffPaese() {
    
    function me(selection) {
        
        var colSize = d3.select("#svgDiff").node().getBoundingClientRect();

        d3.csv("assets/data/questions/differences/diffPaese.csv", function(data) {
            
            var totale = d3.nest()
                            .key(function(d) { return d.TIPO })
                            .rollup(function(leaves){
                                return d3.sum(leaves, function(d){
                                    return d.TOTALE;
                                    });
                            }).entries(data);
            
            var pernScale = d3.scale.linear()
                .domain([0, totale[0].values])
                .range([0, 100]);
            
            
            var noPernScale = d3.scale.linear()
							.domain([0, totale[1].values])
							.range([0, 100]);
            
            var top10 = [
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
                if(d.TIPO =="PERN")
                    top10[0].values.push({"label": d.STATO_RESIDENZA, "value": pernScale(+d.TOTALE)});
                else
                    top10[1].values.push({"label": d.STATO_RESIDENZA, "value": noPernScale(+d.TOTALE)});

            });
            var chart = nv.models.multiBarHorizontalChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .showControls(false)
                        .width(colSize.width)
                        .height(colSize.height)
                        .margin({top: colSize.height*0.1031, right: colSize.width*0.06871,bottom: colSize.height*0.171988, left: colSize.width*0.229056})
                        .yDomain(pernScale.range());;
            
            var viz = selection.datum(top10).call(chart);
            nv.utils.windowResize(chart.update);
            
            
        });
        
    }

return me;
}