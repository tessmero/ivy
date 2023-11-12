
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
    scaffoldThickness: .008,
    vineThickness: .005,
    
    // number of spirals around lattice
    // per distance unit
    spiralDensity: [2,100],
    
    maxJump: 1, // max dist growth off scaffold
    
    growthSpeed: 1e-4, // distance per ms
    
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