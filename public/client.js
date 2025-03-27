const socket = io()
let name;
let textarea = document.querySelector('#textarea') //id #textarea
let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please Enter Your Name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {

    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)   //socket.emit allows you to emit custom events on the server and client.

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 

socket.on('message', (msg) => {      //Socket.on(event, callback)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}





