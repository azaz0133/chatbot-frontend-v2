var axios = require("axios")
import { API } from "./constant";

function onMessageWasSent(message) {
    // called when the user sends a message

    if (message.data.text.length > 0) {

        // this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.messageList = [...this.messageList, message]
        axios.get(
            API + `/hbot/test?message=${message.data.text}&uid=${this.uuid}`
        ).then(({ data: { responseMessage } }) => {
            this.messageList = [...this.messageList, { author: 'Bot', type: 'text', data: { text:responseMessage } }]
        });
    }
    // console.log(message.data.text)
    // this.messageList = [...this.messageList, message]
}
function openChat() {
    // called when the user clicks on the fab button to open the chat
    this.isChatOpen = true
    this.newMessagesCount = 0
}
function closeChat() {
    // called when the user clicks on the botton to close the chat
    this.isChatOpen = false
}
function handleScrollToTop() {
    // called when the user scrolls message list to top
    // leverage pagination for loading another page of messages
}
function handleOnType() {
    console.log('Emit typing event')
}



export {
    handleOnType, handleScrollToTop, openChat, onMessageWasSent, closeChat,     
}