// a static line segment for ivy to wrap around
class Scaffold {
    constructor(a,b){
        this.a = a
        this.b = b
        this.angle = b.sub(a).getAngle()
    }
    
    draw(g){
        g.moveTo(this.a.x, this.a.y)
        g.lineTo(this.b.x, this.b.y)
    }
    
    // get subsegment
    getAB(start=0,stop=1){
        let [a,b] = [this.a,this.b]
        return [va(a,b,start), va(a,b,stop)]
    }
}