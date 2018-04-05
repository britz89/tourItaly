function ChartDiffRegioni() {
    
    function me(selection) {
        
        var colSize = d3.select("#svgDiffRegioni").node().getBoundingClientRect();

        
        d3.csv("assets/data/questions/differences/diffRegione2.csv", function(data) {
            
            var totale = d3.nest()
                .key(function(d) { return d.TIPO })
                .rollup(function(leaves){
                    return d3.sum(leaves, function(d){
                        return d.TOTALE;
                        });
                }).entries(data);
            
            var pernScale = d3.scale.linear()
							.domain([0,totale[0].values])
							.range([0, 100]);
            
            
            var noPernScale = d3.scale.linear()
							.domain([0, totale[1].values])
							.range([0, 100]);
                        
            var distRegioni = [
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
            
            /*
            var topDist = data.map(function(d, i) {
                    
                    distMotivi[0].values.push({"x": d.MOTIVO_VIAGGIO_97, "y": +d.PERN});
                    distMotivi[1].values.push({"x": d.MOTIVO_VIAGGIO_97, "y": +d.NO_PERN});

            });
            
            console.log(distMotivi);
            
             var chart = nv.models.multiBarChart()  
            .showControls(false)
            .groupSpacing(0.1)
            .showLegend(false)
            .height(colSize.height)
            .width(colSize.width);

            var viz = selection
            .datum(distMotivi)
            .call(chart);
            
            nv.utils.windowResize(chart.update);
            */
                    
            
            var topDist = data.map(function(d, i) {
                if(d.TIPO =="PERN")
                    distRegioni[0].values.push({"label": d.REGIONE_VISITATA, "value": pernScale(+d.TOTALE)});
                else
                    distRegioni[1].values.push({"label": d.REGIONE_VISITATA, "value": noPernScale(+d.TOTALE)});

            });
            var chart = nv.models.multiBarHorizontalChart()
                        .x(function(d) { return d.label })
                        .y(function(d) { return d.value })
                        .showControls(false)
                        .width(colSize.width)
                        .height(colSize.height)
                        .margin({top: colSize.height*0.1031, right: colSize.width*0.06871,bottom: colSize.height*0.251988, left: colSize.width*0.359056})
                        .yDomain(pernScale.range());;
            
            var viz = selection.datum(distRegioni).call(chart);
            nv.utils.windowResize(chart.update);
        });

    }

return me;
}