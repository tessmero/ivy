
function doRandomPattern(){
    
    
    let allPatterns = [
        squarePattern,
        hexPattern,
    ]
    
    allPatterns[Math.floor(randRange(0,allPatterns.length))]()
}