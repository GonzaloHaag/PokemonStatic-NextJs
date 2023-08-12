/*
Esto esta en la carpeta de pokemon en pages, por lo tanto al hacer 
pokemon/id aparecera esto
*/
import {  useEffect, useState } from "react";
import { Button, Card, Container, Grid,Image,Text } from "@nextui-org/react";
import Layout from "@/componentes/layouts/Layout"
import { NextPage } from "next";
import { GetStaticProps,GetStaticPaths } from 'next'
import pokeApi from "@/api/pokeApi";
import { Pokemon } from "@/interfaces/pokemonFull";




import {existeEnFavoritos, guardarEnFavoritos} from "@/utilidades/localStorageFavoritos";

import confetti from 'canvas-confetti';
import { PokemonListResponse } from "@/interfaces/pokemon-list";
import { getPokemonInfo } from "@/utilidades/getPokemonInfo";

interface Props {
  pokemon : Pokemon; //ESTO PERMITE MANEJAR BIEN LO QUE ME VIENE
  //pokemon tendra la interface de pokemonFull


}


const PokemonPorNombrePage:NextPage<Props> = ( { pokemon } ) => {
  //Le digo que viene un id y name del pokemon
  //Debo mandarme estas props desde la funcion getStaticProps
  //En pokemon tengo toda la info del pokemon
   console.log({pokemon});
  // const {query} = useRouter();
  // console.log(query); //Aca me esta llegando el id de pokemon/[id]
 
  /*
  El estado inicial lo obtengo de la funcion que me hice 
  para saber si esta o no en favoritos -> Yo ya puedo leer si esta en el
  localstorage,porque es un proceso sincrono
  */

//   const [existeEnFav,setExisteEnFav] = useState(existeEnFavoritos(pokemon.id)); //Aca ya se si esta o no en favoritos por mi funcion
const [existeEnFav,setExisteEnFav] = useState(false);
  useEffect(() => {
   setExisteEnFav(existeEnFavoritos(pokemon.id))
  },[])
  
  const handleGuardarEnFavoritos  = () => {
    //Llamo a mi funcion que se encarga de la logica(desde utilidades)
    guardarEnFavoritos(pokemon.id);
    //Le paso el pokemon.id como parametro que esta esperando esa funcion
    setExisteEnFav(!existeEnFav); //Importante asi se actualiza el boton

    if(!existeEnFav){
      //Si el pokemon no estaba en favoritos, quiero realizar una animacion al tocar el boton
      confetti({
        //ver documentacion
        zIndex:999,
        particleCount: 100,
        spread: 160,
        angle:-100,
        origin : {
          x:1,
          y:0
        }

        
      });
    }

  }

  {/*LO que yo haga aca correrá del lado del servidor, 
     yo no tengo acceso al localStorage aca, porque esta corriendo en
     nodeJs */ }

  return (
    <Layout title={pokemon.name}> {/*Le mando el title al layout,
    nombre del pokemon*/}
    <Grid.Container css = {{marginTop : '5px'}} gap={ 2 }>
     <Grid xs = { 12 } sm = { 4 } >
      <Card hoverable css={{ padding: '30px'}}> 
        <Card.Body>
        <Card.Image
        src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} //Imagen del pokemon 
        alt={pokemon.name}
        width='100%'
        height={200}
        />
        </Card.Body>

      </Card>

     </Grid>

     <Grid xs = {12} sm = { 8 } >
      <Card>
        <Card.Header className="card-header-column"  css={ {
           display:'flex', 
           justifyContent : 'space-between',
           }}>
          <Text h1 transform="capitalize"> { pokemon.name } </Text>
          <Button
          color='gradient'
          ghost = {!existeEnFav}
          onClick={handleGuardarEnFavoritos}
          >
           {existeEnFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          </Button>

        </Card.Header>

        <Card.Body>
          <Text size={30}> Sprites: </Text>
          <Container direction='row' display="flex" gap={0}>
            <Image
            //Imagen evolucion 1
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={100}
            height={100} 
            />
              <Image
               //Imagen evolucion 2
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            width={100}
            height={100} 
            />
              <Image
               //Imagen evolucion 3
            src={pokemon.sprites.front_shiny}
            alt={pokemon.name}
            width={100}
            height={100} 
            />
              <Image
               //Imagen evolucion 4
            src={pokemon.sprites.back_shiny}
            alt={pokemon.name}
            width={100}
            height={100} 
            />
          </Container>
        </Card.Body>
      </Card>
     </Grid>
      
    </Grid.Container>
    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    //Aca necesito pedir los 151 pokemons, porque necesito el nombre de cada uno 
    const {data} = await pokeApi<PokemonListResponse>('/pokemon?limit=151');
    const nombrePokemones : string[] = data.results.map(pokemon => pokemon.name);
    //Me armo un string con los nombres de los pokemons


    return {
        paths: nombrePokemones.map(nombre => ({
            params : {nombre:nombre} //Esto le paso al getStaticProps
        })),
        fallback: 'blocking' //NO OLVIDAR ESTO EN BLOCKING -> Si no no pasara al props 
    }
}




export const getStaticProps: GetStaticProps = async ({ params }) => {
    //Recibo los parametros que me manda getStaticPaths
    const { nombre } = params as {nombre : string}; //Recibo el nombre de los params e indico que será string

    //Ahora que tengo el nombre puedo hacer la peticion a la api por nombre 
   
    //Para no repetir codigo hicimos una funcion que se encargá de lo de arriba
   const pokemon = await getPokemonInfo(nombre); //Aca le mando el nombre
   
   if( !pokemon ) {
    //Si el pokemon no existe lo mando a la home
    return {
      redirect: {
        destination:'/',
        permanent: false
      }
    }
   }
   //Si existe lo retorno
    return {
        props: {
            pokemon : pokemon
            //Le mando el objeto pokemon a mi pagina,Solo necesito el id, name y los sprites
        },
        revalidate:86400
         /*
         Este revalidate significa que se hara un incremental static 
         regeneration cada 24 horas, se actualizará la pagina cada 24 horas
        ISR -> INCREMENTAL STATIC REGENERATION
       */
    }
}

export default PokemonPorNombrePage;