

import {useTheme,Text,Spacer,Link} from '@nextui-org/react';
import Image from 'next/image';

import NextLink from 'next/link';


const Navbar = () => {


  const { theme } = useTheme();

  
  return (
    <div style={{ /*Estilos para el div */
        display: 'flex',
        width : '100%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent : 'start',
        padding : '0px 50px',
        backgroundColor : theme?.colors.gray800.value,
        /*Estamos usando los colores q vienen en theme */
}}>

   {/*Componente image de next -> muy util */}
   <Image
   src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png'
   alt='Imagen de la pokemon app' 
   width={70}
   height={70}
   />
   {/*Quiero que este logo me lleve a la home, entonces debo 
   usar NextLink-> de next/link y Link de nextUi */}
   <NextLink href='/' passHref legacyBehavior>
    {/*Ponerle el legacyBehavior, sino no funcionará*/}
    <Link>
   <Text color='white' h2>P</Text>
   <Text color='white' h3>okémon</Text>
    </Link>
   </NextLink>
  
  <Spacer css={{flex : 1}} /> {/*Para que tome todo el ancho y se vaya al final*/}

    {/*El favoritos me va a llevar a la pagina de favoritos
    Debo ponerlo en un link*/}
     {/*UTILIZAMOS NEXTLINK PARA EVITAR QUE SE 
      RECARGUE LA PAGINA */}
    <NextLink href='/favoritos' passHref legacyBehavior>
      <Link>
    <Text color='white' css={{marginTop:'10px'}} h3>Favoritos</Text>
      </Link>
    </NextLink>
    </div>
  )
}

export default Navbar