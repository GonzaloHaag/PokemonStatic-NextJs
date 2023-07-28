import React, { useEffect, useState } from 'react'
import Layout from '@/componentes/layouts/Layout';
import NoFavoritos from '@/componentes/ui/NoFavoritos';
import { PokemonsFavorites } from '@/utilidades/localStorageFavoritos';
import { Card, Container,Grid,Image,Text} from '@nextui-org/react';
import SiFavoritos from '@/componentes/ui/SiFavoritos';


const FavoritosPage = () => {

  const [pokemonsFavoritos,setPokemonsFavoritos] = useState<number[]>([]); //le decimos q inicialmente sera un arreglo de numeros

  useEffect(() => {
    //Otra alternativa para que no de el error de localStorage

    setPokemonsFavoritos(PokemonsFavorites()); //Lo seteo, esa funcion tiene lo q esta guardado en favoritos en el localStorage

  },[])


  return (
    <Layout title='Favoritos page'> {/*Title de arriba de todo*/}
    {/*Aca adentro va lo q cambia*/}
    {/*Componente Container caundo no hay favoritos para no llenar mucho de codigo*/}
    {
      pokemonsFavoritos.length === 0 ?
      <NoFavoritos /> //Si es cero es pq no hay nada
      :
      (
        //Ahora simplemente recorro mi pokemons favoritos para pintar lo que tengo en localStorage en pantalla
        //Crearé un componente que tenga la estructura de cuando hay favoritos
        <SiFavoritos pokemonsEnFavoritos = {pokemonsFavoritos} /> /*Se lo paso para que le haga el map*/
      )

    }

    </Layout>
  )
}

export default FavoritosPage;