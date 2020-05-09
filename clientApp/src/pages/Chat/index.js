import React, { useState, useEffect } from 'react';
import { HeaderComponent } from '../../components/index';
import './styles.css';
import io from 'socket.io-client';
import { displayAlert, typesAlert } from '../../utils/displayAlert';

const myId = Math.random();

/*
    TODO:
    
    1. recreate the design, the actually is a simple example.
    2. we need to make this page private, but in first we need to create signup and login pages and actions.
    3. we will need to make a semi-complex logic in this page, because:
        * the socket io doesn't have any method to save the messages on mongodb, so probably we
        need to use the another api provided by Vinicius, so, in every message submit we will
        need to make a post on the api and if post is ok, we push this to the socket.io api.
        * we need to make some logic to verify if user are allowed to send messages (authenticated),
        actually we have a function tha makes this verification, but in this page we doesn't have
        none to check this.
*/

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:8080');

    //this connect to the socket
    socket.on('connect', () => {
        displayAlert("Conectado com sucesso ao chat.", typesAlert.success);
    })

    useEffect(() => {
        const handleNewMessage = newMessage => {
            setMessages([...messages, newMessage]);
        }
        socket.on('chat.message', handleNewMessage);

        return () => socket.off('chat.message', handleNewMessage);

    }, [messages]);

    const handleInputChange = event => {
        setMessage(event.target.value);
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        //check if message state have some value
        if (message.trim()) {
            socket.emit('chat.message', {
                id: myId,
                message
            })
            setMessage('');
        }
    }


    return (
        <>
            <HeaderComponent />
            <main className="container">
                <ul className="list">
                    {
                        messages.map((m, index) => (
                            <li
                                className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                                key={index}
                            >
                                <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                                    Enviador por: {m.id}<br></br>
                                    {m.message}
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <form className="form" onSubmit={handleFormSubmit}>
                    <input className="form__field" placeholder="Digite alguma mensagem e pressione enter para enviar..."
                        onChange={handleInputChange}
                        value={message}
                    />
                </form>
            </main>
        </>
    )
}

export default Chat;