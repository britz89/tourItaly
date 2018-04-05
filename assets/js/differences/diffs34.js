function diffs34(){

    function me(selection){
        
        //dare ai charts della prima riga il 50% di altezza rispetto 
        var rowSize = d3.select("#diffChart").node().getBoundingClientRect();
        selection.style("height", rowSize.height*0.5+"px");
        
        selection.select("#diffMezzo")
        .style("height",selection.node().getBoundingClientRect().height+"px");
        
        var vizDiffMezzo = selection.select("#diffMezzo").append("svg")
                    .attr("id", "svgDiffMezzo")
                    .style("height", selection.node().getBoundingClientRect().height*0.9+"px")
                    .attr("width", "100%");
        
        var chartMezzo = ChartDiffMezzo();
        vizDiffMezzo.call(chartMezzo);
        
        var vizDiffRegioni = selection.select("#diffRegioni").append("svg")
                    .attr("id", "svgDiffRegioni")
                    .style("height", selection.node().getBoundingClientRect().height*0.9+"px")
                    .attr("width", "100%");
        
        var chartRegioni = ChartDiffRegioni();
        vizDiffRegioni.call(chartRegioni);
        
    }


    return me;
}




var diffs = diffs34();

d3.select("#rowDiff3-4").call(diffs);