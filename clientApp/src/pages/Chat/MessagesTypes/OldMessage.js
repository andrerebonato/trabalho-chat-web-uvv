import React from 'react';

const OldMessage = ({ message }) => (
    <div class="chat_list active_chat">
        <div class="chat_people">
            <div class="chat_ib">
                <p>{message.message}</p>
                <small>Enviada em {message.date}</small>
            </div>
        </div>
    </div>
)

export default OldMessage;