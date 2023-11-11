// animated ivy branch
class Vine {
    constructor(s){
        this.scaffold = s
        
        this.amp = (global.scaffoldThickness + global.vineThickness)/2
        this.norm = s.b.sub(s.a).getAngle() + pio2
    }
    
    draw(g){
        var a = this.scaffold.a
        var b = this.scaffold.b
        
        //g.restore()
        
        // draw vine
        var nSegs = 1000
        var nPeriods = 40
        var prev = a
        for( var i = 0 ; i < nSegs ; i++ ){
            var ang = twopi*i/nSegs*nPeriods
            
            // occlude parts of the vine the scaffolds
            g.globalCompositeOperation = (((ang+pio2)%twopi)<pi) ? "destination-over" : "source-over";  
            
            var amp = this.amp * Math.sin(ang)
            var p = va(a,b,i/nSegs).add(vp(this.norm,amp))
            
            g.beginPath()
            g.moveTo(prev.x,prev.y)
            g.lineTo(p.x,p.y)
            g.stroke()
            
            prev = p
        }
         
    }
}