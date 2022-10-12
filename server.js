// const app = require("express")();
const express = require('express')
const cors = require('cors');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors:{
        origin: "*",
    }
})

app.use(cors())
app.use(express.json())

const playersRoutes = require('./routes/players')

app.use('/players', playersRoutes)
app.get('/', (req,res) => res.send('welcome to lets get quizzical'))

// we have to use cors to connect our server with the client side so that it knows where the client lives
// integrate our http server with a new instance of socket.io
app.get('/', (req,res) => res.send('welcome to lets get quizzical'))
// socket connection will go here

io.on('connection', socket => {
    console.log("'Ello, who's this we got here? " + socket.id) // runs when client first connects
    const participantCount = io.engine.clientsCount
    socket.emit('admin-message', 'Hi there, new friend!')
    socket.broadcast.emit('admin-message', 'A new friend has arrived!')
    io.emit('admin-message', `There is ${participantCount} x friend here now!`)

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });

    
    
    socket.on('create room', data => {
        console.log(io.sockets.adapter.rooms.get(data.room))
        if(!io.sockets.adapter.rooms.get(data.room)){
            
            socket.join(data.room)
            console.log(`${socket.id} has created room: ` + data.room)
            
            

        } else {
            socket.emit('create error', 'that room is already taken')
        }
    
        
        
    })

    socket.on('join room', data => {
                if(io.sockets.adapter.rooms.get(data.room)){
        
                    socket.join(data.room)
                    console.log(`${socket.id} has just joined ${data.room}`)
                    console.log('number of players in room: ',io.sockets.adapter.rooms.get(data.room).size)
                    io.emit('room size', io.sockets.adapter.rooms.get(data.room).size -1)
                    io.emit('add player', data.player)

                    
                }else{
                    socket.emit('join error', 'that room does not exist')
                }
                
            })
    
    socket.on('player ready', data => {
        socket.to(data.room).emit('ready message', `user ${data.player} is ready`)
    })

    
    
    
});

// io.of("/Room").on("connection", (socket) => {


//     console.log(`Welcome to the room ${socket.id}`)
//     console.log(`You are currently in rooms: ${socket.rooms}`)
//     socket.on('join room', data => {
//         if(io.sockets.adapter.rooms.get(data.room)){

//             socket.join(data.room)
//             console.log(`${socket.id} has just joined ${data.room}`)
//             console.log('number of players in room: ',io.sockets.adapter.rooms.get(data.room).size)
//             io.of("/Room").in(data.room).emit('room size', io.sockets.adapter.rooms.get(data.room).size)
//         }else{
//             socket.emit('join error', 'that room does not exist')
//         }
        
//     })
// });




module.exports = server
