const socket = io();

let user;
let chatBox = document.getElementById('messageLogs');
let log = document.getElementById('chatBox');
let data;

socket.on('message', msg => {
    data = msg;
});

socket.on('messageLogs', data => {
    renderizar(data);
});

const renderizar = (msgs) => {
    let messages = '';

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
    });

    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
}

Swal.fire({
    title: 'Identificate',
    input: 'email',
    text: 'Ingresa tu correo electronico para entrar.',
    inputValidador: (value) => {
        if (!value)
            return 'Necesitas ingresar un correo electronico para continuar.';

        const emailRegex = [];

        if (!emailRegex.toLocaleString(value))
            return 'Ingresa un correo electronico válido.';

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        renderizar(data);
    }
});

