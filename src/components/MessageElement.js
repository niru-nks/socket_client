import React from 'react'

const MessageElement = (element) => {
    console.log(element);
    let { data, keyId } = element;
    console.log(data)
    let messageBox;
    if (element.data)
        messageBox = element.data.map((element, i) => {
            console.log()
            return <div key={i} className={keyId == element.userId ? "user-message-box" : "expert-message-box"}>
                {element.content}
            </div>
        })
    else
        messageBox = [];
    return (
        <div className="message-box">
            <div className="message-title">{element.keyId}</div>
            {messageBox}
        </div>
    )
}
export default MessageElement;