let version = "1.1.7";

let gridBlue;// = color(50, 162, 168);
let lightGray;// = color(220, 220,220);


let gridStep = 20; //20; // 20 pix boxes. with image of 3X3 to be 60 pix (63mm??)
let bioObjs = []; // actual objects placed on the sheet
let bioMenuElements = []; // menu elements - bio bojects prototypes to be dragged (give birth and drag the child) to the grid
let bioObjsRef = []; //reference to objects to be placed on the modal
let bioObjTypes = [];
let img = [];
let imgPath = [];

let snapSound;
let wooshSound;
let rotateSound;
let trashCan;
let trashCanImage;

let pegBoardImg;
let pegBoardStep = {pad:68, hole:43, space:20}; // step size is 63!!!   i.e. 21 mm       initial pad. i.e. the actual loc of hole0 (and not only the 10 pix until hole0 on the board)
let pegBoardAlign = {x:58, y:58};
let pegBoardFrame = {width:1260, height:820}; //{width:1191, height:774};

let WW; //windowWidth
// let tstSvgImage = new SvgImage();

//let modal;
function preload() {
    // Assuming 'example.png' is in the project directory

    preloadObjTypes();


    pegBoardImg = loadImage("./imgs/pegBoard.png");
    trashCanImage = loadImage("./imgs/trashCan.png");

    soundFormats('mp3', 'ogg', 'wav');
    snapSound = loadSound('./sounds/finger-snap-179180.mp3');
    wooshSound = loadSound('./sounds/woosh.wav');
    rotateSound = loadSound('./sounds/rotateWoosh.wav');

   // tstSvgImage = new SvgImage("./imgs/triangle.svg", true)
}

function setup() {
    createCanvas(wPix, hPix); //(windowWidth, hPix); //(wPix, hPix);
    angleMode(DEGREES);
    WW = windowWidth;
    gridBlue = color(50, 162, 168);
    lightGray = color(220, 220,220);

    // strokeWeight(1);
    // stroke(gridBlue);
    // fill(220,220,220,100);
    // strokeWeight(0.1);
    // stroke(gridBlue); //(140);
    // fill(120);
    // fill(gridBlue); //(140);

    guiSetup();
    setupObjTypes();
    menuItemsSetup();
    svgSetup();

    //blade setup:
    birthBlade();

    // offline bg grid creation:
    // offlineSVGGridCreator(1,2,21);

}

function birthBlade() {
    bioObjs[0] = new BioObj(
        bioObjTypes[0],
        33,
        33,
        bioObjs.length
    );
    bioObjs[0].isSelectable = false;
    bioObjs[0].isDraggable = false;

}
function draw() {
    background(250);
    drawGrid2();
    drawRuller();
    push();
    tint(255,50);
    image(pegBoardImg, pegBoardAlign.x, pegBoardAlign.y);//, pegBoardFrame.width, pegBoardFrame.height);
    stroke(gridBlue);
    fill(220,220,220,100);
    textSize(40)
    text("BioLab Creator Sketch Board", 170,54);
    pop();

    drawGUI();
    drawRuller2();
    for (bioMenuElement of bioMenuElements) {
        bioMenuElement.drawMe();
    }
    for (bioObj of bioObjs) {
        bioObj.drawMe();
    }

    text("Version " + version, width-120, height-12);

    showAllTitles(80);
    showTooltip (mouseOnMenuItem(),20);

}

