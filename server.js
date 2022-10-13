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
    console.log("'Ello, who's this we got here? " + socket.id) 
    const participantCount = io.engine.clientsCount
    console.log(participantCount)
    socket.emit('admin-message', 'Hi there, new friend!')
    socket.broadcast.emit('admin-message', 'A new friend has arrived!')
    io.emit('admin-message', `There is ${participantCount} x friend here now!`)

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });

    
    
    socket.on('create room', data => {
        if(!io.sockets.adapter.rooms.get(data.room)){
            
            socket.join(data.room)
            console.log(`${socket.id} has created room: ` + data.room)
            socket.username = 'admin'

        } else {
            socket.emit('create error', 'that room is already taken')
        }
    
        
        
    })

    socket.on('join room', data => {
                if(io.sockets.adapter.rooms.get(data.room)){

                    if(io.sockets.adapter.rooms.get(data.room).size -1 < 7){

                        socket.join(data.room)
                        console.log(`${socket.id} has just joined ${data.room}`)
                        console.log('number of players in room: ',io.sockets.adapter.rooms.get(data.room).size)
                        const roomsize = io.sockets.adapter.rooms.get(data.room).size -1;
                        io.emit('room size', roomsize)
                        socket.username = data.player
                        const socketIds = io.sockets.adapter.rooms.get(data.room)
                        let users = [];
                        socketIds.forEach((socketid) => {
                            console.log(`this is player ${socketid}: ${io.sockets.sockets.get(socketid).username}`)
                            if(io.sockets.sockets.get(socketid).username !== 'admin'){
                                users.push(io.sockets.sockets.get(socketid).username)
                            }
                        })
                        io.emit('add player', users)
                    } else {
                        socket.emit('room full error', 'that room is full')
                    }
                        
                        
                }else{
                    socket.emit('join error', 'that room does not exist')
                }
                
            })
    
    socket.on('share questions', (data) => {
        console.log('sending the questions')
        io.emit('send questions', data.data)
    })

    

    socket.on('hide players', (data) => {
        console.log('hiding players')
        io.emit('hide for all', true)
    })

    socket.on('start', (data) => {
        console.log(`${socket.id} is trying to start the game`)
        socket.to(data.room).emit('Begin', true )
        
        console.log('starting the game')
        setTimeout(() => {
            console.log('Q1')
            io.emit('load question', 0)
            
        }, 5000)
        setTimeout(() => {
            console.log('Q2')
             io.emit('load question', 1)
            
        }, 15000)
        setTimeout(() => {
            console.log('Q3')
             socket.to(data.room).emit('load question', 2)
            
        }, 30000)
        setTimeout(() => {
            console.log('Q4')
            io.emit('load question', 3)
            
        }, 45000)
        setTimeout(() => {
            console.log('Q5')
             io.emit('load question', 4)
            
        }, 60000)
        setTimeout(() => {
            console.log('Q6')
             io.emit('load question', 5)
            
        }, 75000)
        setTimeout(() => {
            console.log('Q7')
            io.emit('load question', 6)
            
        }, 90000)
        setTimeout(() => {
            console.log('Q8')
             io.emit('load question', 7)
            
        }, 105000)
        setTimeout(() => {
            console.log('Q9')
             io.emit('load question', 8)
            
        }, 120000)
        setTimeout(() => {
            console.log('Q10')
             io.emit('load question', 9)
            
        }, 135000)
        setTimeout(() => {
            console.log('Q10')
             io.emit('load score', true)
            
        }, 140000)
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
