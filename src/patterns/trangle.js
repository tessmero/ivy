function trianglePattern(){
    global.allScaffolds = []
    let dy = .09
    let dx = .1
    for( let x = 0 ; x < 1 ; x += dx ){
        let iy = 0
        for( let y = 0 ; y < 1 ; y += dy ){
            let ox = ( iy%2 ) ? 0 : dx/2 
            iy += 1
            
            global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox+dx,y)))
            global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox+dx/2,y+dy)))
            global.allScaffolds.push(new Scaffold(v(x+ox,y),v(x+ox-dx/2,y+dy)))
        }
    }
    let s = global.allScaffolds[Math.floor(global.allScaffolds.length/2)]
    global.allVines = [new Vine(s,0,.2)]
}