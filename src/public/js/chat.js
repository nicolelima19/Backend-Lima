const socket = io();

let user;
let chatBox = document.getElementById('messageLogs');
let log = document.getElementById('chatBox');
let data = [];

socket.on('message', msg => {
    data.push(msg);
    renderizar(data);
});

socket.on('messageLogs', newData => {
    data = newData;
    renderizar(data);
});

const renderizar = (msgs) => {
    let messages = '';

    msgs.forEach(message => {
        const isCurrentUser = message.user === user;
        const messageClass = isCurrentUser ? 'my-message' : 'other-message';
        messages += `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
    });

    log.innerHTML = messages;
    chatBox.scrollIntoView(false);
};

Swal.fire({
    title: 'Identifícate',
    input: 'email',
    text: 'Ingresa tu correo electrónico para entrar.',
    inputValidator: (value) => {
        if (!value)
            return 'Necesitas ingresar un correo electrónico para continuar.';

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value))
            return 'Ingresa un correo electrónico válido.';

        return null;
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        renderizar(data);
    }
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key == 'Enter') { 
        const message = chatBox.value.trim();
        if (message.length > 0) {
            socket.emit('message', { user, message });
            chatBox.value = '';
        }
    }
});


socket.on('new_user', () => {
    Swal.fire({
        text: 'Nuevo usuario conectado',
        toast: true,
        position: 'top-right'
    });
});
