import React from 'react';

const OtherMessage = ({ message }) => (
    <div class="media w-50 mb-3">
        <img class="rounded-circle" src="https://ptetutorials.com/images/user-profile.png" width="50" />
        <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">{message.userName} disse: {message.content}</p>
            </div>
            <p class="small text-muted">Enviado em: {message.date}</p>
        </div>
    </div>
)

export default OtherMessage;
