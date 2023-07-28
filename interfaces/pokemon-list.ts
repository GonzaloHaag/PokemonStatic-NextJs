//Interface de los tipos de datos que quiero al pedir la lista de pokemones
export interface PokemonListResponse { //Esto voy a importar
    count : number;
    next? : string;
    previous? : string;
    results : SmallPokemon[];
}
export interface SmallPokemon {
    id:number;
    img: string;
    name : string;
    url : string;
}