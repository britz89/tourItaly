function spesaChart() {
    
    var svg;
    
    function me(selection) {
        //Define quantize scale to sort data values into buckets of color
        var color = d3.scale.ordinal()
                    .range(["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59", "#ef6548","#d7301f","#b30000","#7f0000"]);
    
        var section = d3.select("#spesa");
		var fin = section.node().getBoundingClientRect();
		d3.select("#spesaRow").style("height", fin.height+"px");
        
        svg = selection.append("svg")
            .attr("width","100%")
            .attr("height","90%");
        
        var sceltaIniziale = d3.select("#opzioneSpesa")[0][0].value;
        
        d3.csv("assets/data/questions/spesa/spesaMedia.csv", function(data) {
            
            var spesaAnnua = d3.nest()
                        .key(function(d) { return d.STATO_RESIDENZA; })
                        .key(function(d) { return d.ANNO; })
                        .rollup(function(v) { return d3.mean(v, function(d) {return +d.SpesaMedia;});})
                        .entries(data);
            /*
            var spesaMensile = d3.nest()
                               .key(function(d) { return d.STATO_RESIDENZA; }) 
                                .key(function(d) { return d.DATA; })
                                .rollup(function(v) { return d3.mean(v, function(d) {return +d.Totale;});})
                                .entries(data);
            */
            var spesaGlobale = 
                        [{
                            key: "Spesa media Complessiva",
                            values: []
                        }];
            
            var spesaGroupBy = d3.nest()
                                .key(function(d) { return d.STATO_RESIDENZA; })
                                .rollup(function(v) { return d3.mean(v, function(d) {return +d.SpesaMedia;});})
                                .entries(data)
                                .sort(function(a, b){ return d3.descending(a.values, b.values); });
            
            spesaGroupBy.forEach(function(d) {
                
                spesaGlobale[0].values.push({"label": d.key, "value": +d.values});
                
            });
            
            
            if (sceltaIniziale == "annuale"){
                timeSeriesSpesa(spesaAnnua, selection);
            }
            else{
                
                chartGlobale(spesaGlobale, selection);
            }
            //Modifica per interazione
            d3.select("#opzioneSpesa").on("change", function() {
                    var v = d3.select(this)[0][0].value;
                    console.log(v);
                    if (v == "annua")
                        //timeSeriesSpesa(spesaMensile, selection);
                        timeSeriesSpesa(spesaAnnua, selection);
                    else
                        chartGlobale(spesaGlobale, selection); 
                    
                });
        });
    }
        
    return me;
    
    function timeSeriesSpesa(data, selection) {
        
        var chart = nv.models.lineChart()
              .x(function(d) { return d.key })
              .y(function(d) { return d.values }) //adjusting, 100% is 1.00, not 100 as it is in the data
              //.color(d3.scale.category10().range())
              .useInteractiveGuideline(false)
              .showLegend(false)
              .margin({bottom: selection.node().getBoundingClientRect().height*0.1, left: selection.node().getBoundingClientRect().width*0.13})
              .duration(300);
            
            chart.xAxis //Chart x-axis settings
            .axisLabel('Anno')
            


            chart.yAxis //Chart y-axis settings
            .axisLabel('Spesa media')
            .tickFormat(d3.format('.02f'));
            svg.remove();
            svg = selection.append("svg")
                .attr("width","100%")
                .attr("height","90%");
            svg.datum(data).call(chart);
    }
    
    function chartGlobale(data, selection){
        
        var chart = nv.models.discreteBarChart()
          .x(function(d) { return d.label })    //Specify the data accessors.
          .y(function(d) { return d.value })
          .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
          .showXAxis(false)
        .color(function(d, i) { return "rgb(209,"+ (90+i*1.5) + "," + (50 - i*2) + ")";});      //...instead, show the bar value right on top of each bar.
        chart.yAxis.axisLabel("Spesa media");

        svg.remove();
        svg = selection.append("svg")
                    .attr("width","100%")
                .attr("height","90%");
        svg.datum(data).call(chart);
    }
    
}



var spesaViz = spesaChart();

d3.select("#spesaChart").call(spesaViz);