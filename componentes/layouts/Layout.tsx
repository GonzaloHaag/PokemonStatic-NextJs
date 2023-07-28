import React, { FC } from "react";

import Head from "next/head";
import Navbar from "../ui/Navbar";


type Props = {
  //Tipo de dato de las props que voy a recibir 

    children ?: React.ReactNode;
    title?: string; 
    //El ? indica que es opcional pasar el title, si viene quiero q sea tipo string

}

const origen = (typeof window === 'undefined' ? '' : window.location.origin);
//Si estoy del lado del back retorna vacio, sino el window.location.origin

const Layout: React.FC<Props> = ( { children , title }) => {
  //Para obtener la ruta de mi imagen debo usar el window.location
  console.log(origen);
 
    
  return (
    <>
    <Head>
        <title>{ title || 'PokemonApp '}</title>
        {/*
        Si llega el title, lo muestro, si no llega que sea 
        'PokemonApp'  -> Dinamico, para que no sea el mismo en 
        todas las paginas
        */}
        <meta name="author" content="Gonzalo Haag" />
        <meta name="description" content= {`Informacion sobre el pokémon ${ title }`} />
        <meta name="keywords" content={`${title} , pokemon, pokedex `}/>
        {/*OPEN GRAPH META TAGS*/}

        <meta property="og:title" content={`Información sobre ${title} `} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
        <meta property="og:image" content={`${origen}/images/banner.png`} />
        {/*Con el origen nos ahorramos los problemas cuando suba el 
        proyecto a otro lado*/}
    </Head>

    <Navbar /> 
    {/*Pongo el navbar en el layout para mostrarlo
    en todas las paginas que usen este layout */}
    <main style={{
      padding :  '0px 20px'
    }}>
        { children }
    </main>
    </>
  )
}

export default Layout