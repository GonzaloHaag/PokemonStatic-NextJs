import axios from "axios";
//Peticion a la api

const pokeApi = axios.create({
    baseURL : 'https://pokeapi.co/api/v2'
});


export default pokeApi;