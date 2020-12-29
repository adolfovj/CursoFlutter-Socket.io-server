
class Bands {

    constructor() {
        this.bands = [];
    }

    // Adicionar una nueva banda
    // la banda va hacer de tipo band band = new Band ()
    addBand (band = new Band ()) {
        //adicionar una banda nueva
        this.bands.push( band );
    }

    //Obtener las bandas
    getBands() {
        return this.bands;
    }

    // Borrar una banda
    //Solo omite el id del listado... no es un verdadeo delete es un filtro
    deleteBands(id = "") {
        this.bands = this.bands.filter(band => band.id != id);
        return this.bands;
    }

    voteBand(id = "") {
        //el map en java script lo que es aqui es transformar la band que se tiene 
        // en el momento por eso se retorna band
        this.bands = this.bands.map( band => {
            if(band.id == id) {
                band.votes++;
                return band;
            } else {
                return band;
            }
        });
    }
}

module.exports = Bands;