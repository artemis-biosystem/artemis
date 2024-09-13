let styleAccumulator = `
.cls-200{fill:none; stroke-width:2px; stroke:red;stroke-miterlimit:10;}
.cls-300{fill: none; stroke-linejoin:round; stroke:#000;stroke-linecap:round;stroke-width:2px; stroke-miterlimit:10;}
.cls-310{fill: none; stroke-linejoin:round; stroke:#000;stroke-linecap:round;stroke-width:0.666px; stroke-miterlimit:10;}
.cls-210{fill:none; stroke-width:0.666px; stroke:red;stroke-miterlimit:10;}

.cls-1,.cls-4,.cls-5{fill:none; stroke-miterlimit:10;}
.cls-1{opacity:.8;stroke-width:1px;}
.cls-6{opacity:.4;stroke-width:1px;}
._LIGHT_BLUE, .cls-1,.cls-4,.cls-5,.cls-6{stroke:rgb(153, 230, 246);}
.NO_BG_LINES, .cls-1,.cls-4,.cls-5,.cls-6{stroke:none;}
.cls-5{stroke-width:.25px;}
`;


//let entireBag_SVG = `<g id="main bag cut" transform="scale(0.352804342207289 0.352804342207289)">
let entireBag_SVG = `<g id="main bag cut" transform="scale(0.3523 0.3517)">
    <path class="cls-200" d="M1185.1,754.6c7.26,0,13.17,5.91,13.17,13.17s-5.91,13.17-13.17,13.17-13.17-5.91-13.17-13.17,5.91-13.17,13.17-13.17m0-1c-7.83,0-14.17,6.35-14.17,14.17s6.35,14.17,14.17,14.17,14.17-6.35,14.17-14.17-6.35-14.17-14.17-14.17h0Z"/>
    <path class="cls-200" d="M53.69,40.52c7.26,0,13.17,5.91,13.17,13.17s-5.91,13.17-13.17,13.17-13.17-5.91-13.17-13.17,5.91-13.17,13.17-13.17m0-1c-7.83,0-14.17,6.35-14.17,14.17s6.35,14.17,14.17,14.17,14.17-6.35,14.17-14.17-6.35-14.17-14.17-14.17h0Z"/>
    <path class="cls-200" d="M1185.1,40.52c7.26,0,13.17,5.91,13.17,13.17s-5.91,13.17-13.17,13.17-13.17-5.91-13.17-13.17,5.91-13.17,13.17-13.17m0-1c-7.83,0-14.17,6.35-14.17,14.17s6.35,14.17,14.17,14.17,14.17-6.35,14.17-14.17-6.35-14.17-14.17-14.17h0Z"/>
    <path class="cls-200" d="M53.69,754.6c7.26,0,13.17,5.91,13.17,13.17s-5.91,13.17-13.17,13.17-13.17-5.91-13.17-13.17,5.91-13.17,13.17-13.17m0-1c-7.83,0-14.17,6.35-14.17,14.17s6.35,14.17,14.17,14.17,14.17-6.35,14.17-14.17-6.35-14.17-14.17-14.17h0Z"/>
    <line class="cls-200" x1="72.09" y1="72.09" x2="63.71" y2="63.71"/>
    <line class="cls-200" x1="72.09" y1="749.38" x2="63.71" y2="757.75"/>
    <line class="cls-200" x1="1166.71" y1="749.38" x2="1175.08" y2="757.75"/>
    <line class="cls-200" x1="1166.71" y1="72.09" x2="1175.08" y2="63.71"/>
    <path class="cls-200" d= "M1182.1,1c30.71,0,55.69,24.98,55.69,55.69,0,18.01-8.79,34.99-23.51,45.44l-.42,.3V719.04l.42,.3c14.72,10.45,23.51,27.43,23.51,45.44,0,30.71-24.98,55.69-55.69,55.69-18,0-34.99-8.79-45.44-23.51l-.3-.42H102.43l-.3,.42c-10.45,14.72-27.43,23.51-45.44,23.51-30.71,0-55.69-24.98-55.69-55.69,0-18,8.79-34.99,23.51-45.44l.42-.3V102.43l-.42-.3C9.79,91.68,1,74.7,1,56.69,1,25.98,25.98,1,56.69,1c18,0,34.99,8.79,45.44,23.51l.3,.42H1136.37l.3-.42c10.45-14.72,27.43-23.51,45.44-23.51M1182.1,0c-19.1,0-35.98,9.46-46.25,23.93H102.95C92.67,9.45,75.79,0,56.69,0,25.38,0,0,25.38,0,56.69,0,75.79,9.45,92.67,23.93,102.95V718.52C9.45,728.79,0,745.67,0,764.77c0,31.31,25.38,56.69,56.69,56.69,19.1,0,35.98-9.46,46.25-23.93H1135.85c10.27,14.47,27.15,23.93,46.25,23.93,31.31,0,56.69-25.38,56.69-56.69,0-19.1-9.45-35.98-23.93-46.25V102.95c14.47-10.27,23.93-27.15,23.93-46.25C1238.79,25.38,1213.41,0,1182.1,0h0Z" />
</g>`;

//actual types:

let _126x184_chamber_big = `
<g id="126x184_chamber_big">
<g id="bg grid 6x4x21 pix blocks">
<line class="cls-1" x1="0" y1="0" x2="0" y2="84"/>
<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="84"/>
<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="84"/>
<line class="cls-1" x1="21" y1="0" x2="21" y2="84"/>
<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="84"/>
<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="84"/>
<line class="cls-1" x1="42" y1="0" x2="42" y2="84"/>
<line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="84"/>
<line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="84"/>
<line class="cls-1" x1="63" y1="0" x2="63" y2="84"/>
<line class="cls-6" x1="68.25" y1="0" x2="68.25" y2="84"/>
<line class="cls-6" x1="78.75" y1="0" x2="78.75" y2="84"/>
<line class="cls-1" x1="84" y1="0" x2="84" y2="84"/>
<line class="cls-6" x1="89.25" y1="0" x2="89.25" y2="84"/>
<line class="cls-6" x1="99.75" y1="0" x2="99.75" y2="84"/>
<line class="cls-1" x1="105" y1="0" x2="105" y2="84"/>
<line class="cls-6" x1="110.25" y1="0" x2="110.25" y2="84"/>
<line class="cls-6" x1="120.75" y1="0" x2="120.75" y2="84"/>
<line class="cls-1" x1="126" y1="0" x2="126" y2="84"/>
<line class="cls-1" x1="0" y1="0" x2="126" y2="0"/>
<line class="cls-6" x1="0" y1="5.25" x2="126" y2="5.25"/>
<line class="cls-6" x1="0" y1="15.75" x2="126" y2="15.75"/>
<line class="cls-1" x1="0" y1="21" x2="126" y2="21"/>
<line class="cls-6" x1="0" y1="26.25" x2="126" y2="26.25"/>
<line class="cls-6" x1="0" y1="36.75" x2="126" y2="36.75"/>
<line class="cls-1" x1="0" y1="42" x2="126" y2="42"/>
<line class="cls-6" x1="0" y1="47.25" x2="126" y2="47.25"/>
<line class="cls-6" x1="0" y1="57.75" x2="126" y2="57.75"/>
<line class="cls-1" x1="0" y1="63" x2="126" y2="63"/>
<line class="cls-6" x1="0" y1="68.25" x2="126" y2="68.25"/>
<line class="cls-6" x1="0" y1="78.75" x2="126" y2="78.75"/>
<line class="cls-1" x1="0" y1="84" x2="126" y2="84"/>
</g>
<g id="126x184_chamber_big shape" transform="scale(0.352804342207289)">
        <g>
                <line class="cls-300" x1="75.12" y1="0" x2="75.12" y2="15.59"/>
                <line class="cls-300" x1="103.46" y1="15.59" x2="103.46" y2="0"/>
        </g>
        <g>
                <line class="cls-300" x1="253.68" y1="222.52" x2="253.68" y2="238.11"/>
                <line class="cls-300" x1="282.03" y1="238.11" x2="282.03" y2="222.52"/>
        </g>
        <path class="cls-300"
              d="M253.68,222.52H60.93c-25.05,0-45.35-20.31-45.35-45.35V60.94c0-25.05,20.31-45.35,45.35-45.35h14.19"/>
        <path class="cls-300"
              d="M103.46,15.59h192.74c25.05,0,45.35,20.31,45.35,45.35v116.22c0,25.05-20.31,45.35-45.35,45.35h-14.17"/>
</g>
</g>
`;

//pressure unit:
let _63X63_stumuli = `
<g id="63X63_pressure_unit">
<g id="bg grid 3x3x21 pix blocks">
<line class="cls-1" x1="0" y1="0" x2="0" y2="63"/>
<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="63"/>
<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="63"/>
<line class="cls-1" x1="21" y1="0" x2="21" y2="63"/>
<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="63"/>
<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="63"/>
<line class="cls-1" x1="42" y1="0" x2="42" y2="63"/>
<line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="63"/>
<line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="63"/>
<line class="cls-1" x1="63" y1="0" x2="63" y2="63"/>
<line class="cls-1" x1="0" y1="0" x2="63" y2="0"/>
<line class="cls-6" x1="0" y1="5.25" x2="63" y2="5.25"/>
<line class="cls-6" x1="0" y1="15.75" x2="63" y2="15.75"/>
<line class="cls-1" x1="0" y1="21" x2="63" y2="21"/>
<line class="cls-6" x1="0" y1="26.25" x2="63" y2="26.25"/>
<line class="cls-6" x1="0" y1="36.75" x2="63" y2="36.75"/>
<line class="cls-1" x1="0" y1="42" x2="63" y2="42"/>
<line class="cls-6" x1="0" y1="47.25" x2="63" y2="47.25"/>
<line class="cls-6" x1="0" y1="57.75" x2="63" y2="57.75"/>
<line class="cls-1" x1="0" y1="63" x2="63" y2="63"/>
</g>
<g id="shape 63X63_pressure_unit"  transform="scale(0.3523)">
    <circle class="cls-200" cx="148.82" cy="29.76" r="12.76"/>
    <circle class="cls-200" cx="29.76" cy="29.76" r="12.76"/>
    <circle class="cls-200" cx="148.82" cy="148.82" r="12.76"/>
    <circle class="cls-200" cx="29.76" cy="148.82" r="12.76"/>
    <path class="cls-300"
          d="M75.47,49.07c-6.09,2.09-11.56,5.53-16.05,9.96-4.6,4.55-8.18,10.14-10.33,16.39m80.36-.13c-2.18-6.24-5.76-11.81-10.38-16.34-4.49-4.41-9.96-7.83-16.05-9.9m.08,80.48c12.29-4.22,22.04-13.92,26.33-26.17m-80.36-.21c4.29,12.46,14.2,22.31,26.71,26.49"/>
    <line class="cls-300" x1="75.12" y1="129.39" x2="75.11" y2="178.58"/>
    <line class="cls-300" x1="75.12" y1="0" x2="75.12" y2="49.19"/>
    <line class="cls-300" x1="103.46" y1="0" x2="103.46" y2="49.19"/>
    <line class="cls-300" x1="103.47" y1="129.39" x2="103.47" y2="178.58"/>
    <line class="cls-300" x1="129.39" y1="75.12" x2="178.58" y2="75.12"/>
    <line class="cls-300" x1="129.39" y1="103.46" x2="178.58" y2="103.46"/>
    <line class="cls-300" y1="75.12" x2="49.2" y2="75.12"/>
    <line class="cls-300" y1="103.46" x2="49.2" y2="103.46"/>
</g>
</g>`;

let _63X63_old_pump = `
<g id="63X63_pump">
<g id="bg grid 3x3x21 pix blocks">
<line class="cls-1" x1="0" y1="0" x2="0" y2="63"/>
<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="63"/>
<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="63"/>
<line class="cls-1" x1="21" y1="0" x2="21" y2="63"/>
<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="63"/>
<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="63"/>
<line class="cls-1" x1="42" y1="0" x2="42" y2="63"/>
<line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="63"/>
<line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="63"/>
<line class="cls-1" x1="63" y1="0" x2="63" y2="63"/>
<line class="cls-1" x1="0" y1="0" x2="63" y2="0"/>
<line class="cls-6" x1="0" y1="5.25" x2="63" y2="5.25"/>
<line class="cls-6" x1="0" y1="15.75" x2="63" y2="15.75"/>
<line class="cls-1" x1="0" y1="21" x2="63" y2="21"/>
<line class="cls-6" x1="0" y1="26.25" x2="63" y2="26.25"/>
<line class="cls-6" x1="0" y1="36.75" x2="63" y2="36.75"/>
<line class="cls-1" x1="0" y1="42" x2="63" y2="42"/>
<line class="cls-6" x1="0" y1="47.25" x2="63" y2="47.25"/>
<line class="cls-6" x1="0" y1="57.75" x2="63" y2="57.75"/>
<line class="cls-1" x1="0" y1="63" x2="63" y2="63"/>
</g>
<g id="shape 63X63_pump"  transform="scale(0.3523)">
    <circle class="cls-200" cx="89.29" cy="89.29" r="21.26"/>
    <path class="cls-300" d="M68.03,29.14,25.51,89.29c0,35.22,28.56,63.78,63.78,63.78s63.78-28.56,63.78-63.78m-28.35,0c0,19.57-15.86,35.43-35.43,35.43s-35.43-15.86-35.43-35.43"/>
    <path class="cls-300" d="M15.59,0c0,19.84,9.92,69.45,9.92,89.29"/>
    <path class="cls-300" d="M43.94,0c0,19.84,9.92,69.45,9.92,89.29"/>
    <path class="cls-300" d="M134.65,0c0,19.84-9.92,69.45-9.92,89.29"/>
    <path class="cls-300" d="M162.99,0c0,19.84-9.92,69.45-9.92,89.29"/>
</g>
</g>`;


let closePipe = `
    <g id="21x21 close pipe">
        <g id="bg grid 1x1x21 pix blocks">
            <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
            <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
            <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
            <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
            <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
            <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
            <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
            <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
        </g>
        <g id="Black_lines" transform="scale(0.3523)">
            <path class="cls-300" d="M45.35,29.76h0c0-7.83,6.35-14.17,14.17-14.17h0"/>
            <path class="cls-300" d="M59.53,43.94h0c-7.83,0-14.17-6.35-14.17-14.17h0"/>
        </g>
    </g>
    `;

let type21x21_pipi_08 = `
<g transform="scale(1)">
    <g id="21x21 pipip 08 pipe">
        <g id="bg grid 1x1x21 pix blocks">
            <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
            <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
            <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
            <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
            <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
            <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
            <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
            <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
        </g>
        <g id="pip08 shape" transform="scale(1)">
            <line class="cls-310" x1="5.50" y1="0" x2="5.50" y2="21"/>
            <line class="cls-310" x1="15.50" y1="0" x2="15.50" y2="21"/>
        </g>
    </g>
</g>
`;


// <g id="21x21 pipip 08 pipe">
//     <g id="bg grid 1x1x21 pix blocks">
//         <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
//         <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
//         <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
//         <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
//         <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
//         <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
//         <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
//         <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
//     </g>
//     <g id="pip08 shape" transform="scale(1)">
//        <line class="cls-310" x1="15.75" y1="0" x2="15.75" y2="21"/>
//        <line class="cls-310" x1="5.25" y1="0" x2="5.25" y2="21"/>
//       </g>
// </g>
// `;

let type21x21_pipe_turn = `
    <g id="21x21 pipip 08 pipe">
        <g id="bg grid 1x1x21 pix blocks">
            <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
            <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
            <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
            <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
            <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
            <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
            <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
            <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
        </g>
        <g id="shape 21x21_pipe_turn" transform="scale(0.3523)">
            <path class="cls-300" d="M43.94,59.53h0c0-8.61,6.98-15.59,15.59-15.59h0"/>
            <path class="cls-300" d="M59.53,15.59h-3.02c-22.6,0-40.92,18.32-40.92,40.92h0v3.02"/>
        </g>
    </g>
`;

let type42x42_pipe_big_turn = `
<g id="42x42_big_turn"  transform="scale(1)">
		<g id="bg grid 2x2x21 pix blocks">
			<line class="cls-1" x1="0" y1="0" x2="0" y2="42"/>
			<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="42"/>
			<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="42"/>
			<line class="cls-1" x1="21" y1="0" x2="21" y2="42"/>
			<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="42"/>
			<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="42"/>
			<line class="cls-1" x1="42" y1="0" x2="42" y2="42"/>
			<line class="cls-1" x1="0" y1="0" x2="42" y2="0"/>
			<line class="cls-6" x1="0" y1="5.25" x2="42" y2="5.25"/>
			<line class="cls-6" x1="0" y1="15.75" x2="42" y2="15.75"/>
			<line class="cls-1" x1="0" y1="21" x2="42" y2="21"/>
			<line class="cls-6" x1="0" y1="26.25" x2="42" y2="26.25"/>
			<line class="cls-6" x1="0" y1="36.75" x2="42" y2="36.75"/>
			<line class="cls-1" x1="0" y1="42" x2="42" y2="42"/>
		</g>
		<g id="shape 42x42_big_turn" transform="scale(0.3523)">
			<g>
				<path class="cls-300" d="M43.94,119.05h0c0-41.49,33.63-75.12,75.12-75.12h0"/>
				<path class="cls-300" d="M119.05,15.59h-7.1C58.73,15.59,15.59,58.73,15.59,111.95h0v7.1"/>
			</g>
		</g>
	</g>
	`;

let type42x42_spectro = `
<g id="42x42_spectro" transform="scale(1)">
	<g id="bg grid 2x2x21 pix blocks">
		<line class="cls-1" x1="0" y1="0" x2="0" y2="42"/>
		<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="42"/>
		<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="42"/>
		<line class="cls-1" x1="21" y1="0" x2="21" y2="42"/>
		<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="42"/>
		<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="42"/>
		<line class="cls-1" x1="42" y1="0" x2="42" y2="42"/>
		<line class="cls-1" x1="0" y1="0" x2="42" y2="0"/>
		<line class="cls-6" x1="0" y1="5.25" x2="42" y2="5.25"/>
		<line class="cls-6" x1="0" y1="15.75" x2="42" y2="15.75"/>
		<line class="cls-1" x1="0" y1="21" x2="42" y2="21"/>
		<line class="cls-6" x1="0" y1="26.25" x2="42" y2="26.25"/>
		<line class="cls-6" x1="0" y1="36.75" x2="42" y2="36.75"/>
		<line class="cls-1" x1="0" y1="42" x2="42" y2="42"/>
	</g>

	<g id="shape 42x42_spectro" transform="scale(0.3523)">
	<path class="cls-300" d="M43.94,103.46h0c0-4.02,1.52-7.68,4.01-10.44"/>
	<path class="cls-300" d="M26.57,72.56c-6.81,7.31-10.98,17.11-10.98,27.89h0v3.02"/>
	<line class="cls-300" x1="15.59" y1="119.06" x2="15.59" y2="103.46"/>
	<line class="cls-300" x1="43.94" y1="103.46" x2="43.94" y2="119.06"/>
	<path class="cls-300" d="M94.96,59.53c0,19.57-15.86,35.43-35.43,35.43-4.05,0-7.95-.68-11.58-1.93"/>
	<path class="cls-300" d="M26.57,72.56c-1.6-4.03-2.47-8.43-2.47-13.03"/>
	<path class="cls-300" d="M75.12,15.59h0c0,4.02-1.52,7.68-4.01,10.44"/>
	<path class="cls-300" d="M92.49,46.5c6.81-7.31,10.98-17.11,10.98-27.89h0v-3.02"/>
	<line class="cls-300" x1="103.46" y1="15.59" x2="103.46" y2="0"/>
	<line class="cls-300" x1="75.12" y1="0" x2="75.12" y2="15.59"/>
	<path class="cls-300" d="M24.09,59.53c0-19.57,15.86-35.43,35.43-35.43,4.05,0,7.95,.68,11.58,1.93"/>
	<path class="cls-300" d="M92.49,46.5c1.6,4.03,2.47,8.43,2.47,13.03"/>
	<circle class="cls-200" cx="17.16" cy="59.53" r="5.67"/>
	<circle class="cls-300" cx="17.16" cy="59.53" r="7.09"/>
	<circle class="cls-300" cx="101.9" cy="59.53" r="7.09"/>
	<circle class="cls-200" cx="101.9" cy="59.53" r="5.67"/>
  </g>
</g>`;

let type42x63_air_pump = `
<g id="42x63_air_pump" transform="scale(1)">
	<g id="bg grid 2x3x21 pix blocks">
		<line class="cls-1" x1="0" y1="0" x2="0" y2="63"/>
		<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="63"/>
		<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="63"/>
		<line class="cls-1" x1="21" y1="0" x2="21" y2="63"/>
		<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="63"/>
		<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="63"/>
		<line class="cls-1" x1="42" y1="0" x2="42" y2="63"/>
		<line class="cls-1" x1="0" y1="0" x2="42" y2="0"/>
		<line class="cls-6" x1="0" y1="5.25" x2="42" y2="5.25"/>
		<line class="cls-6" x1="0" y1="15.75" x2="42" y2="15.75"/>
		<line class="cls-1" x1="0" y1="21" x2="42" y2="21"/>
		<line class="cls-6" x1="0" y1="26.25" x2="42" y2="26.25"/>
		<line class="cls-6" x1="0" y1="36.75" x2="42" y2="36.75"/>
		<line class="cls-1" x1="0" y1="42" x2="42" y2="42"/>
		<line class="cls-6" x1="0" y1="47.25" x2="42" y2="47.25"/>
		<line class="cls-6" x1="0" y1="57.75" x2="42" y2="57.75"/>
		<line class="cls-1" x1="0" y1="63" x2="42" y2="63"/>
	</g>
	<g id="shape 42x63_air_pump" transform="scale(0.3523)">
		<path class="cls-200" d="M69.45,119.09l5.39-56.63c.18-.94,.28-1.9,.28-2.89v-.02h0c-.02-8.61-6.99-15.57-15.59-15.57s-15.57,6.96-15.59,15.55h0v.04c0,.99,.1,1.95,.28,2.89l5.39,56.63"/>
		<path class="cls-200" d="M49.61,119.06c0,3.91-3.17,7.09-7.09,7.09s-7.09-3.17-7.09-7.09"/>
		<path class="cls-200" d="M83.64,119.06c0,3.91-3.17,7.09-7.09,7.09s-7.09-3.17-7.09-7.09"/>
		<path class="cls-300" d="M50.72,119.06c0,8.61-12.38,15.61-20.99,15.61h0"/>
		<path class="cls-300" d="M29.73,163.01h3.02c24.88,0,35.68-18.22,34.98-43.95"/>
		<line class="cls-300" x1="50.72" y1="119.06" x2="46.91" y2="68.72"/>
		<line class="cls-300" x1="67.72" y1="119.06" x2="72.15" y2="68.72"/>
		<line class="cls-300" x1="0" y1="134.65" x2="30.62" y2="134.65"/>
		<line class="cls-300" x1="30.62" y1="162.99" x2="0" y2="162.99"/>
	</g>
</g>
  `;


let type63x63_heat_pump = `
<g id="63X63_heat_unit" transform="scale(1)">
	<g id="bg grid 3x3x21 pix blocks">
		<line class="cls-1" x1="0" y1="0" x2="0" y2="63"/>
		<line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="63"/>
		<line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="63"/>
		<line class="cls-1" x1="21" y1="0" x2="21" y2="63"/>
		<line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="63"/>
		<line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="63"/>
		<line class="cls-1" x1="42" y1="0" x2="42" y2="63"/>
		<line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="63"/>
		<line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="63"/>
		<line class="cls-1" x1="63" y1="0" x2="63" y2="63"/>
		<line class="cls-1" x1="0" y1="0" x2="63" y2="0"/>
		<line class="cls-6" x1="0" y1="5.25" x2="63" y2="5.25"/>
		<line class="cls-6" x1="0" y1="15.75" x2="63" y2="15.75"/>
		<line class="cls-1" x1="0" y1="21" x2="63" y2="21"/>
		<line class="cls-6" x1="0" y1="26.25" x2="63" y2="26.25"/>
		<line class="cls-6" x1="0" y1="36.75" x2="63" y2="36.75"/>
		<line class="cls-1" x1="0" y1="42" x2="63" y2="42"/>
		<line class="cls-6" x1="0" y1="47.25" x2="63" y2="47.25"/>
		<line class="cls-6" x1="0" y1="57.75" x2="63" y2="57.75"/>
		<line class="cls-1" x1="0" y1="63" x2="63" y2="63"/>
	</g>
	<g id="shape 63X63_heat_unit"  transform="scale(1)">
		<circle class="cls-210" cx="31.5" cy="31.5" r="7.5"/>
		<circle class="cls-310" cx="31.5" cy="31.5" r="12.5"/>
		<circle class="cls-310" cx="31.5" cy="31.5" r="24"/>
	</g>
</g>
`;

let type63x63_new_pump = `
<g id="63X63_new_pump" transform="scale(1)">
    <g id="bg grid 3x3x21 pix blocks">
        <line class="cls-1" x1="0" y1="0" x2="0" y2="63"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="63"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="63"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="63"/>
        <line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="63"/>
        <line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="63"/>
        <line class="cls-1" x1="42" y1="0" x2="42" y2="63"/>
        <line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="63"/>
        <line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="63"/>
        <line class="cls-1" x1="63" y1="0" x2="63" y2="63"/>
        <line class="cls-1" x1="0" y1="0" x2="63" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="63" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="63" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="63" y2="21"/>
        <line class="cls-6" x1="0" y1="26.25" x2="63" y2="26.25"/>
        <line class="cls-6" x1="0" y1="36.75" x2="63" y2="36.75"/>
        <line class="cls-1" x1="0" y1="42" x2="63" y2="42"/>
        <line class="cls-6" x1="0" y1="47.25" x2="63" y2="47.25"/>
        <line class="cls-6" x1="0" y1="57.75" x2="63" y2="57.75"/>
        <line class="cls-1" x1="0" y1="63" x2="63" y2="63"/>
    </g>
    <g id="shape 63X63_new_pump" transform="scale(0.352804342207289)">
        <circle class="cls-200" cx="89.29" cy="90.29" r="21.26"/>
        <path class="cls-300" d="M75.12,1c0,19.78,0,26.93-15.59,32.87"/>
        <path class="cls-300" d="M103.47,1c0,33.73,0,43.94-28.35,56.81"/>
        <path class="cls-300"
              d="M121.95,104.09c-5.38,12.72-17.97,21.64-32.65,21.64-19.57,0-35.43-15.86-35.43-35.43,0-14.53,8.74-27.02,21.26-32.48"/>
        <path class="cls-300"
              d="M59.53,33.87c-20.23,10.69-34.01,31.95-34.01,56.42,0,35.22,28.56,63.78,63.78,63.78,24.47,0,45.73-13.79,56.42-34.02"/>
        <path class="cls-300" d="M179,75c-36.16,0-44.65,0-56.81,28.34"/>
        <path class="cls-300" d="M179,103.5c-18.41,0-27.92,0-32.87,15.59"/>
    </g>
</g>`;


let type84x84_small_chamber = `
<g id="type84x84_small_chamber" transform="scale(1)">
    <g id="bg grid 4x4x21 pix blocks">
        <line class="cls-1" x1="0" y1="0" x2="0" y2="84"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="84"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="84"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="84"/>
        <line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="84"/>
        <line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="84"/>
        <line class="cls-1" x1="42" y1="0" x2="42" y2="84"/>
        <line class="cls-6" x1="47.25" y1="0" x2="47.25" y2="84"/>
        <line class="cls-6" x1="57.75" y1="0" x2="57.75" y2="84"/>
        <line class="cls-1" x1="63" y1="0" x2="63" y2="84"/>
        <line class="cls-6" x1="68.25" y1="0" x2="68.25" y2="84"/>
        <line class="cls-6" x1="78.75" y1="0" x2="78.75" y2="84"/>
        <line class="cls-1" x1="84" y1="0" x2="84" y2="84"/>
        <line class="cls-1" x1="0" y1="0" x2="84" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="84" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="84" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="84" y2="21"/>
        <line class="cls-6" x1="0" y1="26.25" x2="84" y2="26.25"/>
        <line class="cls-6" x1="0" y1="36.75" x2="84" y2="36.75"/>
        <line class="cls-1" x1="0" y1="42" x2="84" y2="42"/>
        <line class="cls-6" x1="0" y1="47.25" x2="84" y2="47.25"/>
        <line class="cls-6" x1="0" y1="57.75" x2="84" y2="57.75"/>
        <line class="cls-1" x1="0" y1="63" x2="84" y2="63"/>
        <line class="cls-6" x1="0" y1="68.25" x2="84" y2="68.25"/>
        <line class="cls-6" x1="0" y1="78.75" x2="84" y2="78.75"/>
        <line class="cls-1" x1="0" y1="84" x2="84" y2="84"/>
    </g>
    <g id="shape type84x84_small_chamber"  transform="scale(0.352804342207289)">
        <path class="cls-300" d="M15.59,134.65l-.02-73.7c0-25.05,20.31-45.35,45.35-45.35h14.19"/>
        <path class="cls-300" d="M134.63,222.52H60.93c-25.05,0-45.35-20.31-45.35-45.35l.02-14.17"/>
        <path class="cls-300" d="M222.5,103.46v75.12c0,25.05-18.89,43.94-43.94,43.94h-15.59"/>
        <path class="cls-300" d="M103.46,15.59h75.1c25.05,0,43.94,18.89,43.94,43.94v15.59"/>
   
        <line class="cls-300" x1="75.12" y1="0" x2="75.12" y2="15.59"/>
        <line class="cls-300" x1="103.46" y1="15.59" x2="103.46" y2="0"/>
        <line class="cls-300" x1="134.63" y1="222.52" x2="134.63" y2="238.11"/>
        <line class="cls-300" x1="162.97" y1="238.11" x2="162.97" y2="222.52"/>
        <line class="cls-300" x1="222.5" y1="103.46" x2="238.09" y2="103.46"/>
        <line class="cls-300" x1="238.09" y1="75.12" x2="222.5" y2="75.12"/>
        <line class="cls-300" y1="162.99" x2="15.59" y2="162.99"/>
        <line class="cls-300" x1="15.59" y1="134.65" y2="134.65"/>
    </g>
  </g>
`;


let type42x42_mini_chamber = `
    <g id="42x42_mini_chamber" transform="scale(1)">
     <g id="bg grid 2x2x21 pix blocks">
        <line class="cls-1" x1="0" y1="0" x2="0" y2="42"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="42"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="42"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="42"/>
        <line class="cls-6" x1="26.25" y1="0" x2="26.25" y2="42"/>
        <line class="cls-6" x1="36.75" y1="0" x2="36.75" y2="42"/>
        <line class="cls-1" x1="42" y1="0" x2="42" y2="42"/>
        <line class="cls-1" x1="0" y1="0" x2="42" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="42" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="42" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="42" y2="21"/>
        <line class="cls-6" x1="0" y1="26.25" x2="42" y2="26.25"/>
        <line class="cls-6" x1="0" y1="36.75" x2="42" y2="36.75"/>
        <line class="cls-1" x1="0" y1="42" x2="42" y2="42"/>
     </g>
     <g id="shape 42x42_spectro" transform="scale(0.3523)">
        <g id="42x42_mini_chamber_shape">
            <path class="cls-300" d="M103.45,15.59v43.94c0,24.27-19.67,43.94-43.94,43.94h0c-24.27,0-43.94-19.67-43.94-43.94v0c0-24.27,19.67-43.94,43.94-43.94h15.61"/>
            <line class="cls-300" x1="75.12" y1="0" x2="75.12" y2="15.59"/>
            <line class="cls-300" x1="103.46" y1="15.59" x2="103.46" y2="0"/>
        </g>
     </g>
    </g>
`;

let type21x42_opening_pipe = `
<g id="21x42_opening_pipe">
    <g id="bg grid 1x2x21 pix blocks" transform="scale(1)">>
        <line class="cls-1" x1="0" y1="0" x2="0" y2="42"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="42"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="42"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="42"/>
        <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
        <line class="cls-6" x1="0" y1="26.25" x2="21" y2="26.25"/>
        <line class="cls-6" x1="0" y1="36.75" x2="21" y2="36.75"/>
        <line class="cls-1" x1="0" y1="42" x2="21" y2="42"/>
    </g>
    <g id="shape_21x42_opening_pipe" transform="scale(0.3523)">
        <line class="cls-300" x1="15.59" y1="119.06" x2="0" y2="0"/>
        <line class="cls-300" x1="59.53" y1="0" x2="43.94" y2="119.06"/>
    </g>
</g>
`;

let type21x21_t_pipe = `
<g id="21x21 T pipe">
    <g id="bg grid 1x1x21 pix blocks">
        <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
        <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
    </g>
    <g id="shape 21x21_t_pipe" transform="scale(0.3523)">
        <path class="cls-300" d="M43.94,59.53c0-8.61,6.98-15.59,15.59-15.59"/>
        <path class="cls-300" d="M59.53,15.59c-8.61,0-15.59-6.98-15.59-15.59"/>
        <line class="cls-300" x1="15.59" y1="59.53" x2="15.59" y2="0"/>
    </g>
</g>
`;

let type21x21_x_pipe = `
<g id="21x21 X pipe">
    <g id="bg grid 1x1x21 pix blocks">
        <line class="cls-1" x1="0" y1="0" x2="0" y2="21"/>
        <line class="cls-6" x1="5.25" y1="0" x2="5.25" y2="21"/>
        <line class="cls-6" x1="15.75" y1="0" x2="15.75" y2="21"/>
        <line class="cls-1" x1="21" y1="0" x2="21" y2="21"/>
        <line class="cls-1" x1="0" y1="0" x2="21" y2="0"/>
        <line class="cls-6" x1="0" y1="5.25" x2="21" y2="5.25"/>
        <line class="cls-6" x1="0" y1="15.75" x2="21" y2="15.75"/>
        <line class="cls-1" x1="0" y1="21" x2="21" y2="21"/>
    </g>
    <g id="shape 21x21_x_pipe" transform="scale(0.3523)">
        <path class="cls-300" d="M43.94,59.53c0-8.61,6.98-15.59,15.59-15.59"/>
        <path class="cls-300" d="M59.53,15.59c-8.61,0-15.59-6.98-15.59-15.59"/>
        <path class="cls-300" d="M15.59,0C15.59,8.61,8.61,15.59,0,15.59"/>
        <path class="cls-300" d="M0,43.94c8.61,0,15.59,6.98,15.59,15.59"/>
    </g>
</g>`;
//next shape:


