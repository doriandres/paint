const controls = document.getElementById("controls");
const yOffset = controls.offsetHeight;

/**
 * @type {HTMLInputElement}
 */
const colorControl = document.getElementById("color");

/**
 * @type {HTMLInputElement}
 */
const thicknessControl = document.getElementById("thickness");



let DRAW_COLOR = '#ffffff';
const ERASE_COLOR = 'black';

let DRAW_THICKNESS = 5;

colorControl.addEventListener('change', () => {
    DRAW_COLOR = colorControl.value;
});
thicknessControl.addEventListener('change', () => {
    DRAW_THICKNESS = thicknessControl.valueAsNumber;    
});

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = document.documentElement.clientWidth;
ctx.canvas.height = document.documentElement.clientHeight - yOffset;


let isDrawing = false;
let isShiftPressed = false;

document.addEventListener('keydown', (event) => {
    if(event.key === 'Shift'){
        isShiftPressed = true;
    }
});
document.addEventListener('keyup', (event) => {
    if(event.key === 'Shift'){
        isShiftPressed = false;
    }
});


canvas.addEventListener('mousedown', (event) => {    
    if(isDrawing) return;
    const x = event.clientX;
    const y = event.clientY - yOffset;
    ctx.strokeStyle = isShiftPressed ? ERASE_COLOR : DRAW_COLOR;
    ctx.lineWidth = DRAW_THICKNESS;
    ctx.beginPath();
    isDrawing = true;
    ctx.moveTo(x, y);
});

document.addEventListener('mousemove', (event) => {
    if(!isDrawing) return;
    requestAnimationFrame(() => {
        const x = event.clientX;
        const y = event.clientY - yOffset;
        ctx.lineTo(x, y);
        ctx.stroke();
    });    
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
});


