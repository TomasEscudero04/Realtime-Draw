const express = require('express');
const http = require('http');
const {Server} = require('socket.io')

const app = express(); //crea la instancia de express
const server = http.createServer(app); //crea un servidor http
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
}); //creo la instancia de socket y le paso el server

app.use(express.static('public')); //sirve los archivos estaticos desde la carpeta public


io.on('connection', socket => {
    console.log('Nuevo usuario conectado: ', socket.id);
    socket.on('draw', data => {//escuchamos el evento draw enviado por el cliente
        socket.broadcast.emit('draw', data) //reenvia el evento a todos los demas clientes conectados
    })

    socket.on('clear', () => { //escuchamos el evento clear enviado por el cliente
        io.emit('clear') //reenvia el evento clear a todos los clientes conectados para limpiar el lienzo
    })
})

const PORT = process.env.PORT || 3005;

server.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);    
})

// Exportar para Vercel
module.exports = app;