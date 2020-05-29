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

        <div className="container mt-4">
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people col-md-4">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Minhas mensagens</h4>

                            </div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <input type="text" className="search-bar" placeholder="Pesquisar" />
                                    <span className="input-group-addon">
                                        <button type="button">
                                            <i className="fa fa-search" aria-hidden="true"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>


                        </div>
                        <div className="inbox_chat">
                            {
                                myOldMessages.length > 0 ? myOldMessages.map((message, index) => (
                                    <div class="chat_list active_chat" key={index}>
                                        <div class="chat_people">
                                            <div class="chat_ib">
                                                <p>Conteúdo: {message.content}</p>
                                                <small>Enviada em {message.date}</small>
                                            </div>

                                            <button class="btn btn-sm btn-danger" onClick={() => {
                                                mainApi.post(eps.deleteMessage, { messageId: message._id }).then((res) => {
                                                    if (res.data.success) {
                                                        displayAlert(res.data.message, typesAlert.success);
                                                        setMessages(messages.filter(item => item !== message));
                                                        setOldMessages(myOldMessages.filter(item => item !== message));
                                                    }
                                                })
                                            }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
                                    </div>
                                )) : <h1>Você não tem nenhuma mensagem anterior.</h1>
                            }
                        </div>
                    </div>
                    <div className="mesgs col-md-8">
                        <div className="msg_history">
                            {
                                messages.map((m, index) => (
                                    <Message message={m} myId={user._id} key={index + 1} />
                                ))
                            }
                        </div>

                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" className="form-control"
                                    placeholder="Digite a sua mensagem e pressione clique no botão para enviar..."
                                    onChange={handleInputChange} value={message}
                                />
                                <button className="msg_send_btn primary-bg" type="button" onClick={handleFormSubmit}><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-danger mt-1"
                    onClick={() => {
                        handleLogout();
                        history.push(availablePages.loginPage)
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