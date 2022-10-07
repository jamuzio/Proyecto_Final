
const socket = io()

///// control de socket //////


socket.on('mensajes', (mensajes) => {
    mostrarMensajes({mensajes})
})

socket.on('Msj_res', (Respuesta) =>{
    const divMsj_info = document.getElementById('Msj_info')
    console.log(Respuesta)
    divMsj_info.innerHTML = Respuesta
})

/////  funciones axuliares /////////


async function mostrarMensajes(mensajes) {
    const divMensajes = document.getElementById('Mensajes')
    buscarPlantilla('Templates/chat.hbs').then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla)
        console.log(mensajes)
        divMensajes.innerHTML = generarHtml(mensajes)
    })
}

function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}

/////  control de botones //////


const btn = document.getElementById('btn_enviar')
btn.addEventListener('click', event => {
    const email = document.getElementById('inputEmail').value
    const texto = document.getElementById('inputTexto').value
    socket.emit('mensaje', { email, texto})
})

