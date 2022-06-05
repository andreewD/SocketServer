import express from "express";
import 'dotenv/config'
import { createServer } from "http";
import { Server } from "socket.io";
import { stringify } from "flatted";
import { generator } from './util/arraysGenerator'

interface regressionExpression {
    index: number
    X: Array<number>
    Y: Array<number>

}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);
    console.log("connection")
});

io.on('message', (message) =>{
    console.log(message);
  });

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        "Tema": "Examen Parcial",
        "Curso": "Programacion Concurrente y Distribuida",
        "Integrantes": ["Anchi Dueñas Hairton Andree", "Anicama Navarro Benedic", "Seminario Serna Luis", "Sanchez Ramos Dashiel"]
    }))
})

app.get('/getSockets', async (req, res) => {
    const sockets = await io.fetchSockets();
    let ids: string[] = []
    sockets.forEach(item => {
        ids.push(item.id)
    })
    res.send(stringify(ids))
})

app.get('/start', async (req, res) => {
    let finalData: Array<regressionExpression> = []
    for (let index = 0; index < 60; index++) {
        const { X, Y } = generator()
        finalData.push({ index, X, Y })
    }
    const sockets = await io.fetchSockets()
    let ids : string[]=[]
    sockets.forEach(item => {
        ids.push(item.id)
    })
   
    for (let index = 0; index < finalData.length/ids.length; index++) {
        io.to(ids[index]).emit('calc',finalData.slice(finalData.length*index/ids.length,finalData.length*(index+1)/ids.length))
        
    }

    res.send(JSON.stringify(finalData))

})

httpServer.listen(process.env.PORT || 3000);