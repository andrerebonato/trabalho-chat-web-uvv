import io from 'socket.io-client';

const SOCKET_URL = "https://chat-td2-entra-ai-pra-teste.herokuapp.com";

const socket = io(SOCKET_URL, {
    autoConnect: false,
})

export { socket }