const express = require('express');
const http = require('http');
const {Server} = require('socket.io')

const app = express(); //crea la instancia de express
const server = http.createServer(app); //crea un servidor http

// Configurar Socket.io con CORS para permitir conexiones desde Vercel
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir todas las conexiones (en producción puedes especificar tu dominio de Vercel)
        methods: ["GET", "POST"],
        credentials: true
    }
}); //creo la instancia de socket y le paso el server

// Ruta de salud para verificar que el servidor está funcionando
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor Socket.io funcionando' });
});

// Eventos de Socket.io
io.on('connection', socket => {
    console.log('Nuevo usuario conectado: ', socket.id);
    
    socket.on('draw', data => {//escuchamos el evento draw enviado por el cliente
        socket.broadcast.emit('draw', data) //reenvia el evento a todos los demas clientes conectados
    })

    socket.on('clear', () => { //escuchamos el evento clear enviado por el cliente
        io.emit('clear') //reenvia el evento clear a todos los clientes conectados para limpiar el lienzo
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ', socket.id);
    });
})

const PORT = process.env.PORT || 3005;

// Iniciar servidor (para Render y desarrollo local)
server.listen(PORT, () => {
    console.log(`Servidor Socket.io corriendo en el puerto: ${PORT}`);    
})