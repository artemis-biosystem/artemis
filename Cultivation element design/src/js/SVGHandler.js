let svg;

//A4 landscape == 297X210
let screenFactor = 1; //?? not really in use yetTODO - modify to fit expected screen size (related to 2970x2100)
let wPix = 1900; //2100/screenFactor; //3000; //widthMilimeter*pixToMMscale;
let hPix = 910; //20; //2970/screenFactor; //2150; //heightMilimeter*pixToMMscale;
let pixToMMScale = 0.333; //  for presentation and for conversion of pix loc to svg loc. if 0.3333: 3 pix is 1 mm    1;//4; //10;//10/screenFactor; for presentation of the resulted svg on the screen (and for print scale)?
let widthMilimeter; // = 176;  145 // initiated in svgSetup below:
let heightMilimeter; // = 126; 215 // initiated in svgSetup below:
let tempFill = "white";
let tempStrokeWidth = 1;
let tempStroke = "black";
let cutColor = "red";
let glueColor = "black";

function svgSetup() {
    //createCanvas(wPix, hPix);
    let bladerx = bioObjTypes[0].frameMM.mmx;
    let bladery = bioObjTypes[0].frameMM.mmy;
    widthMilimeter = bladerx*1.2; //wPix*1.2*pixToMMScale;
    heightMilimeter = bladery*1.2; //hPix*1.2*pixToMMScale;
    svg = new SVGObj(
        round(widthMilimeter),
        round(heightMilimeter),
        tempStroke,
        tempFill,
        tempStrokeWidth,
        1 //pixToMMScale
    );
    //svg.styleAccumulator = styleAccumulator;
}


function setSVGBody(txt) {
    svg.body = txt;
}

function setSVGJson(txt){
    svg.setMetaContent(txt);
}

function exportSVGFile(){
    svg.export("bioLab_sketch");
    svg.allowAnotherExportImage = true; //otherwise only one export is allowed. this comes from animation friendly version of the svg utility.
}





//
// // Example usage
// let jsonString = `{
//   "bioObjects": [
//     {
//       "type": {
//         "id": 0,
//         "name": "frame",
//         "family": "connectors family",
//         "description": "this is bla bla bla ann of c.f."
//       },
//       "frame": {
//         "width": 2950,
//         "height": 2080
//       },
//       "x": 5,
//       "y": 5,
//       "orientation": 0,
//       "isDraggable": false,
//       "isSelected": false,
//       "isSelectable": false,
//       "BioObjs": []
//     }
//   ]
// }`;
//
