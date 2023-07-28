import pokeApi from "@/api/pokeApi";
import { Pokemon } from "@/interfaces/pokemonFull";

//Esta funcion retornara la data para cuando se llame
export const getPokemonInfo = async (nameOId : string) => {
    //voy a recibir el nombre o el id 

    //Ahora que tengo el nombre puedo hacer la peticion a la api por nombre 
    const {data} = await pokeApi<Pokemon>(`/pokemon/${nameOId}`);

    return  {
        //Retorna esta informacion que necesito, para no repetir codigo en [nombre] o [id]
      id: data.id,
      name : data.name,
      sprites : data.sprites
      //Le mando a mi pagina solo lo que voy a usar

    }

    

}