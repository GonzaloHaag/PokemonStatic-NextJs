import { Card, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface props {
    pokemonId : number //Indico que el id que voy a recibir sera number
}

const CardFavoritosPokemon = ({ pokemonId } : props) => {

  const router = useRouter(); 

  const clickedPokemonEnFavoritos = () => {
    //usaremos el router para que al clickear un pokemon nos lleve a su pagina id
   router.push(`/pokemon/${pokemonId}`);
   /*
   De esta manera al darle click me lleva al 
   detalle del pokemon
   */
   
  }
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={clickedPokemonEnFavoritos}>
    <Card hoverable clickable css={{ padding: 10 }}>
   
     <Card.Image
     src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
     width={'100%'}
     height={140}
     >

     </Card.Image>
    

    </Card>
   </Grid>
  )
}

export default CardFavoritosPokemon;