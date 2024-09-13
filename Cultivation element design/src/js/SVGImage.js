// class SvgImage {
//     constructor(str, pathOrContent) {
//         let svgContent;
//         if (pathOrContent){ //str is a path
//             svgContent = loadStrings(path);
//         } else { //str is the actual svg content
//             svgContent = str;
//         }
//         this.drawing= `<img src="data:image/svg+xml,${encodeURIComponent(svgContent)}" />`;
//     }
//
//     drawMe(){
//         document.write(this.drawing);
//     }
//
// }