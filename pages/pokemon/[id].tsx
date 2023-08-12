/*
Esto esta en la carpeta de pokemon en pages, por lo tanto al hacer 
pokemon/id aparecera esto
*/
import { useEffect, useState } from "react";
import Layout from "@/componentes/layouts/Layout"
import { NextPage } from "next";
import { GetStaticProps } from 'next'
import pokeApi from "@/api/pokeApi";
import { Pokemon } from "@/interfaces/pokemonFull";
import { Button, Card, Container, Grid,Image,Text } from "@nextui-org/react";

import { GetStaticPaths } from 'next'

import {existeEnFavoritos, guardarEnFavoritos} from "@/utilidades/localStorageFavoritos";

import confetti from 'canvas-confetti';
import { getPokemonInfo } from "@/utilidades/getPokemonInfo";

interface Props {
  pokemon : Pokemon; //ESTO PERMITE MANEJAR BIEN LO QUE ME VIENE
  //pokemon tendra la interface de pokemonFull


}


const PokemonPage:NextPage<Props> = ( {pokemon} ) => {
  //Le digo que viene un id y name del pokemon
  //Debo mandarme estas props desde la funcion getStaticProps
  //En pokemon tengo toda la info del pokemon
  //  console.log(pokemon);
  // const {query} = useRouter();
  // console.log(query); //Aca me esta llegando el id de pokemon/[id]
 
  /*
  El estado inicial lo obtengo de la funcion que me hice 
  para saber si esta o no en favoritos -> Yo ya puedo leer si esta en el
  localstorage,porque es un proceso sincrono
  */

  // const [existeEnFav,setExisteEnFav] = useState(existeEnFavoritos(pokemon.id)); //Aca ya se si esta o no en favoritos por mi funcion

  const [existeEnFav,setExisteEnFav] = useState(false);

  useEffect(() => {
    //Para evitar que nos de error hacemos aca el seteo
    //Le seteo el valor de lo q tiene la funcion existeEnFavoritos, que retorna true si encuentra el id
    setExisteEnFav(existeEnFavoritos(pokemon.id));
  },[]);



  
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
          <Button suppressHydrationWarning
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
  //Se usa cuando tenemos algo dinamico para devolver [id]

  const pokemons151 = [...Array(151)].map( (value,index) => `${ index + 1 }`);
  //Creamos un arreglo que va de 1 a 151
  //console.log(pokemons151); //salida : 1',   '2',  '3',  '4',  '5',  '6',  '7',  '8',  '9',


  return {
    // paths: [ //Cantidad de paginas que se mostraran
    paths : pokemons151.map( id => ({
      //Debe retornar string
      params: { id: id }
    })),
    //fallback: false //No lo quiero en blocking, lo quiero en false
    //Si la persona pone un url q no existe, quiero mostrar un 404
    //Eso permite el fallback en false
    fallback:'blocking', //permite pasar al getStaticProps, pero debemos verificar que existe el id en el getStaticProps -> SI solicito el 152 me dejara verlo
  }
}





export const getStaticProps: GetStaticProps = async ( { params }) => {
    
  //Aca recibimos los params que nos pasa el getStaticPath
  //Debemos hacer uso del contexto (ctx)
  // console.log(ctx.params); //Me llega el id de la url

  const { id } = params as { id: string }; //Le digo que el id sera tipo string
   //Le mando a mi pagina solo lo que voy a usar
  //Hicimos una funcion que se encargá de lo de arriba
  //Me traigo el id q llega desde getStaticPaths
  //Si existe la data retorname esto
  const pokemon = await getPokemonInfo( id );//Le mando el pokemon a mi pagina, solo lo que necesito y a mi función le mando el id

  if( !pokemon ) {
    //Si el pokemon no existe
    return{
      redirect:{
        destination:'/', //Lo mandamos al inicio si solicita algo que no existe
        permanent:false
      }
    }
  }
  //Si tenemos un pokemon se retornara esto
  return {
    //Aca debo enviarle las props a mi PokemonPage(ARRIBA)
    props: {
      pokemon : pokemon
      
    },
    revalidate:86400 //60*60*24 -> Q next no haga el calculo, colocar numero
   /*
    Este revalidate significa que se hara un incremental static 
    regeneration cada 24 horas, se actualizará la pagina cada 24 horas
    ISR -> INCREMENTAL STATIC REGENERATION
    */
  }
}



export default PokemonPage;

