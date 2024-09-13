// SVG exporter version: see 2nd row of SVGObj constructor
// version history:
// ver 3 - better animation support + metaContent ready !!
// exports only a single file. (to avoid problem in misuse will animation). if you want to to export another - be sure to set
// allowAnotherExportImage = true after each call to export
// allowAnotherShowImage = true after each call to showImage
// ver 2 - initial animation support
// 1.1 - see that we don't reprint nails in SVG file !!!! Note h and w used to be inverted too !!! --> circles will be printed only one per location. i.e. Nth request to print a circle with the same x,y,r will be ignored.
// All rights reseved to Arnon Yaar. please contact info@telething.com

class SVGObj {
    constructor(widthMM, heightMM, cStroke, cFill, cStrokeWidth, cScale) {
        //print("SVG Exporter version 2.0.1 - Animation friendly");
        print("SVG Exporter version 2.0.2"); // - Animation friendly");
        this.circles = [];
        this.heightMilimeter = heightMM;
        this.widthMilimeter = widthMM;
        this.strokeWidth = cStrokeWidth;
        this.lastStroke = cStroke;
        this.lastFill = cFill;
        this.scale = cScale;
        this.insideG = 0; //counts g sections for transformation style parameters.

        this.allowAnotherShowImage = true;
        this.allowAnotherExportImage = true;
        this.styleAccumulator = "";

//         this.header = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
// <svg
//    xmlns:svg="http:now3.org/2000/svg"
//    xmlns="http://www.w3.org/2000/svg"
//    version="1.1"
//    viewBox="0 0 ${this.widthMilimeter} ${this.heightMilimeter}"
//    height="${this.heightMilimeter}mm"
//    width="${this.widthMilimeter}mm">
//    <style>
        this.header = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   viewBox="0 0 ${this.widthMilimeter} ${this.heightMilimeter}">
   <style>
   ${styleAccumulator}
.def {
      font: 40px sans-serif;
      stroke: blue;
      fill: white;
    }
    .shablona {
      font: 40px sans-serif;
      stroke: green;
      fill: white;
    }
    .heavy {
      font: bold 30px sans-serif;
    }
    /* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
    .Rrrrr {
      font: italic 40px serif;
      fill: red;
    }
  </style>
  
  `;

        this.meta = "";
        this.metaContent = "";

        this.preBody = `
      

      <g transform="scale(${1 / this.scale})">
    `;

        //// BODY will be placed here.. each object with his own <g> allowing translation and rotation per object
        this.body = "";

        this.footer = `

    </g>
    </svg>`;
    }

    showSVGimage() {
        if (this.allowAnotherShowImage) {
            let drawing = `<img src="data:image/svg+xml,${encodeURIComponent(
                this.getSVGcode()
            )}" />`;
            document.write(drawing);
            this.allowAnotherShowImage = false;
        }
    }

    getSVGcode() {
        //set body:
        while (this.insideG > 0) {
            this.body += "\r\n</g>";
            this.insideG--;
        }
        //set metadata:

        this.meta = `<metadata>
      <JSON_Descriptor>
${this.metaContent}
     </JSON_Descriptor>
  </metadata>`;
        return this.header + this.meta + this.preBody + this.body + this.footer;
    }

    export (fileName) {
       if (fileName == null) fileName = "creative";
        if (this.allowAnotherExportImage) {
            //print(this.getSVGcode());
            // Comma Separated Values
            print("SAVING!!!!");
            saveStrings([this.getSVGcode()], fileName, "svg");
            this.allowAnotherExportImage = false;
        }
    }
    // export() {
    //     this.export ("creative");
    // }

    setMetaContent(inContent) {
        this.metaContent = inContent;
    }

    sstroke(c) {
        this.lastStroke = c;
        stroke(c);
    }
    sfill(c) {
        this.lastFill = c;
        stroke(c);
    }
    sline(x1, y1, x2, y2) {
        //add a line to the SVG file, using the lastStroke color:
        this.body += `\r\n<line x1="${round(x1)}" y1="${round(y1)}" x2="${round(
            x2
        )}" y2="${round(y2)}" stroke="${this.lastStroke}" stroke-width="${round(
            this.strokeWidth
        )}"/>`;
        //draw line
        line(x1, y1, x2, y2);
    }
    scircle(x, y, d) {
        //only add the circle to the SVG file if it isn't there yet !!!
        //add a circle to the SVG file, using the lastStroke color:
        let c = new CircleObj(round(x), round(y), round(d / 2));
        if (!circleExists(this.circles, c)) {
            this.circles.push(c);
            this.body += `\r\n<ellipse cx="${c.x}" cy="${c.y}" rx="${c.r}" ry="${c.r}" style="fill:${this.lastFill}; stroke:${this.lastStroke}"/>`;
        }

        //draw circle:
        circle(x, y, d);
    }

    stransform(s, translateX, translateY, r) {
        scale(round(s, 2));
        translate(round(translateX), round(translateY));
        rotate(round(r));

        this.insideG++;
        this.body += `\r\n  <g transform="scale(${round(s, 2)}) translate(${round(
            translateX
        )} ${round(translateY)}) rotate(${round(r)})">`;
    }

    srectRich(x, y, w, h, tx, ty, scaleparam, rotateparam, centerx, centery) {
        print(x + ", " + y + ", " + centerx + ", " + centery);
        x = round(x);
        y = round(y);
        w = round(w);
        h = round(h);
        tx = round(tx);
        ty = round(ty);
        scaleparam = round(scaleparam, 2);
        rotateparam = round(rotateparam);
        centerx = round(centerx);
        centery = round(centery);
        //add a rect to the SVG file, using the lastStroke color:
        this.body += `\r\n <rect x="${x - centerx}" y="${
            y - centery
        }" width="${w}" height="${h}" transform="translate(${tx + centerx} ${
            ty + centery
        }) rotate(${rotateparam}) scale(${scaleparam})" style="fill:${
            this.lastFill
        }; stroke:${this.lastStroke}"/>`;

        //draw rect:
        angleMode(DEGREES);
        push();
        translate(tx + centerx, ty + centery);
        rotate(rotateparam);
        scale(scaleparam);

        rect(x - centerx, y - centery, w, h);
        pop();
    }

    srect(x, y, w, h) {
        srectRich(x, y, w, h, 0, 0, 1, 0, (x + w) / 2, (y + h) / 2);
    }

    stext(t, x, y, c) {
        //add text to the svg file using the lastStoke and lastFill colors:
        if (c == null) c = "def";
        this.body += `\r\n<text x="${round(x)}" y="${round(
            y
        )}" class="${c}">${t}</text>`;

        //draw text:
        //default text style:
        // font: 40px sans-serif;
        //   stroke: black;
        //   fill: white;
        fill("white");
        stroke("blue");
        textSize(40);
        textFont("sans-serif");
        text(t, x, y);
    }

    sclearAll() {
        this.body = "";
        this.insideG = 0;
        this.circles = [];
        this.metaContent = "";
    }

    setMeta(inString){
        this.metaContent = inString;
    }
}


class CircleObj {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
}

function isSimilar(a, b) {
    //res = false;
    if (b.x == a.x) if (b.y == a.y) if (b.r == a.r) return true;
    return false;
}
function circleExists(circles, b) {
    for (let i = 0; i < circles.length; i++) {
        if (isSimilar(circles[i], b)) return true;
    }
    return false;
}