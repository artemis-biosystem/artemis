class BioObjType {
    constructor(id, name, family, description, imgPath, imgObj, mySVG, frame, frameMM) {
        this.id = id;
            this.name = name;
            this.family = family;
            this.description = description;
            this.svg = mySVG;
            this.img = imgObj; // reference to an image object
            this.imgPath = imgPath; // Path to an image file
            this.frame = frame; // frame might include dimensions or additional     details like openings...
            this.frameMM = frameMM;
    }

    toJson() {
        let jsonObj = {
            id: this.id,
            name: this.name,
            family: this.family,
            description: this.description,
            frame: this.frame,
            imgPath: this.imgPath,
            frameMM: this.frameMM
        };
        //return JSON.stringify(jsonObj);
        return jsonObj;
    }

    NOT_IN_USE_fromJson(jsonObj) {
        //if (this.id<1000) return; //??
        //let jsonObj = JSON.parse(jsonString);
        this.frame = jsonObj.frame;
        this.frameMM = jsonObj.frameMM;
        this.name = jsonObj.name;
        this.id = jsonObj.id;
        this.family = jsonObj.family;
        this.description = jsonObj.description;
        // Assuming you have a way to reload or reference images by path
        if (typeof jsonObj.imgFile === 'string' && jsonObj.imgFile.endsWith('.png')) {
            this.imgFile = loadImage(jsonObj.imgFile); // This needs to be handled asynchronously in p5.js
        } else {
            this.imgFile = jsonObj.imgFile;
        }
        this.type = jsonObj.type;
        this.x = jsonObj.x;
        this.y = jsonObj.y;
        this.orientation = jsonObj.orientation;
        this.isDraggable = jsonObj.isDraggable;
        this.isSelected = jsonObj.isSelected;
        this.isSelectable = jsonObj.isSelectable;
    }

    drawMe() {
        image(this.img, 0, 0, this.frame.width, this.frame.height);
    }


    getSVG(dx, dy, alfa) {
        let rotationHead = "";
        let rotationTail = "";
        if (alfa != 0) {
            rotationHead = "<g transform = \"rotate(" + alfa + " " + this.frameMM.mmx / 2 + " " + this.frameMM.mmy / 2 + ")\">";
            rotationTail = "\r\n</g>";
        }
        let res = `<g transform = \"translate(` + (dx) * pixToMMScale + " " + (dy) * pixToMMScale + ")" + `\">\r\n`;
        res += rotationHead;
        res += this.svg;
        res += rotationTail;
        res += "\r\n</g>";
        return res;
    }

}


function preloadObjTypes() {
    imgPath[0] = "./imgs/bag_cut.png";
    imgPath[1] = "./imgs/126x84_chamber_big.png"; //6x4X63pix
    imgPath[2] = "./imgs/63x63_stumuli.png";
    imgPath[3] = "./imgs/21x21_close_pipe.png";
    imgPath[4] = "./imgs/21x21_pipe-08B.png";
    imgPath[5] = "./imgs/63x63_old_pump.png";
    imgPath[6] = "./imgs/21x21_pipe_turn.png";
    imgPath[7] = "./imgs/42x42_pipe_big_turn.png";
    imgPath[8] = "./imgs/42x42_spectro.png";
    imgPath[9] = "./imgs/42x63_air_pump.png";
    imgPath[10] = "./imgs/63x63_heat_unit.png";
    imgPath[11] = "./imgs/63x63_new_pump_fixed.png";
    imgPath[12] = "./imgs/84x84_small_chamber.png";
    imgPath[13] = "./imgs/42x42_mini_chamber.png";

    imgPath[14] = "./imgs/21x21_x_pipe.png";
    imgPath[15] = "./imgs/21x21_t_pipe.png";
    imgPath[16] = "./imgs/21x42_opening_pipe.png";

    let i = 0;
    for (path of imgPath) {
        img[i] = loadImage(path);
        i++;
    }
}
//ratio for current bag cut img /svg: 3.134
function setupObjTypes() {
    bioObjTypes[0] = new BioObjType(0, "Main blader cut", "infra", "optional tooltip...", imgPath[0], img[0], entireBag_SVG, {
        width: 1310,
        height: 869
    }, {mmx: 418, mmy: 271}); //{mmx: 399, mmy: 252});

    bioObjTypes[1] = new BioObjType(1, "Chamber", "Chambers", "optional tooltip...", imgPath[1], img[1], _126x184_chamber_big, {
        width: 6*63,
        height: 4*63,
    }, {mmx: 6*21, mmy: 4*21});

    bioObjTypes[2] = new BioObjType(2, "Pressure Unit", "Utility", "AKA Stimuli", imgPath[2], img[2], _63X63_stumuli, {
        width: 3*63,
        height: 3*63
    }, {mmx: 3*21, mmy: 3*21});

    bioObjTypes[3] = new BioObjType(3, "Terminal", "Pipes", "optional tooltip...", imgPath[3], img[3], closePipe, {
        width: 1*63,
        height: 1*63
    }, {mmx: 1*21, mmy: 1*21});

    bioObjTypes[4] = new BioObjType(4, "Pipe", "Pipes", "simple pipe 21X21 mm", imgPath[4], img[4], type21x21_pipi_08, {
        width: 1*63,
        height: 1*63
    }, {mmx: 1*21, mmy: 1*21});

    bioObjTypes[5] = new BioObjType(5, "Old pump", "Pumps", "optional tooltip...", imgPath[5], img[5], _63X63_old_pump, {
        width: 3*63,
        height: 3*63
    }, {mmx: 3*21, mmy: 3*21});

    bioObjTypes[6] = new BioObjType(6, "Pipe", "Pipes", "optional tooltip...", imgPath[6], img[6], type21x21_pipe_turn, {
        width: 1*63,
        height: 1*63
    }, {mmx: 1*21, mmy: 1*21});

    bioObjTypes[7] = new BioObjType(7, "Pipe", "Pipes", "optional tooltip...", imgPath[7], img[7], type42x42_pipe_big_turn, {
        width: 2*63,
        height: 2*63
    }, {mmx: 2*21, mmy: 2*21});

    bioObjTypes[8] = new BioObjType(8, "Spectro", "Meter", "optional tooltip...", imgPath[8], img[8], type42x42_spectro, {
        width: 2*63,
        height: 2*63
    }, {mmx: 2*21, mmy: 2*21});

    bioObjTypes[9] = new BioObjType(9, "Air Pump", "Pumps", "optional tooltip...", imgPath[9], img[9], type42x63_air_pump, {
        width: 2*63,
        height: 3*63
    }, {mmx: 2*21, mmy: 3*21});

    bioObjTypes[10] = new BioObjType(10, "Heat Unit", "Utility", "optional tooltip...", imgPath[10], img[10], type63x63_heat_pump, {
        width: 3*63,
        height: 3*63
    }, {mmx: 3*21, mmy: 3*21});

    bioObjTypes[11] = new BioObjType(11, "Pump", "Pumps", "optional tooltip...", imgPath[11], img[11], type63x63_new_pump, {
        width: 3*63,
        height: 3*63
    }, {mmx: 3*21, mmy: 3*21});

    bioObjTypes[12] = new BioObjType(12, "Small Chamber", "Chambers", "optional tooltip...", imgPath[12], img[12], type84x84_small_chamber, {
        width: 4*63,
        height: 4*63
    }, {mmx: 4*21, mmy: 4*21});

    bioObjTypes[13] = new BioObjType(13, "Mini Chamber", "Chambers", "optional tooltip...", imgPath[13], img[13], type42x42_mini_chamber, {
        width: 2*63,
        height: 2*63
    }, {mmx: 2*21, mmy: 2*21});

    imgPath[14] = "./imgs/21x21_x_pipe.png";
    imgPath[15] = "./imgs/21x21_t_pipe.png";
    imgPath[16] = "./imgs/21x42_opening_pipe.png";
    bioObjTypes[14] = new BioObjType(14, "X Pipe", "Pipes", "optional tooltip...", imgPath[14], img[14], type21x21_x_pipe, {
        width: 1*63,
        height: 1*63
    }, {mmx: 1*21, mmy: 1*21});

    bioObjTypes[15] = new BioObjType(15, "T Pipe", "Pipes", "optional tooltip...", imgPath[15], img[15], type21x21_t_pipe, {
        width: 1*63,
        height: 1*63
    }, {mmx: 1*21, mmy: 1*21});

    bioObjTypes[16] = new BioObjType(16, "Opening", "Pipes", "optional tooltip...", imgPath[16], img[16], type21x42_opening_pipe, {
        width: 1*63,
        height: 2*63
    }, {mmx: 1*21, mmy: 2*21});

}


