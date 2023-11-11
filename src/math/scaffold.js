// a static line segment for ivy to wrap around
class Scaffold {
    constructor(a,b){
        this.a = a
        this.b = b
        
        
        // Create clipping path to occlude parts of vines
        var norm = vp(b.sub(a).getAngle()+pio2,global.vineThickness/2)
        let clip = new Path2D();
        let p = this.a.add(norm)
        clip.moveTo(p.x,p.y);
        p = this.a.sub(norm)
        clip.lineTo(p.x,p.y);
        p = this.b.sub(norm)
        clip.lineTo(p.x,p.y);
        p = this.b.add(norm)
        clip.lineTo(p.x,p.y);
        clip.closePath()
        this.clip = clip
    }
    
    draw(g){
        g.moveTo(this.a.x, this.a.y)
        g.lineTo(this.b.x, this.b.y)
    }
}