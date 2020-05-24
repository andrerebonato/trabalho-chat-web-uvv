import React, { useState, useEffect } from 'react';
import './styles.css';
import { socket } from '../../services/webSocket';
import { displayAlert, typesAlert } from '../../utils/displayAlert';
import Message from './Message/index';
import moment from 'moment';
import { OldMessage } from './MessagesTypes/index';
import { availablePages } from '../../constants/index';
import { useHistory } from 'react-router-dom';

const myId = Math.random();

/*
    TODO:
    
    1. recreate the design, the actually is a simple example - done
    2. we need to make this page private, but in first we need to create signup and login pages and actions.
    3. we will need to make a semi-complex logic in this page, because:
        * the socket io doesn't have any method to save the messages on mongodb, so probably we
        need to use the another api provided by Vinicius, so, in every message submit we will
        need to make a post on the api and if post is ok, we push this to the socket.io api.
        * we need to make some logic to verify if user are allowed to send messages (authenticated),
        actually we have a function tha makes this verification, but in this page we doesn't have
        none to check this.
*/

const myOldMessages = [
    {
        id: 1,
        message: "Testando funcionalidade nova...",
        date: moment(new Date()).format('DD/MM/YYYY HH:mm')
    }
]

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const history = useHistory();

    //connect to the socket and send a new message.
    useEffect(() => {
        const handleNewMessage = newMessage => {
            setMessages([...messages, newMessage]);
        }

        socket.disconnect();
        socket.connect();
        socket.on('chat.message', handleNewMessage);
        return () => socket.off('chat.message', handleNewMessage);
    }, [messages]);

    //display success connected to the chat
    useEffect(() => { displayAlert("Conectado com sucesso ao chat.", typesAlert.success); }, []);

    const handleInputChange = event => {
        setMessage(event.target.value);
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        //check if message state have some value
        if (message.trim()) {
            let newMessage = {
                id: myId,
                message,
                date: moment(new Date()).format('DD/MM/YYYY HH:mm')
            }
            socket.emit('chat.message', newMessage);
            myOldMessages.push(newMessage);
            setMessage('');
        }
    }

    return (
        <div class="container mt-4">
            <h3 class="text-center">chat dos cornos</h3>
            <div class="messaging">
                <div class="inbox_msg">
                    <div class="inbox_people col-md-4">
                        <div class="headind_srch">
                            <div class="recent_heading">
                                <h4>Minhas mensagens</h4>
                            </div>
                            <div class="srch_bar">
                                <div class="stylish-input-group">
                                    <input type="text" class="search-bar" placeholder="Pesquisar" />
                                    <span class="input-group-addon">
                                        <button type="button">
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="inbox_chat">
                            {
                                myOldMessages.length > 0 ? myOldMessages.map((m) => (
                                    <OldMessage message={m} />
                                )) : <h1>Você não tem nenhuma mensagem anterior.</h1>
                            }
                        </div>
                    </div>
                    <div class="mesgs col-md-8">
                        <div class="msg_history">
                            {
                                messages.map((m, index) => (
                                    <Message message={m} myId={myId} />
                                ))
                            }
                        </div>

                        <div class="type_msg">
                            <div class="input_msg_write">
                                <input type="text" className="form-control"
                                    placeholder="Digite a sua mensagem e pressione clique no botão para enviar..."
                                    onChange={handleInputChange} value={message}
                                />
                                <button class="msg_send_btn primary-bg" type="button" onClick={handleFormSubmit}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-danger mt-1"
                    onClick={() => {
                        history.push(availablePages.homePage)
                        displayAlert('Desconectado do chat com sucesso.', typesAlert.error);
                    }}
                >
                    Sair do chat
                </button>
            </div>
        </div>
    )
}

export default Chat;