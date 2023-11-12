// animated ivy branch
class Vine {
    constructor(scaffold,start,stop){
        this.scaffold = scaffold
        scaffold.occupied = true
        this.start = start
        this.stop = stop
        this.reverse = (stop<start)
        
        var [a,b] = scaffold.getAB(start,stop)
        this.a = a
        this.b = b
        
        let d = b.sub(a)
        this.d = d
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
        
        // check if there is still space on the current scaffold
        if( (!this.reverse) && (this.stop<.8) ){
            
            // continue on the current scaffold
            let newStop = this.stop+randRange(.3,.5)
            if( newStop > 1 ) newStop = 1
            return [new Vine(this.scaffold,this.stop,newStop)]
        }
        
        // check if there is still space on the current scaffold
        if( (this.reverse) && (this.stop>.2) ){
            
            // continue on the current scaffold
            let newStop = this.stop-randRange(.3,.5)
            if( newStop < 0 ) newStop = 0
            return [new Vine(this.scaffold,this.stop,newStop)]
        }
        
        // look for next scaffold somewhere in front-right
        let p = this.b//.add(vp(this.d.getAngle()+pio4,global.maxJump))
        let s = this.getNearestUnoccupiedScaffold(p)
        
        // grow on new scaffold
        if( s ){
            if( s[1] ){
                return [new Vine(s[0],0,randRange(.3,.5))]
            } else {
                return [new Vine(s[0],1,1-randRange(.3,.5))]
            }
        }
        
        // stop growing
        return []
    }
    
    getNearestUnoccupiedScaffold(p){
        let mj2 = Math.pow(global.maxJump,2)
        let result = null
        let md2 = Infinity
        global.allScaffolds.forEach( s => {
            if( s.occupied ) return
            
            let d2 = p.sub(s.a).getD2()
            if( (d2<mj2) && (d2<md2) ){
                md2 = d2
                result = [s,true]
            }
            
            d2 = p.sub(s.b).getD2()
            if( (d2<mj2) && (d2<md2) ){
                md2 = d2
                result = [s,false]
            }
        })
        return result
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