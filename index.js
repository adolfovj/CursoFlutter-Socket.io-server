
//Parecido a una importacion en flutter
const express = require('express'); // express trae por defecto el paquete http que trae node
const path = require('path');

//Va a leer el archivo y establecer las variables de entorno
require('dotenv').config();

//lo inicializa - App de Express
const app = express();

//-- Node Server 
const server = require('http').createServer(app);

//node para exportar io en otro archivo al archivo de sockets
module.exports.io = require('socket.io')(server);

//llamando el archivo de sockets
require('./sockets/socket');


//Path publico
//__dirname estoy apunto a donde sea que este apuntando el Servidor
// es decir la ruta... bla bla.. el nombre del dominio etc y vamos 
//apuntar a la carpeta public
const publicPath = path.resolve(__dirname, 'public');

app.use( express.static(publicPath));

//app escucha en algun puerto 3000
//CUANDO SE VAYA A PUBLICAR EN UN SERVIDOR, TOCA CAMBIAR EL PUERTO
//POR QUE CUANDO SE DESPLIEGA EN UN DOMINIO NO SABEMOS QUE PUERTO ES TOCA ESTABLECERLO
//DE MANERA DINAMICA. 
//SE DEBE INSTALAR UN PAQUETE npm i dotenv
server.listen(process.env.PORT, (err) => {

    //preguntar si hay un error haciendo el llamado
    //esto es para mirar en consola
    if(err) throw new Error(err);

    console.log('publicPath --> ', publicPath);
    //Si no sale el error entonces ya el servidor esta corriendo en el puerto 3000
    console.log('-- Servidor corriendo en el puerto   :) !!', process.env.PORT);
});

//Para correr el servidor, se debe ir a la consola, pararse en la carpeta
// y ejecutar  node index

//Hay que instalar de manera global nodemon que permite hacer cambios 
//en nuestra aplicacion de node y rapidamente refrescar los cambios y 
//mostar el servidor
//  sudo npm i -g nodemon  *Comado instalacion

// ejecutar el comando nodemon index  *index es el archivo del servidor
// lo baja y lo vuelve a subir con cada cambio