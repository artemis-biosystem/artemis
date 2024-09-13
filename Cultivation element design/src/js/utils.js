let fileInput;
let inputData;
//let svgInStrings;
let loadedJsonObjectsArray;

function drawGrid2() {
    // grid2Step = {pad:10, hole:42, space:20};
    let w = 1400; //width;
    let h = 900; //height;
    push();
    strokeWeight(0.1);
    stroke(gridBlue); //(140);
    fill(120);
    for (let i = pegBoardStep.pad - pegBoardStep.space / 2; i < w; i = i + pegBoardStep.hole + pegBoardStep.space) {
        line(i, 0, i, h);
    }
    for (let i = pegBoardStep.pad - pegBoardStep.space / 2; i < h; i = i + pegBoardStep.hole + pegBoardStep.space) {
        line(0, i, w, i);
    }
    pop();
}

// function drawGrid(pix, wText, wXY) {
//     let w = 1400; //width;
//     let h = 900; //height;
//     push();
//     strokeWeight(0.1);
//     stroke(gridBlue); //(140);
//     fill(120);
//     let title = "";
//     if (wXY) {
//         title = "x=";
//     }
//     for (i = pix; i < w; i = i + pix) {
//         line(i, 0, i, h);
//         if (wText) text(title + i, i + 2, 15);
//     }
//     title = "";
//     if (wXY) title = "y=";
//     for (i = pix; i < h; i = i + pix) {
//         line(0, i, w, i);
//         if (wText) text(title + i, 3, i + 13);
//     }
//     pop();
// }

//external ruller in pix
function drawRuller() {
    let w = 1400; //width;
    let h = 900; //height;
    const rullerStep = 50; //40
    push()
    strokeWeight(0.4);
    stroke(gridBlue); //(140);
    fill(gridBlue);
    textSize(10);
    line(2, 0, 2, h);
    for (let i = rullerStep; i < h; i = i + rullerStep) {
        line(1, i, 5, i);
        text(i, 6, i + 3);
    }

    line(0, 2, w, 2);
    for (let i = rullerStep; i < w; i = i + rullerStep) {
        line(i, 1, i, 5);
        text(i, i - 5, 17);
    }
    pop();
}

// internal ruller in mm
function drawRuller2() {
    const step = pegBoardStep.hole + pegBoardStep.space;
    let w = 20 * step + 1; //width;
    let h = 13 * step + 1; //height;
    const rullerStep = step; //40
    push()
    translate(57, 57);
    strokeWeight(0.4);
    stroke(255, 100, 100, 120); //(140);
    fill(255, 100, 100, 120);
    textSize(10);
    line(2, 0, 2, h);
    for (let i = rullerStep; i < h; i = i + rullerStep) {
        line(1, i, 5, i);
        text(i / 3 + "mm", 6, i + 3);
    }

    line(0, 2, w, 2);
    for (let i = rullerStep; i < w; i = i + rullerStep) {
        line(i, 1, i, 5);
        text(i / 3 + "mm", i - 5, 17);
    }
    pop();
}

let alertMsg = "";

function showAlert(txt, c) {
    stroke(100);
    fill(c);
    textSize(20);
    text(txt, gridStep + 2, gridStep - 2)
}

function showAlert2(txt) {
    print(txt);
}

function intersects(rect1, rect2) { // each rect has an x,y and frame.width, frame.height
    let x = parseInt(rect1.x);
    let y = parseInt(rect1.y);
    if (isInsideRect(x, y, rect2)) return true;
    //print(rect1.frame.width);
    let x2 = rect1.frame.width + x;
    // let y = rect1.y;
    if (isInsideRect(x2, y, rect2)) return true;
    let y2 = rect1.frame.height + y;
    if (isInsideRect(x, y2, rect2)) return true;
    if (isInsideRect(x2, y2, rect2)) return true;
    return false;
}

function isInsideRect(x, y, rect2) {
    if (x > rect2.x && x < rect2.x + rect2.frame.width && y > rect2.y && y < rect2.y + rect2.frame.height) {
        return true;
    }
    return false;
}

// let tmp = `
// {"type":{"id":0,"name":"ann","family":"connectors family","description":"this is bla bla bla ann of c.f.","frame":{"width":112,"height":114}},"x":440,"y":240,"orientation":0,"isDraggable":true,"isSelected":false,"isSelectable":true,"BioObjs":[]}
// `;
function mouseOnMenuItem() {
    for (let i=0; i<bioMenuElements.length; i++) {
        if (isInsideRect(mouseX, mouseY, bioMenuElements[i])) {return i;}
        }
    return -1;
}

function showTooltip(i, c){
    if (i!=-1) {
        push();
        strokeWeight(0.3);
        stroke(c);
        fill(c);
        translate(bioMenuElements[i].x, bioMenuElements[i].y+ bioMenuElements[i].frame.height+12);
        textSize(11);
        text(bioMenuElements[i].type.name, 0,0);
        pop();


    }
}

function showAllTitles(c){
	for (let i=0; i<bioMenuElements.length; i++) {
        showTooltip(i, c);
	}
}	

function handleFile(file) {
    if (file.type === 'image') {
        inputData = "";
        loadStrings(file.data, doneLoading);
    } else {
        console.log("file type seems wrong (expecting an image... SVG with internal BioLab meta data");
    }
}

function doneLoading(inputArr) {
    for (let i = 0; i < inputArr.length; i++) {
        inputData += inputArr[i] + "\r\n"; //.getContent()+"\r\n";
    }
    let theJsonStr = extractSubstring(inputData, '<JSON_Descriptor>', '</JSON_Descriptor>');
    console.log(theJsonStr);
    loadedJsonObjectsArray = parseJsonAndGetBioObjects(theJsonStr);
    bioObjs = [];
    for (let i = 0; i < loadedJsonObjectsArray.length; i++) {
        let jsonObj = loadedJsonObjectsArray[i];
        print("Give me birth from loader: " + jsonObj.type.name);
        let theTypeID = jsonObj.type.id;
        let theType = null;
        for (const type of bioObjTypes) {
            if (type.id === theTypeID) {
                theType = type;
                break;
            }
        }
        if (theType == null) {
            console.log("NOTE! object type is obsolete and therefore this object was not created! " + jsonObj.type.id + ": " + jsonObj.type.name);
        } else {

            let newInstance = new BioObj(
                theType,
                jsonObj.x,
                jsonObj.y,
                bioObjs.length
                //TODO: more fields to set here !?
            );
            newInstance.isSelected = false;
            newInstance.orientation = jsonObj.orientation;
            bioObjs.push(newInstance);
        }
    }

}

function parseJsonAndGetBioObjects(jsonString) {
    try {
        const jsonObj = JSON.parse(jsonString);
        if (jsonObj && jsonObj.bioObjects) { //note this creates objects from json, but not as I would expect from the fromJson functions. so it's not really those objects yet
            return jsonObj.bioObjects;
        } else {
            console.log("No 'bioObjects' key found in the JSON.");
            return null; // No 'bioObjects' key found
        }
    } catch (error) {
        console.log("Error parsing JSON:", error);
        return null; // Invalid JSON string
    }
}

function extractSubstring(str, head, tail) {
    let startIndex = str.indexOf(head);
    if (startIndex === -1) {
        return null; // head string not found
    }
    // Adjust startIndex to be after the head string
    startIndex += head.length;

    let endIndex = str.indexOf(tail, startIndex);
    if (endIndex === -1) {
        return null; // tail string not found
    }
    // Extract the substring from after head to before tail
    return str.substring(startIndex, endIndex);
}


function offlineSVGGridCreator(w, h, blockSize) {//e.g. for 4x2 blocks of 21 mm enter 4,2,21
    let res = "<g id=\"bg grid " + w + "x" + h + "x" + blockSize + " pix blocks\">\r\n";
    for (let i = 0; i <= w; i++) {
        res += offlineSVGLineStr(i * blockSize, 0, i * blockSize, h * blockSize, "cls-1");
        if (i < w) {
            res += offlineSVGLineStr((i + 0.25) * blockSize, 0, (i + 0.25) * blockSize, h * blockSize, "cls-6");
            res += offlineSVGLineStr((i + 0.75) * blockSize, 0, (i + 0.75) * blockSize, h * blockSize, "cls-6");
        }
    }
    for (let i = 0.0; i <= h; i++) {
        res += offlineSVGLineStr(0, i * blockSize, w * blockSize, i * blockSize, "cls-1");
        if (i < h) {
            res += offlineSVGLineStr(0, (i + 0.25) * blockSize, w * blockSize, (i + 0.25) * blockSize, "cls-6");
            res += offlineSVGLineStr(0, (i + 0.75) * blockSize, w * blockSize, (i + 0.75) * blockSize, "cls-6");
        }
    }
    res += "</g>"
    console.log(res);
}

function offlineSVGLineStr(x1, y1, x2, y2, cls) {
    return "<line class=\"" + cls + "\" x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 + "\" y2=\"" + y2 + "\"/>\r\n";
}

