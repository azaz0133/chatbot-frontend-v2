const chatData = {
    participants: [
        {
            id: 'Bot',
            name: 'Bot',
            // imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        }
    ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    titleImageUrl: '',
    messageList: [
    ], // the list of the messages to show, can be paginated and adjusted dynamically
    newMessagesCount: 0,
    isChatOpen: true, // to determine whether the chat window should be open or closed
    showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
    showEmoji: false,
    showFile: false,
    colors: {
        header: {
            bg: '#4e8cff',
            text: '#ffffff'
        },
        launcher: {
            bg: '#4e8cff'
        },
        messageList: {
            bg: '#ffffff'
        },
        sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
        },
        receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
        },
        userInput: {
            bg: '#f4f7f9',
            text: '#565867'
        }
    }, // specifies the color scheme for the component
    alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
}
export { chatData }