import React, { useState, useEffect } from 'react';
import './styles.css';
import { displayAlert, typesAlert } from '../../utils/displayAlert';
import Message from './Message/index';
import moment from 'moment';
import { handleLogout, getUser } from '../../services/authJwt';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { availablePages } from '../../constants/index';
import { useHistory } from 'react-router-dom';
import mainApi, { eps } from '../../services/mainApi';
import { OldMessage } from './MessagesTypes';

const Chat = ({ location }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [myOldMessages, setOldMessages] = useState([]);
    const userId = getUser();
    const history = useHistory();
    const user = location.state.user;


    useEffect(() => {
        mainApi.get(eps.getOldMessages, { userId: user._id }).then((response) => {
            if (response.data.success) {
                console.log('old', response.data.data)
                setOldMessages(response.data.data);
            }
        });
    }, [])

    useEffect(() => {
        mainApi.get(eps.getAllMessages).then((response) => {
            if (response.data.success) {
                setMessages(response.data.data);
            }
        });
    }, []);

    useEffect(() => { displayAlert("Conectado com sucesso ao chat.", typesAlert.success); }, []);

    const handleInputChange = event => {
        setMessage(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        //check if message state have some value
        if (message.trim()) {
            let newMessage = {
                user: user._id,
                content: message,
                date: moment(new Date()).format('DD/MM/YYYY HH:mm'),
                userName: `${user.firstname} ${user.lastname}`
            }
            mainApi.post(eps.createMessage, newMessage).then((res) => {
                if (res.data.success) {
                    setMessages([...messages, newMessage]);
                    setOldMessages([...myOldMessages, newMessage]);
                    setMessage('');
                }
            })

        }
    }

    return (
        <div class="container py-5 px-4">
            <header class="text-center">
                <h1 class="display-6 text-white text-bold">chat dos aliados</h1>
            </header>
            <div class="row rounded-lg overflow-hidden shadow">
                <div class="col-5 px-0">
                    <div class="bg-white">
                        <div class="bg-gray px-4 py-2 bg-light">
                            <p class="h5 mb-0 py-1">Mensagens antigas</p>
                        </div>
                        <div class="messages-box">
                            <div class="list-group rounded-0">
                                {
                                    myOldMessages.length > 0 ? myOldMessages.map((message, index) => (
                                        <div class="list-group-item list-group-item-action list-group-item-light rounded-0">
                                            <div class="media">
                                                <div class="media-body ml-4">
                                                    <div class="d-flex align-items-center justify-content-between mb-1">
                                                        <h6 class="mb-0">Data de envio:</h6><small class="small font-weight-bold">{message.date}</small>
                                                    </div>
                                                    <p class="font-italic mb-0 text-small">Conteúdo: {message.content}</p>
                                                </div>
                                                <button class="btn btn-sm btn-danger mt-4" onClick={() => {
                                                    mainApi.post(eps.deleteMessage, { messageId: message._id }).then((res) => {
                                                        if (res.data.success) {
                                                            displayAlert(res.data.message, typesAlert.success);
                                                            setMessages(messages.filter(item => item._id !== message._id));
                                                            setOldMessages(myOldMessages.filter(item => item._id !== message._id));
                                                        }
                                                    })
                                                }}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </div>

                                    )) : <h6 class="mb-0 text-center mt-4">Você não tem nenhuma mensagem anterior.</h6>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-7 px-0">
                    <div class="px-4 py-5 chat-box bg-white">
                        {
                            messages.map((m, index) => (
                                <Message message={m} myId={user._id} key={index + 1} />
                            ))
                        }
                    </div>
                    <div class="bg-light">
                        <div class="input-group">
                            <input type="text" placeholder="Insira uma mensagem que deseja enviar..." aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light text-left" onChange={handleInputChange} value={message} />
                            <div class="input-group-append">
                                <button id="button-addon2" type="submit" onClick={handleFormSubmit} class="btn btn-link"> <i class="fa fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-light mt-1"
                    onClick={() => {
                        handleLogout();
                        history.push(availablePages.loginPage)
                        displayAlert('Desconectado do chat com sucesso.', typesAlert.error);
                    }}
                >
                    Desconectar do chat
                </button>
            </div>
        </div >
    )
}

export default Chat;