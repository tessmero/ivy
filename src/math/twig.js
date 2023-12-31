// loose twig sticking out of Vine
class Twig{
    
    constructor(p,angle,infront){
        this.p = p
        this.infront = infront
        let len = randRange(...global.twigLen)
        
        // pick bezier curve points
        let a = p
        let b = p.add(vp(angle,len/2)).add(vp(angle+pio2,randRange(-len,len)))
        let c = p.add(vp(angle,len))
        this.points = [a,b,c]
        
        
        this.nSegs = Math.floor(len*1e3)
        this.growthDuration = len/global.growthSpeed
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
    
    getNext(){
        if( rand() < global.leafRate ){
            let ps = this.points
            let n = ps.length
            let angle = ps[n-1].sub(ps[n-2]).getAngle()
            return [new Leaf(this.p, angle, this.infront)]
        }
        return []
    }
    
    draw(g){
        g.globalCompositeOperation = this.infront ? "destination-over" : "source-over";  
        
        var nSegs = this.nSegs
        
        var start = Math.floor(nSegs*this.pt/this.growthDuration)
        var stop = Math.floor(nSegs*this.t/this.growthDuration)
        
        // draw subsegment
        for( var i = start ; (i<stop)&&(i<nSegs) ; i++ ){
            let p = bezier(this.points,i/nSegs)
            this.p = p
            
            // draw circle
            g.beginPath()
            g.moveTo(p.x,p.y)
            g.arc(p.x,p.y,global.vineThickness/2,0,twopi)
            g.fill()
        }
         
        return []
    }
}