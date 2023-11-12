
const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    resetCountdown: 30000,
    resetDelay: 30000,
    
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    vineColor: 'green',
    scaffoldColor: 'gray',
    
    //
    scaffoldThickness: .008,
    vineThickness: .005,
    
    vinePadding: .002, // max space between a vine and its scaffold
    
    // number of spirals around lattice
    // per distance unit
    spiralDensity: [2,100],
    
    // max dist vines are allowed to jump between scaffolds
    maxJump: .01, 
    
    growthSpeed: 4e-4, // distance per ms
    
    branchRate: .4, 
    
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