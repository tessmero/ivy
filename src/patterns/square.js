function squarePattern(){
    global.allScaffolds = []
    let dx = .1
    let dy = .1
    for( let x = 0 ; x < 1 ; x += dx ){
        for( let y = 0 ; y < 1 ; y += dy ){
            global.allScaffolds.push(new Scaffold(v(x,y),v(x+dx,y)))
            global.allScaffolds.push(new Scaffold(v(x,y),v(x,y+dy)))
        }
    }
    let s = global.allScaffolds[Math.floor(global.allScaffolds.length*randRange(.48,.52))]
    global.allVines = [new Vine(s,0,.2)]
}