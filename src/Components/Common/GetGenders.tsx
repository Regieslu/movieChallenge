import axios, { AxiosResponse } from "axios";

// Importa el tipo Genres del archivo que lo define (reemplaza la ruta con la correcta)
import { Genres } from "../Interfaces";

// Esta función obtiene los géneros de la API y los retorna como un array de Genres
export const getGenres = (): Promise<Genres[]> => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWY0YWY5N2NjOTc2MjNjZTkxYjM1YmVmOWVlMzJiZCIsInN1YiI6IjY1NTUwMjdiYjU0MDAyMDBhYzk4NWI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XcHfTme4sZ3N4y-sPoNwbTzDK9FFm3xi-q2zYXfKlwo'
      }
    };
    axios.get("https://api.themoviedb.org/3/genre/movie/list?language=es-MX", options)
      .then((response: AxiosResponse) => {
        // Verifica que la propiedad data existe en la respuesta antes de acceder a genres
        resolve(response.data?.genres || []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
