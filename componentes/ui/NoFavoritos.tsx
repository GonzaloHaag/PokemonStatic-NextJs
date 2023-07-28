import { Container, Image,Text } from '@nextui-org/react'
import React from 'react'

const NoFavoritos = () => {
    //Componente que retorna la estructura de cuando no hay nada en favoritos
  return (
    <Container css={{
        display:'flex',
        flexDirection:'column',
        height:'calc(100vh-100px)',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
  
      }}>
        <Text h1> No hay favoritos </Text>
        <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
        width={250}
        height = {250}
        css={{
          opacity:0.5
        }}
        ></Image>
  
      </Container>
  
  )
}

export default NoFavoritos