import React from 'react';

const OtherMessage = ({ message }) => (
    <div class="incoming_msg">
        <div class="incoming_msg_img">
            <img src="https://ptetutorials.com/images/user-profile.png" />
        </div>
        <div class="received_msg">
            <div class="received_withd_msg">
                <p>{Math.random()} disse: {message.message}</p>
                <span class="time_date">Enviado em: {message.date} </span>
            </div>
        </div>
    </div>
)

export default OtherMessage;