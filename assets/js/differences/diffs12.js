function diffs12(){

    function me(selection){
    
        //inizio adapting finestra
		var section = d3.select("#differenze");
		var fin = section.node().getBoundingClientRect();
		d3.select("#rowDiff").style("height", fin.height*0.9+"px");
		//fine prova finestra adapting
        
        //dare ai charts della prima riga il 50% di altezza rispetto alla riga 
        var rowSize = d3.select("#diffChart").node().getBoundingClientRect();
        selection.style("height", rowSize.height*0.5+"px");
        
        selection.select("#diffPaese")
        .style("height",selection.node().getBoundingClientRect().height+"px");
        
        var vizDiffPaese = selection.select("#diffPaese").append("svg")
                    .attr("id", "svgDiff")
                    .style("height", selection.node().getBoundingClientRect().height*0.9+"px")
                    .attr("width", "100%");
        
        var chartPaesi = ChartDiffPaese();
        vizDiffPaese.call(chartPaesi);
        
        var vizDiffMotivo = selection.select("#diffMotivo").append("svg")
                    .attr("id", "svgDiffMotivo")
                    .style("height", selection.node().getBoundingClientRect().height*0.9+"px")
                    .attr("width", "100%");
        
        var chartMotivi = ChartDiffMotivo();
        vizDiffMotivo.call(chartMotivi);
        
    }


    return me;
}




var diffs = diffs12();

d3.select("#rowDiff1-2").call(diffs);