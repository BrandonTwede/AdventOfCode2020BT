let svgTemplate = `<svg width="240" height="140" xmlns="http://www.w3.org/2000/svg">

<!-- Rectangle -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 20 20 l 0 100 l 200 0 l 0 -100 z"  
    />
    
<!-- 30, 70. Point 0 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 10 70 h 20 0"  
    />
    <circle cx="30" cy="70" r="2" fill="red"/>

<!-- 70, 30, Point 1 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 70 10 v 20 0"  
    />
    <circle cx="70" cy="30" r="2" fill="red"/>

<!-- 120, 30, Point 2 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 120 10 v 20 0"  
    />
    <circle cx="120" cy="30" r="2" fill="red"/>

<!-- 170, 30, Point 3 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 170 10 v 20 0"  
    />
    <circle cx="170" cy="30" r="2" fill="red"/>

<!-- 210, 70, Point 4 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 210 70 h 20 0"  
    />
    <circle cx="210" cy="70" r="2" fill="red"/>

<!-- 170, 110, Point 5 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 170 110 v 20 0"  
    />
    <circle cx="170" cy="110" r="2" fill="red"/>

<!-- 120, 110, Point 6-->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 120 110 v 20 0"  
    />
    <circle cx="120" cy="110" r="2" fill="red"/>

<!-- 70, 110, Point 7 -->
    <path fill="none" stroke="#3DA4AB" stroke-width="3px"
        d="M 70 110 v 20 0"  
    />
    <circle cx="70" cy="110" r="2" fill="red"/>


    {ADDEDPATHS}
</svg>`;

function drawCurve(p1, p2) {

    let startX = p1.x;
    let startY = p1.y;
    let endX = p2.x;
    let endY = p2.y;
    // exemple of a path: M318,345 L330,345 C450,345 380,124 504,124 L519,124

    let path = `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
        fill="none" stroke="#3DA4AB" stroke-width="3px"/>`;
    return path;

}

function portToCoord(i) {
    if (i == 0) return {x: 30, y: 70};
    if (i == 1) return {x: 70, y: 30};
    if (i == 2) return {x: 120, y: 30};
    if (i == 3) return {x: 170, y: 30};
    if (i == 4) return {x: 210, y: 70};
    if (i == 5) return {x: 170, y: 110};
    if (i == 6) return {x: 120, y: 110};
    if (i == 7) return {x: 70, y: 110};
}

function drawTile(t, filename) {
    let lines = "";
    for (let i = 0; i < t.wires.length; i++) {
        let wire = t.wires[i];
        let start = portToCoord(wire.x);
        let end = portToCoord(wire.y);
        let path = drawCurve(start, end);
        lines += path;
    }

    let test = svgTemplate.replace("{ADDEDPATHS}", lines);
    // console.log(test);
    return test;
}

module.exports.drawTile = drawTile;