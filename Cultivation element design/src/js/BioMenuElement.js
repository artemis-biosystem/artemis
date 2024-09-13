class BioMenuElement {
    constructor(objType, x, y, presentationScale) {
        this.type = objType; // Type of biological object
        this.frame = {width: 0, height: 0};
        //= objType.frame;
        this.frame.width = objType.frame.width * presentationScale;
        this.frame.height = objType.frame.height * presentationScale;
        //this.img = objType.img,
        this.x = x; // x positin
        this.y = y; // y position
        this.dx = 0; // x shift upon selection
        this.dy = 0; // y shift upon selection
        this.orientation = 0; // Orientation, assuming 0 is default
        this.BioObjs = []; // Array of other BioObj instances
        //this.Connections = []; // Connections to other BioObjs
        this.isDraggable = false; // Initially draggable
        this.isSelected = false; // Initially not selected
        this.isSelectable = true; // Initially selectable
        this.presentationScale = presentationScale;
    }
    // Function to handle drawing the object
    drawMe() {
        push(); // Start a new drawing state
        translate(this.x, this.y);
        rotate(this.orientation);
        scale(this.presentationScale);
        // Assume imgFile holds a p5.Image object
        this.type.drawMe();
        pop(); // Restore original state
        // Draw connections
        // for (let conn of this.Connections) {
        //   line(0, 0, conn.x - this.x, conn.y - this.y);
        // }
    }
    // Check if the mouse is over the object and can be dragged
    checkSelection() {
        if (
            this.isSelectable &&
            mouseX > this.x &&
            mouseX < this.x + this.frame.width &&
            mouseY > this.y &&
            mouseY < this.y + this.frame.height
        ) {
            this.isSelected = true;
            this.dx = mouseX - this.x;
            this.dy = mouseY - this.y;
            // this.isDraggable = true;
        }
        return this.isSelected;
    }
    mousePressed() {
        print("Give me birth " + this.type.name);
        let newInstance = new BioObj(
            this.type,
            this.x,
            this.y,
            bioObjs.length
        );
        newInstance.isSelected = true;
        newInstance.dx = mouseX - this.x;
        newInstance.dy = mouseY - this.y;
        bioObjs.push(newInstance);
        this.isSelected = false;
    }
}


let menuItemsLocs = [];
let menuPresentationScale = 0.6;
function menuItemsSetup() {
//>>>>>>> let locs=xxxxx  define a loc per object menu !!!
    const spacer = 20;
    let loc0 = {x:30, y:60};
    let box = 63*menuPresentationScale;
    //old order of elements:
    // menuItemsLocs[0] = {x:-1, y:-1}; //ignore. bioObjType 0 is the blade itself
    // menuItemsLocs[1] = {x:loc0.x, y:loc0.y}; //Chamber 6x4
    //
    // menuItemsLocs[2] = {x: round(menuItemsLocs[1].x+spacer+6*63*menuPresentationScale), y: round(menuItemsLocs[1].y)}; // stumuli util 3x3
    // menuItemsLocs[3] = {x: round(menuItemsLocs[2].x+spacer+3*63*menuPresentationScale), y: round(menuItemsLocs[1].y)}; // terminal pipe 1x1
    // menuItemsLocs[4] = {x: round(menuItemsLocs[2].x+spacer+3*63*menuPresentationScale), y: round(menuItemsLocs[1].y+spacer+1*63*menuPresentationScale)}; // pipe pipes 1x1
    // //obj type 5 (old pump) to be hidden. for simplicity: just adding 2000 to it's x location:
    // menuItemsLocs[5] = {x: round(menuItemsLocs[2].x)+2000, y: round(menuItemsLocs[1].y+spacer+3*63*menuPresentationScale)}; // OLD - hide - old pump 3x3
    // menuItemsLocs[6] = {x: round(menuItemsLocs[4].x), y: round(menuItemsLocs[4].y+spacer+1*63*menuPresentationScale)}; // pipe (turn)  pipes 1x1
    // menuItemsLocs[7] = {x: round(menuItemsLocs[1].x), y: round(menuItemsLocs[1].y+spacer+4*63*menuPresentationScale)}; // big pipe 2x2
    // menuItemsLocs[8] = {x: round(menuItemsLocs[7].x+spacer+2*63*menuPresentationScale), y: round(menuItemsLocs[7].y)}; // spectro utils 2x2
    // menuItemsLocs[9] = {x: round(menuItemsLocs[7].x), y: round(menuItemsLocs[7].y+spacer+2*63*menuPresentationScale)}; // pump 2x3
    // menuItemsLocs[10] = {x: round(menuItemsLocs[8].x), y: round(menuItemsLocs[8].y+spacer+2*63*menuPresentationScale)}; // heat 3x3
    // //item 1: new pump. located at the old loc of item 5, old pump:
    // menuItemsLocs[11] = {x: round(menuItemsLocs[2].x), y: round(menuItemsLocs[1].y+spacer+3*63*menuPresentationScale)}; // pump 3x3
    // menuItemsLocs[12] = {x: round(menuItemsLocs[11].x), y: round(menuItemsLocs[11].y+spacer+3*63*menuPresentationScale)}; // chamber 4x4
    // menuItemsLocs[13] = {x: round(menuItemsLocs[1].x), y: round(menuItemsLocs[1].y+spacer+10*63*menuPresentationScale)}; // chamber 2x2

    // new order of elements:
    menuItemsLocs[0] = {x:-1, y:-1}; //ignore. bioObjType 0 is the blade itself
    menuItemsLocs[1] = {x:loc0.x, y:loc0.y}; //Chamber 6x4
    menuItemsLocs[12] = {x: loc0.x + spacer + 6*box, y: loc0.y} // chamber 4x4
    menuItemsLocs[13] = {x: loc0.x, y: loc0.y + spacer + 4*box}; // chamber 2x2

    loc0 = {x: round(menuItemsLocs[13].x) + spacer + 2*box, y:round(menuItemsLocs[13].y)}
    menuItemsLocs[16] = {x: loc0.x, y: loc0.y}; // opening pipe 1x2
    menuItemsLocs[7] = {x:loc0.x + 1*spacer + 1*box, y:loc0.y};  // big round pipe 2x2
    loc0 = {x: round(menuItemsLocs[7].x) + spacer + 2*box, y:round(menuItemsLocs[7].y)}
    menuItemsLocs[3] = {x: loc0.x , y: loc0.y} // terminal pipe 1x1
    menuItemsLocs[4] = {x:loc0.x + 1*spacer + 1*box, y: loc0.y}; // pipe pipes 1x1
    menuItemsLocs[5] = {x: loc0.x + 2000, y: loc0.y}; // OLD thus HIDDEN - old pump 3x3
    menuItemsLocs[6] = {x: loc0.x + 2*spacer + 2*box, y: loc0.y}; // pipe (turn)  pipes 1x1
    menuItemsLocs[14] = {x: loc0.x , y: loc0.y + 1*spacer + 1*box}; // X pipe 1x1
    menuItemsLocs[15] = {x: loc0.x + 1*spacer + 1*box, y: loc0.y + 1*spacer + 1*box}; // T pipe 1x1

    loc0.x = round (menuItemsLocs[13].x);
    loc0.y += spacer + 3*box;
    menuItemsLocs[2] = {x: loc0.x + 0*spacer + 0*box, y: loc0.y}; // pressure unit /stumuli util 3x3 - aka pressure unit
    menuItemsLocs[11] = {x: loc0.x + 1*spacer + 3*box, y: loc0.y}; // pump 3x3
    menuItemsLocs[9] = {x: loc0.x + 2*spacer + 6*box, y: loc0.y}; // pump 2x3
    menuItemsLocs[8] = {x: loc0.x + 3*spacer + 8*box, y: loc0.y}; // spectro utils 2x2
    menuItemsLocs[10] = {x: loc0.x + 2000+ 4*spacer + 3*box, y: loc0.y}; // HIDDEN  heat 3x3

    let bme;
    let y0 = modalLocY + 60;
    let yi = y0;
    for (let i = 1; i < min(bioObjTypes.length, menuItemsLocs.length); i++) { //starting from 1, as 0 is the frame background itself (the bag cut)
        bme = new BioMenuElement(
            bioObjTypes[i],
            menuItemsLocs[i].x + modalLocX,
            menuItemsLocs[i].y + modalLocY,
            menuPresentationScale
        );
        bioMenuElements.push(bme);
        yi += y0 + bme.frame.height + 15;
    }
}