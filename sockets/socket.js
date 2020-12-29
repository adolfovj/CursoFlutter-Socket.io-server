


//haciendo referencia al paquete .io
const {io} = require('../index');
const Bands = require('../models/bands');

//instanciando  la clase bands
const bands = new Bands();
//console.log('hola')

bands.addBand(new band('Jarape de Palo'));
bands.addBand(new band('Mana'));
bands.addBand(new band('Jorge Celedon'));
bands.addBand(new band('Metallica'));
//console.log(bands);


// Mensajes de Sockets
//Client va ser un disposito que se va a conectar al socket server y va
//a caer aqui en este cliente
io.on('connection', client => {

    console.log("Cliente conectado");
  
    //=========
    //Emite al mensaje SOLAMENTE AL CLIENTE QUE SE ESTA CONECTANDO
    client.emit("active-bands", bands.getBands())

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

    //Para las votaciones
    client.on('vote-band', (payload) => {

        console.log(payload);
        bands.voteBand( payload.id );

        //Notifica a todos los que esten escuchando
        //io !!!!ES EL SERVIDOR - AQUI LOS MANDA A TODOS INCLUYENDO AL CLIENTE 
        //QUE ENVIO LA EMISION
        io.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', (payload) => {
        //se crea la nuevan banda
        const newBand = new Band( payload.name );
        bands.addBand( newBand );
         //Se notifica a todos los usuarios
        io.emit('active-bands', bands.getBands() );
    });

    //Eliminar una banda
    client.on('delete-band', (payload) => {

        bands.deleteBand( payload.id );
        //Se notifica a todos los usuarios
        io.emit('active-bands', bands.getBands() );
    });    

    // ======== MUY IMPORTANTE
    //=========Emitir mensaje que la persona quiere emitir!!!    
    client.on('emitir-mensaje', ( payload ) => {
        // console.log(payload);
        // io.emit('nuevo-mensaje', payload ); // emite a todos los clientes ====!
        // client.broadcast.emit('nuevo-mensaje', payload ); // emite a todos menos el que lo emitió ====!!
    })

  });