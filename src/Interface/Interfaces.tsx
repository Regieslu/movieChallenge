// interface para inf básica de una película
export interface MovieCatalog {
  id: number,
  title: string,
  poster_path: string,
}

// interfac para inf detallada de una película
export interface MovieResult {
  original_title: string,
  poster_path: string,
  vote_average: number,
  overview: string,
  release_date: string,
  genres: Genres[],
}
// interfaz para géneros de peliculas
export interface Genres {
  "id": number,
  "name": string,
}
