resetRand()

const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    resetCountdown: 30000,
    resetDelay: 30000,
    
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'white',
    vineColor: 'green',
    scaffoldcolor: 'black',
    
    //
    scaffoldThickness: .005,
    vineThickness: .005,
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,
    centerPos: v(.5,.5),
    screenCorners: null, 
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    // objects
    allScaffolds: [],
    allVines: [],
    
    // balloon collision settings
    nCollisionChecks: 10, // checks per balloon per update
    
    // debug
    debugBezierPoints: false,
}