/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    //Dominio de donde quiero traer imagenes para que no me de error
    domains : ['raw.githubusercontent.com']
  }
}


module.exports = nextConfig
