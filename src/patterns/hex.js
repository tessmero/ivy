function hexPattern(){
    
    global.allScaffolds = []
    
    let dy = .09
    let dx = .1
    let scale = .6
    dx *= scale
    dy *= scale
    let ix = 0
    
    for( let x = 0 ; x < 1 ; x += dx ){
        let iy = 0
        for( let y = 0 ; y < 1 ; y += dy ){
            let ox = ( iy%2 ) ? 0 : dx/2 
            
            let val = ((ix+(iy%2))%3)
            
            if( val == 0 ) {
                global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox+dx,y)))
            }
            
            if( val == 0 ) {
                global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox-dx/2,y+dy)))
            }
            if( val == 1 ) {
                global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox+dx/2,y+dy)))
            }
            
            iy += 1
        }
        
        ix += 1
    }
    
    global.allVines = []
    for( let i = 0 ; i < 1 ; i++ ) {
        let s = global.allScaffolds[Math.floor(global.allScaffolds.length*randRange(.49,.51))]
        global.allVines.push(new Vine(s,0,.2))
    }
}