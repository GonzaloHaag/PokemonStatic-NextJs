import { NextPage } from 'next';

import {Grid,Card,Row,Text} from '@nextui-org/react';

import Layout from '@/componentes/layouts/Layout';
import { GetStaticProps } from 'next';
import pokeApi from '@/api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '@/interfaces/pokemon-list';

import {Button} from '@nextui-org/react';
import PokemonCard from '@/componentes/pokemon/PokemonCard';


//Interface de las props que recibe HomePage
interface Props {
  pokemons : SmallPokemon[];
}


// title : Listado de pokemones -> Porque estoy en la home

  const HomePage : NextPage<Props> = ({pokemons}) => {
    //Recibo los pokemons q me manda la funcion getStaticProps
    //Estoy esperando un arreglo, por eso la interface
   
   console.log(pokemons);

  
  return (
    
    <Layout title='Listado de Pokemones'> {/*Para usar el layout */}
    {/*Le mando el title que recibe como props 
    el componente Layout, para q sea dinamico */}

   

    <Grid.Container gap={2} justify='flex-start'> {/*Componente de nextUi en vez de una ul*/}
      {/*Aca quiero el listado de pokemones
      ya en pokemons me llega la info necesaria*/}
      {
       pokemons.map ( (pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} /> 
        //Este componente se encarga de hacer el li
        // <li key={pokemon.id}> {/*Por cada uno quiero un li*/}
        //  #{pokemon.id} - Nombre: {pokemon.name}

        // </li>
        //En vez de li, usaremos un componente de nextUi(Grid)

       ))
      }
     
    </Grid.Container>
    <Button color='gradient'>
      Hola button en nextUi
    </Button>
    </Layout>
    
  )
}

export default HomePage;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {
  /*
  Esta funcion se ejecuta unicamente del lado del 
  SERVIDOR y solo se ejecuta en npm run build
  Y esta funcion solo la podemos usar en las pages
  Quiero cargar mis 151 pokemones para que esten pre-insertados en
  la pagina
  Cuando el cliente solicite algo, ya estaran los pokemonees cargados
  anteriormente
  */
    //Pedir los pokemones

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    /*
    Esa interfaz de PokemonListResponse tiene el tipo de dato que yo
    quiero al pedir la lista, y q no sean de tipo any 
    */
    /*Mi base url es hasta v2, por eso el /pokemon?limit=151
    trae los 151*/

    //Foto del pokemon 
  

    const pokemons : SmallPokemon[] = data.results.map( (pokemon,indice) => ({
      ...pokemon, //Lo que ya estaba en pokemon (name y url, mas lo de abajo)
      id : indice + 1, //Esto me da el indice del pokemon
      img : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indice + 1}.svg`
    }) )
    //console.log('Hola mundo'); //Se ejecutara solo en mi consola

  return {
    //Estas props son las que recibe HomePage
    props: {
     
      pokemons //Se lo mando al homePage
      
    }
  }
}