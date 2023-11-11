// animated ivy branch
class Vine {
    constructor(a,b){
        this.a = a
        this.b = b
        
        let d = b.sub(a)
        let dist = d.getMagnitude()
        
        this.amp = global.helix_d/2
        this.norm = d.getAngle() + pio2
        
        let rd = randRange(...global.spiralDensity)
        console.log(rd)
        let n = Math.floor( dist * rd )
        if( n < 1 ) n = 1
        this.nPeriods = n
        
        this.nSegs = this.nPeriods*100
        
        // compute growth duration
        let h = dist
        let p = h/n
        let hlen = n * Math.sqrt(global.hpid2 + p*p)
        this.growthDuration = hlen/global.growthSpeed
        this.t = 0
        this.pt = 0
    }
    
    update(dt){
        this.pt = this.t
        this.t += dt
    }
    
    isDone(){
        return this.t > this.growthDuration
    }
    
    // get new vines to extend this one
    // return list of length 1 to grow normally
    // return empty list to stop growing
    getNext(){
        return [new Vine(this.b, this.b.add(this.b.sub(this.a)))]
    }
    
    draw(g){
        var a = this.a
        var b = this.b
        var nSegs = this.nSegs
        
        var start = Math.floor(nSegs*this.pt/this.growthDuration)
        var stop = Math.floor(nSegs*this.t/this.growthDuration)
        
        //g.restore()
        
        // draw vine
        var prev = a
        for( var i = start ; (i<stop)&&(i<nSegs) ; i++ ){
            var ang = twopi*i/nSegs*this.nPeriods
            
            // occlude parts of the vine the scaffolds
            g.globalCompositeOperation = (((ang+pio2)%twopi)<pi) ? "destination-over" : "source-over";  
            
            var amp = this.amp * Math.sin(ang)
            var p = va(a,b,i/nSegs).add(vp(this.norm,amp))
            
            g.beginPath()
            g.moveTo(p.x,p.y)
            g.arc(p.x,p.y,global.vineThickness/2,0,twopi)
            g.fill()
            
            prev = p
        }
         
    }
}