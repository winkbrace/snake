const canvasBg = document.getElementById('background');
const bg = canvasBg.getContext("2d");

const gridSize = 20;
const rows = canvasBg.height / gridSize;
const cols = canvasBg.width / gridSize;

drawBackground();

function drawBackground() {
    // Create gradient
    const offset = canvasBg.width / 2.5;
    const grd = bg.createRadialGradient(offset, offset, 5, offset, offset, canvasBg.width * 0.8);
    grd.addColorStop(0, "darkred");
    grd.addColorStop(1, "black");

    // Fill with gradient
    bg.fillStyle = grd;
    bg.fillRect(0, 0, canvasBg.width, canvasBg.height);

    bg.strokeStyle = 'rgba(0,0,0,0.1)';

    for (let i = 0; i < rows; i++) {
        bg.beginPath();
        bg.moveTo(0, i * gridSize);
        bg.lineTo(canvasBg.width, i * gridSize);
        bg.stroke();
    }

    for (let i = 0; i < cols; i++) {
        bg.beginPath();
        bg.moveTo(i * gridSize, 0);
        bg.lineTo(i * gridSize, canvasBg.height);
        bg.stroke();
    }
}
