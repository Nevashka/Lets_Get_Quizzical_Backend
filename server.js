// const app = require("express")();
const express = require('express')
const cors = require('cors');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors:{
        origin: "*"
    }
})

app.use(cors())
app.use(express.json())

const playersRoutes = require('./routes/players')

app.use('/players', playersRoutes)
app.get('/', (req,res) => res.send('welcome to lets get quizzical'))

// we have to use cors to connect our server with the client side so that it knows where the client lives
// integrate our http server with a new instance of socket.io

// socket connection will go here

io.on('connection', socket => {
    console.log("'Ello, who's this we got here?") // runs when client first connects
    const participantCount = io.engine.clientsCount
    socket.emit('admin-message', 'Hi there, new friend!')
    socket.broadcast.emit('admin-message', 'A new friend has arrived!')
    io.emit('admin-message', `There is ${participantCount} x friend here now!`)

    socket.on("disconnect", socket => { // runs when client disconnects
        console.log("K bye then");
    });
});

module.exports = server
