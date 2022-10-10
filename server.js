const app = require("express")();
const cors = require('cors');
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors:{
        origin: "*"
    }
})

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

const port = process.env.PORT || 5001;


server.listen(port, () => {
    console.log(`Open for play on port ${port}!`)
});
