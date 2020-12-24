
//haciendo referencia al paquete .io
const {io} = require('../index');

// Mensajes de Sockets
//Client va ser un disposito que se va a conectar al socket server y va
//a caer aqui en este cliente
io.on('connection', client => {

    console.log("Cliente conectado");
  
    //Call back que notifica cuando el cliente se desconecte
    client.on('disconnect', () => { 
        console.log("Cliente desconectado");
    });
  
    //Estar escuchando
    //Debe ser el mismom nombre del evento, es decir mensaje
    //payload :  Es el objeto que se envio
    // es el cliente que envia esa informacion
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
      
        //Servidor envia mensaje a todos los clientes
        io.emit('mensaje', { admin: 'Nuevo mensaje'});
    });
  
  });