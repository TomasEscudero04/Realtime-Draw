const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;

// Event listeners de Socket.io (deben estar fuera de la función draw)
socket.on("draw", ({ x, y, color, size }) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
});

socket.on('clear', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
});

// Event listeners del canvas
canvas.addEventListener("mousedown", e => {
  drawing = true;
  draw(e.offsetX, e.offsetY, false);
});

canvas.addEventListener("mousemove", e => {
  if (drawing) draw(e.offsetX, e.offsetY, true);
});

canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseleave", () => (drawing = false));

// Event listener del botón limpiar (debe estar fuera de la función draw)
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  socket.emit('clear');
});

function draw(x, y, dragging) {
  const color = colorPicker.value;
  const size = parseInt(sizePicker.value);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();

  if (dragging) {
    socket.emit("draw", { x, y, color, size });
  }
}
