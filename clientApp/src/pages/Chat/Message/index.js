import React from 'react';
import { MyMessage, OtherMessage } from '../MessagesTypes/index';


const Message = ({ message, myId }) => {

    return (
        message.id === myId ? <MyMessage message={message} /> : <OtherMessage message={message} />
    )

}

export default Message;