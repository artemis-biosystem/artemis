//buttons:
let removeLastButton;
let rotateSeleletedButton;
let saveSketchButton;
let loadSketchButton;

let buttX; // = 160;// -200; //-75; //160;
let buttY = -70; //10; //720;
let buttDy = 25;
let buttDx = 130; //0;//130;
let modal;
let modalLocX;// = 500; //windowWidth-400; //500;
let modalLocY = 40;

let mouse0 = {x:0, y:0};


function guiSetup() {
    modalLocX = 1380; //WW-400;
    modal = new GUIModal();//must be called after bioOBjTypes is initiated
    buttX = modal.frame.width-145;
    // buttX +=modal.x;
    // buttY+=modal.y+modal.h-75;

    // removeLastButton = createButton("Remove Last");
    // removeLastButton.position(buttX, buttY);
    // removeLastButton.size(120, 20);
    // removeLastButton.mousePressed(removeLastButtonEvt);
    // buttX += buttDx;
    //buttY += buttDy;
    // rotateSeleletedButton = createButton("Rotate Selected");
    // rotateSeleletedButton.position(buttX, buttY);
    // rotateSeleletedButton.size(120, 20);
    // rotateSeleletedButton.mousePressed(rotateSeleletedButtonEvt);
    // buttX -= buttDx;
    // buttY += buttDy;
    saveSketchButton = createButton("Save Sketch");
    saveSketchButton.position(buttX+modal.x, buttY+modal.y+modal.frame.height);
    saveSketchButton.size(120, 20);
    saveSketchButton.mousePressed(saveSketchButtonEvt);
    //buttX += buttDx;
    buttY += buttDy;
    // loadSketchButton = createButton("Load Sketch");
    // loadSketchButton.position(buttX, buttY);
    // loadSketchButton.size(120, 20);
    // //loadSketchButton.mousePressed(loadSketchButtonEvt);
    //
    // loadSketchButton = createFileInput(processFiles, false);
    loadSketchButton = createButton("Load Sketch");
    loadSketchButton.position(buttX+modal.x, buttY+modal.y+modal.frame.height);
    loadSketchButton.size(120, 20);

    loadSketchButton.mousePressed(() => {
        fileInput = createFileInput(handleFile);
        fileInput.hide(); // hide the actual file input element
        fileInput.elt.click(); // simulate click to open file dialog
    });


    //trashCan = new TrashCanObj(220+ modal.x, 520, trashCanImage);
    trashCan = new TrashCanObj( modal.x+20, modal.y+modal.frame.height-80, trashCanImage);


}

function removeLastButtonEvt() {
    showAlert2("removeLastButtonEvt");
}

function rotateSeleletedButtonEvt() {
    showAlert2("rotateSeleletedButtonEvt");
}

function saveSketchButtonEvt() {
    //TODO: gather page setup and run through all objects...
    //accumulate their json
    //accumulate their svg..
    showAlert2("saveSketchButtonEvt");
    let svg = "";
    let json = `{"bioObjects":[`;
    //svg +=`<g transform = \"translate(`+(35-pegBoardAlign.x*pixToMMScale)+" "+(35-pegBoardAlign.y*pixToMMScale)+")"+`\">\r\n`; //basic alignment for the entire sketch & shift all slightly to the right/bottom
    svg +=`<g transform = \"translate(`+0+" "+0+")"+`\">\r\n`; //basic alignment for the entire sketch & shift all slightly to the right/bottom
    for (bioObj of bioObjs) {
        let terminalChar = "";

        if (bioObj !== bioObjs[bioObjs.length-1]) terminalChar = ",";
;        json +="\r\n" +bioObj.toJson()+terminalChar;
        svg += "\r\n" + bioObj.getSVG();
    }
    json +="]}";//svg += svgHeader;
    svg+="\r\n</g>";
    setSVGBody(svg);
    setSVGJson(json);
    exportSVGFile();
}

// function loadSketchButtonEvt() {
//     showAlert2("loadSketchButtonEvt");
//     createFileInput(processInputFile);
// }



function drawGUI() {
    modal.drawMe();
    trashCan.drawMe();
}

function mousePressed() {//event is triggered by OS
    mouse0.x = mouseX;
    mouse0.y = mouseY;
    print("mousePressed detected");
    let selected = false;
    for (bioMenuElement of bioMenuElements) {
        selected = bioMenuElement.checkSelection();
        if (selected) {
            //print("inside obj: " + bioMenuElement.type.name + ", selected: " + selected);
            bioMenuElement.mousePressed();
            return;
        }
    }
   //else:
    for (let i = bioObjs.length - 1; i >= 0; i--) {
        let bioObj = bioObjs[i];
        selected = bioObj.checkSelection();
        if (selected) return;
    }

    if (isInsideRect(mouseX, mouseY, trashCan) && (abs(mouse0.x - mouseX) < 2 && abs(mouse0.y - mouseY) < 2)) {
        //practically clicked on the trashcan
        //clear all !
        wooshSound.play();
        bioObjs.length = 1;
       // birthBlade();
    }

}

function mouseDragged() {//event is triggered by OS
    for (bioObj of bioObjs) {
        bioObj.dragMe();
    }
}

function mouseReleased() {//event is triggered by OS
   let i=0;
    for (bioObj of bioObjs) {
        bioObj.mouseReleased();
        if (bioObj.wasJustTrashed) { // dropped an object inside the trash can
            bioObjs.splice(i,1);
            print ("about to remove obj "+ i);
            //bioObj =null;
        } else {
            i++;
        }
    }
}






class GUIModal {
    constructor() {
        this.x = modalLocX;
        this.y = modalLocY;
        this.frame = {width: 480, height: 760};
    }

    dragMe(){}

    drawMe(){
        //push();
        strokeWeight(1);
        stroke(gridBlue);
        //noFill();
        fill(220,220,220,100);
        rect(this.x, this.y, this.frame.width, this.frame.height,6,6 );

        push();
        translate(this.x, this.y);
        textSize(20);
        text("Choose Elements", 10,25);
        textSize(17);
        text("Drag to place, click to rotate, drag back to remove", 10,50);
        pop();
       //pop();
    }

}