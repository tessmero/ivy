// loose twig sticking out of Vine
class Leaf{
    
    constructor(p,angle,infront){
        this.infront = infront
        this.maxRad = randRange(...global.leafSize)
        let len = randRange(...global.leafLen)
        
        // pick bezier curve points
        let a = p
        let b = p.add(vp(angle,len/2)).add(vp(angle+pio2,randRange(-len/4,len/4)))
        let c = p.add(vp(angle,len))
        this.points = [a,b,c]
        
        
        this.nSegs = Math.floor(len*1e3)
        this.growthDuration = 10*len/global.growthSpeed
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
        return []
    }
    
    draw(g){
        g.globalCompositeOperation = this.infront ? "destination-over" : "source-over";  
        
        var nSegs = this.nSegs
        
        var start = Math.floor(nSegs*this.pt/this.growthDuration)
        var stop = Math.floor(nSegs*this.t/this.growthDuration)
        
        // draw subsegment
        for( var i = start ; (i<stop)&&(i<nSegs) ; i++ ){
            var p = bezier(this.points,i/nSegs)
            
            var rad = this.maxRad * Math.sin(pi*i/nSegs)
            if( rad < (global.vineThicknes/2) ) rad = global.vineThickness/2
            
            // draw circle
            g.beginPath()
            g.moveTo(p.x,p.y)
            g.arc(p.x,p.y,rad,0,twopi)
            g.fill()
        }
         
        return []
    }
}