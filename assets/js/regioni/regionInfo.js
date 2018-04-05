function RegionInfo() {
    
    var regionName;
    
    function me(selection) {
    
        selection
        .style("text-align", "center")
        .text(regionName);
    }
    
    me.regionName = function(_){
        
        if(!arguments.length) return regionName;
        regionName = _;

        return me;
    }

    return me;

}