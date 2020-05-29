import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainApi, { eps } from '../../../services/mainApi';
import { displayAlert, typesAlert } from '../../../utils/displayAlert'

const OldMessage = ({ message }) => (
    <div class="chat_list active_chat">
        <div class="chat_people">
            <div class="chat_ib">
                <p>Conteúdo: {message.content}</p>
                <small>Enviada em {message.date}</small>
            </div>

            <button class="btn btn-sm btn-danger" onClick={() => {
                console.log(message._id)
                mainApi.post(eps.deleteMessage, { messageId: message._id }).then((res) => {
                    if (res.data.success) {
                        displayAlert(res.data.message, typesAlert.success);
                    }
                })
            }}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    </div>
)

export default OldMessage;