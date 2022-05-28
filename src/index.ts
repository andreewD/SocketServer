import express from "express";
import 'dotenv/config'
import { createServer } from "http";
import { Server } from "socket.io";
import { stringify } from "flatted";
import { X, Y, N } from './util/numberConcatenator'
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});



// server-side
io.on("connection", (socket) => {
    console.log(socket.id);
    console.log("connection")

});

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        "Tema": "Examen Parcial",
        "Curso": "Programacion Concurrente y Distribuida",
        "Integrantes": ["Anchi Dueñas Hairton Andree", "Anicama Navarro Benedic", "Seminario Serna Luis", "Sanchez Dashiel"]
    }))
})


app.get('/getSockets', async (req, res) => {
    const sockets = await io.fetchSockets();
    var ids: string[] = []
    sockets.map(item => {
        ids.push(item.id)
    })
    res.send(stringify(ids))
})

app.get('/start', (req, res) => {
    res.send(JSON.stringify(N) + ';' + JSON.stringify(X) + ';' + JSON.stringify(Y))
    io.sockets.emit('message', JSON.stringify(N) + ';' + JSON.stringify(X) + ';' + JSON.stringify(Y))
})




httpServer.listen(3000 || process.env.PORT);