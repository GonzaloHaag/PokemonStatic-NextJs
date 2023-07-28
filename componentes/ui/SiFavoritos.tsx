import { Card, Grid } from '@nextui-org/react'
import React from 'react'
import CardFavoritosPokemon from '../pokemon/CardFavoritosPokemon';

interface propsPokemons {
    pokemonsEnFavoritos: number[];
    //Indico que lo que voy a recibir es un arreglo de numeros
}

const SiFavoritos = ({pokemonsEnFavoritos}:propsPokemons) => {
    //Componente que realiza la estructura de cuando hay favoritos
  return (
    <Grid.Container gap={2} direction='row' justify='flex-start'>
    {
      pokemonsEnFavoritos.map((id:number) => (
        //Devuelvo otro componente que se encargue de mostrar la Card
       <CardFavoritosPokemon pokemonId = {id} /> //Le mando el id del pokemon en localStorage
      ))
    }

  </Grid.Container>
  )
}

export default SiFavoritos