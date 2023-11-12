


function update(dt) {    
    fitToContainer()
    global.t += dt
    
    // update objects being drawn
    global.allVines.forEach(v => v.update(dt))
    let newVines = []
    global.allVines = global.allVines.filter(v => {
            if( v.isDone() ){
                newVines.push(...v.getNext())
                return false
            }
            return true
    })
    global.allVines.push(...newVines)
            
    // autoreset periodically
    if( global.allVines.length == 0 ){
        if( global.resetCountdown > 0 ){
            global.resetCountdown -= dt
        } else {
            fitToContainer(true) 
        }
    }
}





var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(forceReset=false){
    
    var cvs = global.canvas
    if( forceReset || (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      lastCanvasOffsetWidth  = cvs.offsetWidth;
      lastCanvasOffsetHeight = cvs.offsetHeight;
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var padding = 20; // (extra zoom IN) thickness of pixels CUT OFF around edges
        var dimension = Math.max(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / global.canvasScale
        var yr = -global.canvasOffsetY / global.canvasScale
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
    
        resetGame()
    }
}