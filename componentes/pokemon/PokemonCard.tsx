import { FC } from 'react';

import {Grid,Text,Card,Row} from '@nextui-org/react';

import { SmallPokemon } from "@/interfaces/pokemon-list"
import { useRouter } from 'next/router';


interface Props {
     pokemon : SmallPokemon; //Esta interface tiene los tipos de datos que quiero q lleguen en pokemons

}

const PokemonCard : FC<Props> = ({ pokemon }) => {
    //Componente funcional que recibe esas props
    //Recibo el pokemon para mostrarlo aca y lo muestro en grid, que seria como un li
   

    //Funcion para que al hacer click a la card, me lleve a ese pokemon
    const router = useRouter();
    const handleOnClick = () => {
   
      router.push(`/nombre/${pokemon.name}`); //Para ir a /nombre/nombrePokemon al hacerle click
      /*
      Le mando al objeto router, mi pokemon/pokemon id 
      para que al hacerle click a la imagen salga el id del pokemon
      Con esto al hacer click en algun pokemon, ya nos enviara 
      a esa url con el id del pokemon que estoy clickeando
      */

    }
  return (

    // Debemos retornar el grid aca, seria el li de cada ul
     <Grid xs = {6} sm = {3} md = {2} xl = {1} key={pokemon.id}>
          {/*6 en pantallas muy pequeñas y asy */}
          <Card 
           hoverable 
           clickable 
           onClick={handleOnClick}>
            <Card.Body css={{p: 1}}>
              <Card.Image 
              src={pokemon.img}
              width="100%"
              height={140}
              />
            </Card.Body>
            <Card.Footer>
              <Row justify='space-between'>
                <Text transform='capitalize'>{pokemon.name}</Text>
                <Text>#{pokemon.id}</Text>

              </Row>
            </Card.Footer>
          </Card>

        </Grid>
    
  )
}

export default PokemonCard