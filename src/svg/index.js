function getUnlockSvg(width = '200', heigth = '200' ) {
    const svgns = "http://www.w3.org/2000/svg";
    const icon = document.createElementNS(svgns, "svg:svg");
    icon.setAttribute('width', width);
    icon.setAttribute('height', heigth);
    icon.setAttribute('viewBox', "0 0 1024 1024");
    const lineRect = createTag('rect', {
        x: 160,
        y: 96,
        rx: 864,
        
    })
}

function createTag(tag,objAttr){
    var oTag = document.createElementNS(svgNS,tag);
    for(var attr in objAttr){
        oTag.setAttribute(attr,objAttr[attr]);
    }
    return oTag;
}