import React from 'react';

const MyMessage = ({ message }) => (
    <div class="outgoing_msg">
        <div class="sent_msg">
            <p>Você disse: {message.message}</p>
            <span class="time_date">Enviado em: {message.date}</span>
        </div>
    </div>
);

export default MyMessage;