
export const guardarEnFavoritos = (id:number) => {
    //Estoy esperando el id del pokemon

    // console.log('Llamada a guardar en favoritos');

    let favoritos: number[] = JSON.parse(localStorage.getItem('Favoritos') || '[]');
    /*
    Le estoy diciendo que voy a guardar un arreglo de numeros 
    y voy a transformar un objeto que se va a encontrar en el 
    localStorage.getItem('Favoritos')
    Si es nulo que regrese un []
    */

    if(favoritos.includes(id) ) {
        favoritos = favoritos.filter( pokemonId => pokemonId !== id);
        /*
        Si en favoritos esta el id, quiero hacer un 
        nuevo arreglo pero sacando el id que coincide con 
        el pokemonId, Excluye el pokemon que me viene
        */
       
    }
    else {
        //Si el id no esta en favoritos, lo incluimos
        //El id seria el id Del pokemon
        favoritos.push (id);
       }
     /*
        Guardo el nuevo arreglo en el localStorage
        */
    localStorage.setItem('Favoritos',JSON.stringify( favoritos ) );
}

export const PokemonsFavorites = ():number[] => {
    //Funcion para saber que tengo en el localStorage
    return JSON.parse(localStorage.getItem('Favoritos') || '[]');
}

export const existeEnFavoritos = (id:number):boolean => {

    if( typeof window === 'undefined' ) return false;
    let favoritos: number[] = JSON.parse(localStorage.getItem('Favoritos') || '[]');
    //obtengo el arreglo de lo que esta en localStorage


    return favoritos.includes(id); //Si el id esta en el arreglo retorna true,sino false

}