//const es como el import
//se leasigna v4 a la libreria
const{ v4: uuidV4 } = require('uuid');

class Band {

    constructor (name ="no-name") {
        this.id = uuidV4(); //Identificador unico
        this.name = name;
        this.votes = 0;
    }
}

//Exportacion del archivo band.js para eso se utiliza la siguiente linea
//Crea la exportacion por defecto
module.exports = Band;