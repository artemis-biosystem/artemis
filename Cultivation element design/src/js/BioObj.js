class BioObj {
    constructor(objType, x, y, i) {
        this.type = objType; // Type of biological object
        (this.frame = objType.frame);
            //this.img = objType.img,
            (this.x = x); // x position
        this.y = y; // y position
        this.dx = 0; // x shift upon selection (between mouseX and top left corner of the obj!)
        this.dy = 0; // y shift upon selection
        this.orientation = 0; // Orientation, assuming 0 is default
        this.BioObjs = []; // Array of other BioObj instances
        //this.Connections = []; // Connections to other BioObjs
        this.isDraggable = true; // Initially draggable
        this.isSelected = false; // Initially not selected
        this.isSelectable = true; // Initially selectable
        this.index = i;
        this.wasJustTrashed = false;
        print("I'm born! " + this.type.name +", "+ this.index );
    }

    // Function to handle drawing the object
    drawMe() {
        push(); // Start a new drawing state
        translate(round(this.x), round(this.y));
        push();
          //  translate((this.x+this.frame.width/2), (this.y+this.frame.height/2)); // to fix rotation center at the center of the shape. TODO: it works well when w==h. not sure otherwise (mainly re snapping!)

        //AY 1.1.2:
        // translate(round(0+this.frame.width/2), round(0+this.frame.height/2)); // to fix rotation center at the center of the shape. TODO: it works well when w==h. not sure otherwise (mainly re snapping!)
        // rotate(this.orientation);
        // translate(-round(0+this.frame.width/2), -round(0+this.frame.height/2));

        translate((0+this.frame.width/2), (0+this.frame.height/2)); // to fix rotation center at the center of the shape. TODO: it works well when w==h. not sure otherwise (mainly re snapping!)
        rotate(this.orientation);
        translate(-(0+this.frame.width/2), -(0+this.frame.height/2));
        //--/ AY 1.1.2

        //translate(-(this.x+this.frame.width/2), -(this.y+this.frame.height/2));
        // Assume imgFile holds a p5.Image object
            this.type.drawMe();

        pop();
        pop(); // Restore original state
        // Draw connections
        // for (let conn of this.Connections) {
        //   line(0, 0, conn.x - this.x, conn.y - this.y);
        // }
    }

    toJson() {
        let jsonObj = {
            type: this.type.toJson(),
            x: this.x,
            y: this.y,
            orientation: this.orientation,
            isDraggable: this.isDraggable,
            isSelected: this.isSelected,
            isSelectable: this.isSelectable,
            // Serialize BioObjs array recursively if they also implement toJson
            BioObjs: this.BioObjs.map((obj) => obj.toJson()),
            // Connections: this.Connections // Assume Connections are simple objects or similar serialization logic
        };
        print(JSON.stringify(jsonObj))
        return JSON.stringify(jsonObj);
    }

    NOT_IN_USEfromJson(jsonString) {
        let jsonObj = JSON.parse(jsonString);
        this.type.fromJson(jsonObj.type);

        // Assuming you have a way to reload or reference images by path
        // if (typeof jsonObj.imgFile === 'string' && jsonObj.imgFile.endsWith('.png')) {
        //   this.imgFile = loadImage(jsonObj.imgFile); // This needs to be handled asynchronously in p5.js
        // } else {
        //   this.imgFile = jsonObj.imgFile;
        // }
        // this.type = jsonObj.type;
        this.x = jsonObj.x;
        this.y = jsonObj.y;
        this.orientation = jsonObj.orientation;
        this.isDraggable = jsonObj.isDraggable;
        this.isSelected = jsonObj.isSelected;
        this.isSelectable = jsonObj.isSelectable;
        // // Deserialize BioObjs if needed, instantiate new BioObjs
        // // this.BioObjs = jsonObj.BioObjs.map(objData => {
        // //   let newObj = new BioObj(); // Assuming constructor can handle empty initialization
        // //   newObj.fromJson(JSON.stringify(objData)); // Recursively set properties
        // //   return newObj;
        // // });
    }
    // // Function to check if the object is selected
    // isSelected() {
    //   return this.isSelected;
    // }

    // Function to drag the object
    dragMe() {
        if (this.isDraggable && this.isSelected) {
            this.x = mouseX - this.dx;
            this.y = mouseY - this.dy;
        }
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

    // Release the object when mouse is released
    mouseReleased() {
        // this.isDraggable = false;
        if (this.isSelected) {
            this.isSelected = false; // Or keep selected until explicitly deselected
            console.log ("orientation:"+this.orientation+"  ,dx, dy:" + this.dx+", "+this.dy);

            // if (intersects(this, modal)) {
            //     this.isTrashed
            // }
            if (!this.isTrashed()) {
                if (abs(mouse0.x - mouseX) < 2 && abs(mouse0.y - mouseY) < 2) {//practially clicked ! i.e. click to rotate:
                    this.rotateMe();
                }
                this.snapMe();
            }
            mouse0.x = -10;
            mouse0.y = -10;
            // print(this.toJson());
            // print(this.getSVG());

        }
    }

    snapMe() {
        // this.x = this.x - (this.x % gridStep);
        // this.y = this.y - (this.y % gridStep);
        let topleft = {x:this.x, y:this.y};
        const pegBoardTopLeft = pegBoardStep.pad-pegBoardStep.space/2;
        if (this.orientation == 90 || this.orientation == 270) {
            // XX rotate around center (like svg rotation works).
            // Shifting corner in case of non-square shapes, to fit rotation action
                topleft = {x:this.x-(this.frame.width-this.frame.height)/2, y:this.y+(this.frame.width-this.frame.height)/2};
        }

        let xRel = ((topleft.x-pegBoardTopLeft) % (pegBoardStep.hole+pegBoardStep.space))
        if (xRel<(pegBoardStep.hole+pegBoardStep.space)/2) xRel *=-1;
        else xRel = (pegBoardStep.hole+pegBoardStep.space) - xRel;
        this.x = this.x + xRel;

        let yRel = ((topleft.y-pegBoardTopLeft) % (pegBoardStep.hole+pegBoardStep.space));
        if (yRel<(pegBoardStep.hole+pegBoardStep.space)/2) yRel *=-1;
        else yRel = (pegBoardStep.hole+pegBoardStep.space) - yRel;
        this.y = this.y +yRel ;

        snapSound.play();
     }

    rotateMe(){
        this.orientation = (this.orientation+90) % 360;
        rotateSound.play();
    }

    getSVG() {
        return this.type.getSVG(this.x, this.y, this.orientation);
    }

    isTrashed() {
    let res = false;
        //if (intersects(this, trashCan) || intersects(this, modal)) { // added modal too, so that users to populate objects
        if (intersects(this, modal)) { // added modal too, so that users to populate objects t
            print("yes - \"is trashed\" !");
            res = true;
            wooshSound.play();
            this.wasJustTrashed = true;
        }
          return res;
    }
}
