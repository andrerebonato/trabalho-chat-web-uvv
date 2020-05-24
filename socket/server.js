const koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_PORT = process.env.PORT || 8080;


/*
    TODO:
    1. we need to find a way to save the messages on the mongodb, probably we will need to make this on
    the another api.
    2. format the connect pattern, we need to fix some things, example: anyone user can access this url,
    i think we need to make a way to private this on this api or on the client and on another api.
*/
io.on('connection', socket => {
    console.log('[IO] Connection => server has a new connection.')
    socket.on('chat.message', message => {
        console.log('[SOCKET] a new chat.message has received => ', message);
        io.emit('chat.message', message);
    });
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => a connection was disconected.')
    });
});

server.listen(SERVER_PORT, () => {
<<<<<<< HEAD
    console.log(`[HTTP] Listen => Server is already. Running at: http://${SERVER_HOST}:${SERVER_PORT}`);
=======
    console.log(`[HTTP] Listen => Server is already. Running at port: ${SERVER_PORT}`);
>>>>>>> 8d44a338e30d78824f560b74ffb6296b6e607870
    console.log('[HTTP] Listen => If you want to stop this proccess, press CTRL + C.');
});
