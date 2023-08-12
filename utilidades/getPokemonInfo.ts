//Funcion para no repetir codigo en [id] y [nombre]
/*
En un principio teniamos esto 
  const { id } = params as { id: string }; //Le digo que el id sera tipo string
   
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ id }`);
  if(!data) { //Si no existe el id retorname esto
    return {
      redirect: {
        destination:'/', //adonde lo quiero mandar si no existe lo que se solicita
        permanent:false
      }
    }
  }

  const pokemon = {
    id: data.id,
    name : data.name,
    sprites : data.sprites
    //Le mando a mi pagina solo lo que voy a usar

  }
*/

/*
Como en nombre y en id hago exactamente lo mismo,  hacemos 
una funcion para generalizarlo
*/
import pokeApi from "@/api/pokeApi";
import { Pokemon } from "@/interfaces/pokemonFull";
//Importar la interface para manejar los datos q recibimos

export const getPokemonInfo = async (nombreOId:string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nombreOId }`);

    return {
      id: data.id,
      name : data.name,
      sprites : data.sprites
      //Le mando a mi pagina solo lo que voy a usar
  
    }

  }
  catch(error) {
    return null;
  }
  //Recibe el nombre o el id, retorna un string
   
 

}