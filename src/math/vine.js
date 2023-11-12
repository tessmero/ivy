// ivy branch segment wrapping around a scaffold
class Vine {
    constructor(scaffold,start,stop,reverseHelix=false,startPadding=null){
        this.scaffold = scaffold
        scaffold.occupied = true
        this.start = start
        this.stop = stop
        this.reverse = (stop<start)
        this.reverseHelix = reverseHelix
        if( startPadding == null ) startPadding = rand() * global.vinePadding
        this.startPadding = startPadding
        this.stopPadding = rand() * global.vinePadding
        
        var [a,b] = scaffold.getAB(start,stop)
        this.a = a
        this.b = b
        
        let d = b.sub(a)
        this.d = d
        let dist = d.getMagnitude()
        
        this.amp = global.helix_d/2
        this.norm = d.getAngle() + pio2
        
        let rd = randRange(...global.spiralDensity)
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
        
        // check if there is still space on the current scaffold
        if( (!this.reverse) && (this.stop<.8) ){
            
            // continue on the current scaffold
            let newStop = this.stop+randRange(...global.helixDist)
            if( newStop > .8 ) newStop = 1
            return [new Vine(this.scaffold,this.stop,newStop,this.reverseHelix)]
        }
        
        // check if there is still space on the current scaffold
        if( (this.reverse) && (this.stop>.2) ){
            
            // continue on the current scaffold
            let newStop = this.stop-randRange(...global.helixDist)
            if( newStop<.2 ) newStop = 0
            return [new Vine(this.scaffold,this.stop,newStop,this.reverseHelix)]
        }
        
        let result = []
        
        do{
        
            // look for next scaffold nearby
            let p = this.b//.add(vp(this.d.getAngle()+pio4,global.maxJump))
            let all_s = this.getNextScaffolds(p)
            shuffle(all_s)
            
            // grow on new scaffold
            if( all_s.length > 0 ){
                let s = all_s.pop()
                
                // check if new scaffodl has same orientation as current
                let rh = this.reverseHelix
                if( Math.abs(s[0].angle-this.scaffold.angle) > .1 ){
                    rh = !rh
                }
                
                if( s[1] ){
                    result.push(new Vine(s[0],0,randRange(...global.helixDist),rh))
                } else {
                    result.push(new Vine(s[0],1,1-randRange(...global.helixDist),rh))
                }
            } else {
                break
            }
            
        }while( rand() < global.branchRate )
        
        return result
    }
    
    getNextScaffolds(p){
        let mj2 = Math.pow(global.maxJump,2)
        let result = []
        global.allScaffolds.forEach( s => {
            if( s.occupied ) return
            
            let d2 = p.sub(s.a).getD2()
            if( (d2<mj2) ){
                result.push([s,true])
            }
            
            d2 = p.sub(s.b).getD2()
            if( (d2<mj2) ){
                result.push([s,false])
            }
        })
        return result
    }
    
    draw(g){
        let newTwigs = []
        
        var a = this.a
        var b = this.b
        var nSegs = this.nSegs
        
        var start = Math.floor(nSegs*this.pt/this.growthDuration)
        var stop = Math.floor(nSegs*this.t/this.growthDuration)
        
        //g.restore()
        
        // draw vine segment
        var prev = a
        for( var i = start ; (i<stop)&&(i<nSegs) ; i++ ){
            var ang = twopi*i/nSegs*this.nPeriods
            var padding = avg(this.startPadding,this.stopPadding,i/nSegs)
            
            // decide whether this should be occluded by scaffold
            let infront = (((ang+pio2)%twopi)<pi)
            g.globalCompositeOperation = infront ? "destination-over" : "source-over";  
            
            // compute point on helix
            var amp = this.amp * Math.sin(ang)
            if( this.reverseHelix ) amp *= -1
            amp += Math.sign(amp) * padding
            var p = va(a,b,i/nSegs).add(vp(this.norm,amp))
            
            //draw circle
            g.beginPath()
            g.moveTo(p.x,p.y)
            g.arc(p.x,p.y,global.vineThickness/2,0,twopi)
            g.fill()
            
            if( rand() < global.twigRate ){
                // add twig to be drawn later
                let angle = this.scaffold.angle+pio2
                if( amp > 0 ) angle += pi
                angle += randRange(-pio4,pio4)
                newTwigs.push( new Twig(p,angle,infront) )
            }
            
            prev = p
        }
         
        return newTwigs
    }
}