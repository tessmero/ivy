
const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    resetCountdown: 30000,
    resetDelay: 30000,
    
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    vineColor: '#393',
    scaffoldColor: '#742',
    
    //
    scaffoldThickness: .01,
    vineThickness: .005,
    
    vinePadding: .002, // max space between a vine and its scaffold
    
    // number of spirals around lattice
    // per distance unit
    spiralDensity: [2,100],
    
    // size of vine instances
    // fraction of scaffold length
    helixDist: [.1,.3],
    
    // max dist vines are allowed to jump between scaffolds
    maxJump: .01, 
    
    growthSpeed: 4e-4, // distance per ms
    
    branchRate: .3, // chance for helix to branch at scaffold intersection
    
    twigRate: 5e-3, // helix to spawn twig
    twigLen: [.01,.03],
    
    leafRate: .5,// twig to spawn leaf
    leafSize: [.005,.012], // radius
    leafLen: [.02,.04], // length
    
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
    allVines: [], // Vine/Twig/Leaf intances
    
    // debug
    debugBezierPoints: false,
}